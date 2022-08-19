import { Handler } from '../utils/make-api'
import { subsidize } from '../utils/subsidize'
import {
	WORKSPACE_REGISTRY_ADDRESS, GRANT_FACTORY_ADDRESS,
	APPLICATION_REGISTRY_ADDRESS, APPLICATION_REVIEW_REGISTRY_ADDRESS
} from '../contracts/addresses'

const check: Handler<'check'> = async (
	{
		data
	},
	{ },
	logger
) => {
	if (WORKSPACE_REGISTRY_ADDRESS[data.chain_id] !== data.to &&
		GRANT_FACTORY_ADDRESS[data.chain_id] !== data.to &&
		APPLICATION_REGISTRY_ADDRESS[data.chain_id] !== data.to &&
		APPLICATION_REVIEW_REGISTRY_ADDRESS[data.chain_id] !== data.to) {
		throw new Error("Not allowed to interact with the provided contract!")
	}

	const response = await subsidize(data.signedNonce, data.nonce, data.webwallet_address)

	if (response === false) {
		return { isConditionPassed: false }
	}

	return { isConditionPassed: true }
}

export default check