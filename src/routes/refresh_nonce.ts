import { ethers } from 'ethers'
import { Handler } from '../utils/make-api'
import { getValidNonce, refreshNonce } from '../utils/pg-utils';

const refresh_nonce: Handler<'refresh_nonce'> = async (
	{
		webwallet_address
	},
	{ },
	logger
) => {
	
	const nonce = await getValidNonce(webwallet_address);

	if(!nonce){
		const newNonce = await refreshNonce(webwallet_address);
		return { nonce: newNonce, updated: true };
	}

	return { nonce: nonce, updated: false };
}

export default refresh_nonce