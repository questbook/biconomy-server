import express from 'express';
import { ethers } from 'ethers';
import { SignedTransaction } from '../types/index'
import { existsAddress, existsLogin, existsUserName } from '../utils/pg-utils';
import axios from 'axios';
import configEnv from '../utils/env';

configEnv()

function getAddressFromTransaction(signedTransaction: SignedTransaction) {
    return signedTransaction.transactionHash;
    let address = ethers.utils.recoverAddress(
        signedTransaction.transactionHash,
        {
            r: signedTransaction.r,
            s: signedTransaction.s,
            v: signedTransaction.v
        }
    );
    console.log("THIS IS ADDRESS", address);
    return address;
}

function getUsernameFromOauth(oauth: string, provider: string) {
    return oauth;
}

export async function subsidize(signedTransaction: SignedTransaction, data: { oauthToken: string, provider: string }) {
    const address = getAddressFromTransaction(signedTransaction);
    const username = getUsernameFromOauth(data.oauthToken, data.provider);
    
    // const response = await axios.get("https://github.com/login/oauth/authorize",{params: {client_id: process.env.CLIENT_ID}});
    // console.log(response);

    return existsLogin(username, address);
    // @TODO implement the logic of the check

    // if (isValid(address) && isValid(username)) {
    //     return res.send(200)
    // }
    // return res.send(403)
}