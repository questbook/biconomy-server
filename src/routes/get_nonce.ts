import { ethers } from 'ethers'
import { Handler } from '../utils/make-api'
import { getValidNonce } from '../utils/pg-utils';

const get_nonce: Handler<'get_nonce'> = async (
	{
		webwallet_address
	},
	{ },
	logger
) => {

    let validNonce = getValidNonce(webwallet_address);

    if(!validNonce){
	    return { nonce: "Token expired. Please log in again." };
    }

	return { nonce: validNonce };
}

export default get_nonce