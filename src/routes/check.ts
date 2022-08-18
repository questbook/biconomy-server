import { Handler } from '../utils/make-api'
import { subsidize } from '../utils/subsidize'

const check: Handler<'check'> = async(
	{
		data
	},
	{ },
	logger
) => {

	const response = await subsidize(data.signedNonce, data.nonce, data.webwallet_address)

	if(response === false) {
		return { isConditionPassed: false }
	}

	return { isConditionPassed: true }
}

export default check