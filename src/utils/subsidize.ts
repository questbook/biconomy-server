import { ethers } from 'ethers';
import { SignedTransaction } from '../types/index'
import { existsLogin } from '../utils/pg-utils';
import configEnv from '../utils/env';

configEnv()

function getAddressFromTransaction(signedNonce: SignedTransaction) {
    return signedNonce.transactionHash;
    let address = ethers.utils.recoverAddress(
        signedNonce.transactionHash,
        {
            r: signedNonce.r,
            s: signedNonce.s,
            v: signedNonce.v
        }
    );
    console.log("THIS IS ADDRESS", address);
    return address;
}

export async function subsidize(signedNonce: SignedTransaction, nonce: string, webwallet_address: string ) {
    const address = getAddressFromTransaction(signedNonce);

    if(address !== webwallet_address){
        return false;
        // return {subsidize: false, msg: "The transaction was not signed by the same user"};
    }
    
    if(ethers.utils.hashMessage(nonce) !== signedNonce.transactionHash){
        return false;
        // return {subsidize: false, msg: "Provided nonce and its signature are not consistent"};
    }

    if(!existsLogin(address, nonce)){
        return false;
        // return {subsidize: false, msg: "No valid record for this user in the database"};
    }
    
    // return {subsidize: true, msg: "OK"}
    return true;
}