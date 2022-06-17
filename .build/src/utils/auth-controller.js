"use strict";
/**
 * this is more a stubs sort of file
 * since we're using any explicit authentication at the moment
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCanAccess = exports.authenticate = void 0;
const authenticate = async (token) => {
    return {};
};
exports.authenticate = authenticate;
const userCanAccess = ({}, scopes) => {
    return true;
};
exports.userCanAccess = userCanAccess;
