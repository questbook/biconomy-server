import configEnv from '../utils/env'
import { Handler } from '../utils/make-api'
import { chargeGas } from '../utils/pg-utils'

configEnv()

const charge_gas: Handler<'charge_gas'> = async(
	{
		workspace_id,
		chain_id,
		amount
	},
	{ },
	logger

) => {

	// amount is given in ether
	const etherAmount = Number(amount)

	await chargeGas(workspace_id, chain_id, etherAmount)

	return { status: true }
}

export default charge_gas