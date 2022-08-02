import { Handler } from '../utils/make-api';
import { addWorkspaceOwner, addUser } from '../utils/pg-utils';
import configEnv from '../utils/env';
import { isWorkspaceOwner } from '../utils/biconomy_register';

configEnv()

const add_workspace_owner: Handler<'add_workspace_owner'> = async (
    {
        workspace_id,
        workspace_name,
        webwallet_address,
        scw_address,
        chain_id,
        safe_address,
        safe_name
    },
    { },
    logger

) => {

    if(!await isWorkspaceOwner(scw_address, workspace_id, chain_id))
        throw new Error("User is not a workspace owner!");

	await addUser(webwallet_address); // create nonce for the user

    // add the owner with all domain details
    await addWorkspaceOwner(workspace_id, workspace_name, webwallet_address, scw_address, safe_address, parseInt(chain_id), safe_name); 

    return {status: true}
}

export default add_workspace_owner