"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.api = void 0;
const env_1 = __importDefault(require("../utils/env"));
(0, env_1.default)();
const routes_1 = __importDefault(require("../routes"));
const make_api_1 = __importDefault(require("../utils/make-api"));
exports.api = (0, make_api_1.default)('openapi.yaml', routes_1.default);
const handler = (event, context) => {
    return exports.api.then(api => (api.handleRequest({
        method: event.httpMethod,
        path: event.path,
        body: event.body,
        query: event.queryStringParameters,
        headers: event.headers,
    }, event, context)));
};
exports.handler = handler;
