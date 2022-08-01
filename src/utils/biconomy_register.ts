import { ethers } from 'ethers';
import workspaceRegistryAbi from '../contracts/abi/WorkspaceRegistryAbi.json';
import { WORKSPACE_REGISTRY_ADDRESS } from '../contracts/addresses';

// @TODO add providers for the rest of the chains

export const jsonRpcProviders = {
	"80001": new ethers.providers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/lfupuQhoZXWzMzn_OJ_zD9RHK0exz_b4'),
}

export const registerWebHook = async(authToken: string | undefined, apiKey: string) => {
    if(!authToken){
        return "No Auth Token Found!";
    }
	const url = 'https://api.biconomy.io/api/v1/workspace/register-webhook'

	const formData = new URLSearchParams({
		'webHook': 'https://2j6v8c5ee6.execute-api.ap-south-1.amazonaws.com/v0/check',
		'requestType': 'post', // post or get
	})

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'authToken': authToken, 'apiKey': apiKey },
		body: formData
	}

	const response = await fetch(url, requestOptions)
	const responseJSON = await response.json()

	let webHookId = "Couldn't register webhook on workspace!"
	console.log(responseJSON)
	try {
		webHookId = responseJSON.data.webHookId
	} catch{
		throw Error("Couldn't register webhook for your app!")
	}

	return webHookId
}

export const addWorkspace = async(workspaceName: string, networkId: string, authToken: string | undefined) => {
	if(!authToken) {
        throw new Error("No Auth Token Found!")
	}

	const url = 'https://api.biconomy.io/api/v1/workspace/public-api/create-workspace'

	const formData = new URLSearchParams({
		'workspaceName': workspaceName,
		'networkId': networkId,
		'enableBiconomyWallet': 'true'
	})

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'authToken': authToken },
		body: formData
	}

	const res = await fetch(url, requestOptions)
	const resJson = await res.json()

	console.log(resJson.data)

	return {apiKey: resJson.data.apiKey, fundingKey: resJson.data.fundingKey.toString()};
}

export const isWorkspaceOwner = async (ownerAddress: string, workspaceId: number, chainId: string) => {
	const workspaceContract = new ethers.Contract(WORKSPACE_REGISTRY_ADDRESS[chainId],
        workspaceRegistryAbi, jsonRpcProviders[chainId]);
	
    const isOwner = await workspaceContract.isWorkspaceAdmin(workspaceId, ownerAddress);
	
	return isOwner;
}