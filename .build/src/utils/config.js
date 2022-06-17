"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subsidize = void 0;
function getAddressFromTransaction(transaction) {
    return transaction;
}
function getUsernameFromOauth(oauth, provider) {
    return oauth;
}
function subsidize(signedTransaction, data) {
    const address = getAddressFromTransaction(signedTransaction);
    const username = getUsernameFromOauth(data.oauthToken, data.provider);
    console.log(address, username);
    return true;
    // @TODO implement the logic of the check
    // if (isValid(address) && isValid(username)) {
    //     return res.send(200)
    // }
    // return res.send(403)
}
exports.subsidize = subsidize;
