import configEnv from '../utils/env'
import { Handler } from '../utils/make-api'
import { chargeGas } from '../utils/pg-utils'

configEnv()

const charge_gas: Handler<'charge_gas'> = async(
	{
		workspace_id,
		amount
	},
	{ },
	logger

) => {


	await chargeGas(workspace_id, amount)

	return { status: true }
}

export default charge_gas