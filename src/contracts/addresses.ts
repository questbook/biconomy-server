import CHAIN_INFO from './chainInfo.json'

export const WORKSPACE_REGISTRY_ADDRESS = compileAddresses('workspace')
export const APPLICATION_REGISTRY_ADDRESS = compileAddresses('applications')
export const APPLICATION_REVIEW_REGISTRY_ADDRESS = compileAddresses('reviews')
export const GRANT_FACTORY_ADDRESS = compileAddresses('grantFactory')
export const COMMUNICATION_ADDRESS = compileAddresses('communication')

function compileAddresses(contract: any) {
	return Object.values(CHAIN_INFO).reduce(
		(acc, chainInfo) => {
			acc[chainInfo.id] = chainInfo.qbContracts[contract]
			return acc
		}, { }
	)
}