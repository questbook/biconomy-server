import { ethers } from 'ethers'
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


	// amount is given in wei
	const etherAmount = Number(ethers.utils.formatEther(amount))

	await chargeGas(workspace_id, etherAmount)

	return { status: true }
}

export default charge_gas