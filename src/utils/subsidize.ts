import { ethers } from 'ethers';
import { SignedTransaction } from '../types/index'
import { existsLogin } from '../utils/pg-utils';
import configEnv from '../utils/env';

configEnv()

function getAddressFromTransaction(signedNonce: SignedTransaction) {
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
    }
    
    if(ethers.utils.hashMessage(nonce) !== signedNonce.transactionHash){
        return false;
    }

    return await existsLogin(address, nonce);
}