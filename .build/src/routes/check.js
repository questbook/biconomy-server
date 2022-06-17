"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../utils/config");
const check = async ({ transaction, data }, {}, logger) => {
    if ((0, config_1.subsidize)(transaction, data)) {
        return { success: "OK" };
    }
    return { success: "NO" };
};
exports.default = check;
