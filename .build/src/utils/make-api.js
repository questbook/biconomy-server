"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = require("@hapi/boom");
const openapi_backend_1 = __importDefault(require("openapi-backend"));
const logger_1 = __importDefault(require("./logger"));
const DEFAULT_AUTH_SCHEME = 'n-a';
const headers = {
    'content-type': 'application/json',
    'access-control-allow-origin': '*', // lazy cors config
};
const IMPORTANT_METHODS = new Set(['delete', 'post', 'patch']);
// backend agnostic wrapper
// makes a function work for serverless, express & others
function errorHandlingWrap(getHandler) {
    return async (e, req, ctx) => {
        var _a;
        const logger = logger_1.default.child({ requestId: (ctx === null || ctx === void 0 ? void 0 : ctx.awsRequestId) || 'unknown' });
        const result = {};
        const query = {
            ...(e.request.query || {}),
            ...((req === null || req === void 0 ? void 0 : req.multiValueQueryStringParameters) || {})
        };
        Object.keys(query).forEach(key => {
            var _a;
            if (!!query[key] && Array.isArray(query[key]) && ((_a = query[key]) === null || _a === void 0 ? void 0 : _a.length) === 1) {
                query[key] = query[key][0];
            }
        });
        const fullRequest = {
            ...query,
            ...(e.request.requestBody || {}),
            ...(e.request.params || {})
        };
        let auth = undefined;
        let trace = undefined;
        try {
            if ((_a = e.validation) === null || _a === void 0 ? void 0 : _a.errors) {
                throw new boom_1.Boom('Invalid request', { statusCode: 400, data: e.validation.errors });
            }
            // if auth failed
            if (e.security && !e.security.authorized && DEFAULT_AUTH_SCHEME in e.security) {
                throw e.security[DEFAULT_AUTH_SCHEME].error;
            }
            auth = e.security;
            const handler = await getHandler();
            result.body = await handler(fullRequest, auth, logger);
            result.statusCode = 200;
        }
        catch (error) {
            let errorDescription;
            let data;
            trace = error.stack;
            if (error instanceof boom_1.Boom) {
                errorDescription = error.message;
                data = error.data;
                result.statusCode = error.output.statusCode;
            }
            else {
                errorDescription = 'Internal Server Error';
                result.statusCode = 500;
            }
            result.body = {
                error: errorDescription,
                statusCode: result.statusCode,
                message: error.message,
                data
            };
        }
        if (trace || IMPORTANT_METHODS.has(e.request.method)) {
            const method = trace ? 'error' : 'info';
            logger[method]({
                trace,
                path: `${e.request.method} ${e.request.path}`,
                res: result.body,
                req: fullRequest,
                statusCode: result.statusCode,
                actor: auth === null || auth === void 0 ? void 0 : auth[DEFAULT_AUTH_SCHEME]
            }, 'processed request');
        }
        const res = e.request['res'];
        if (typeof (res === null || res === void 0 ? void 0 : res.status) === 'function') {
            res.set(headers);
            return res
                .status(result.statusCode)
                .send(result.body);
        }
        else {
            return {
                statusCode: result.statusCode,
                body: JSON.stringify(result.body),
                headers
            };
        }
    };
}
exports.default = (definition, routes) => {
    // create api with your definition file or object
    const api = new openapi_backend_1.default({
        definition,
        quick: process.env.NODE_ENV === 'production',
    });
    // uncomment for when we've auth
    /*api.registerSecurityHandler(DEFAULT_AUTH_SCHEME, async e => {
        try {
            const headers = e.request.headers
            const [security] = e.operation.security!
            const scopes = security[DEFAULT_AUTH_SCHEME]

            // remove "Bearer " prefix
            const token = (headers.Authorization || headers.authorization)?.slice(7)
            if(!token || typeof token !== 'string') {
                throw new Boom('Missing auth token', { statusCode: 401 })
            }

            const authUser = await authenticate(token)

            if(typeof authUser === 'boolean') {
                throw new Boom('Token expired', { statusCode: 401 })
            }

            if(!userCanAccess(authUser, scopes)) {
                // noinspection ExceptionCaughtLocallyJS
                throw new Boom('Insufficient Access', { statusCode: 403 })
            }

            return authUser
        } catch(error) {
            if(error instanceof Boom) {
                throw error
            } else if(error instanceof TypeError) {
                const boom = new Boom('Whoops, something went seriously wrong.')
                boom.stack = error.stack // so we can log & trace this later
                throw boom
            } else {
                throw new Boom(error.message, { statusCode: error.code || 401 })
            }
        }
    })*/
    api.register({
        notFound: errorHandlingWrap(() => {
            return async () => {
                throw new boom_1.Boom('Not Found', { statusCode: 404 });
            };
        }),
        validationFail: errorHandlingWrap(async () => {
            return async () => { };
        }),
        ...Object.keys(routes).reduce((dict, key) => {
            dict[key] = errorHandlingWrap(routes[key]);
            return dict;
        }, {})
    });
    // initialize the backend
    return api.init();
};
