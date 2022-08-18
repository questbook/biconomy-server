import { isWorkspaceOwner } from '../utils/biconomy_register'
import configEnv from '../utils/env'
import { Handler } from '../utils/make-api'
import { addWorkspaceOwner } from '../utils/pg-utils'

configEnv()

const add_workspace_owner: Handler<'add_workspace_owner'> = async(
	{
		workspace_id,
		webwallet_address,
		scw_address,
		chain_id,
		safe_address
	},
	{ },
	logger

) => {

	if(!await isWorkspaceOwner(scw_address, workspace_id, chain_id)) {
		throw new Error('User is not a workspace owner!')
	}

	// add the owner with all domain details
	await addWorkspaceOwner(workspace_id, webwallet_address, scw_address, safe_address, parseInt(chain_id))

	return { status: true }
}

export default add_workspace_owner