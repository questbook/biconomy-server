import { Handler } from '../utils/make-api'
import { subsidize } from "../utils/subsidize"

const check: Handler<'check'> = async (
	{
		data
	},
	{ },
	logger
) => {

	let response = await subsidize(data.signedNonce, data.nonce, data.webwallet_address);

	console.log(response);

	if (response === false) {
		return { isConditionPassed: false };
	}

	return { isConditionPassed: true };
}

export default check