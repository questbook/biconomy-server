import { ethers } from 'ethers'
import { Handler } from '../utils/make-api'
import { subsidize } from "../utils/subsidize"

const check: Handler<'check'> = async (
	{
		data,
		webwallet_address
	},
	{ },
	logger
) => {

	let response = await subsidize(data.signedNonce, data.nonce, webwallet_address);

	if (response === false) {
		return { success: "DONT SUBSIDIZE" };
	}

	return { success: "SUBSIDIZE" };
}

export default check