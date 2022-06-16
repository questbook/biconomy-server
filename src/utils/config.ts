import express from 'express';

function getAddressFromTransaction(transaction: any){
    return transaction;
}

function getUsernameFromOauth(oauth: string, provider: string){
    return oauth;
}

export function subsidize(signedTransaction, data: {oauthToken: string, provider: string}) {
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