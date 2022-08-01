import { ethers } from 'ethers'
import { Handler } from '../utils/make-api'
import { authorizeOwner } from '../utils/pg-utils';

const authorize_owner: Handler<'authorize_owner'> = async (
	{
		webwallet_address
	},
	{ },
	logger
) => {
	
	const authorized = authorizeOwner(webwallet_address);

	return { status: authorized };
}

export default authorize_owner