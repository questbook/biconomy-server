import { toNumber } from 'lodash'


const EXPIRATION = 86400 * 365 // 1 day
const Pool = require('pg').Pool

const pool = new Pool({
	user: process.env.POSTGRES_USER,
	host: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DB,
	password: process.env.POSTGRES_PASSWORD,
	port: toNumber(process.env.POSTGRES_PORT)
})

const createNonce = (length: number) => {
	let result = ''
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const charactersLength = characters.length
	for(let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() *
            charactersLength))
	}

	return result
}

export const getValidNonce = async(address: string) => {

	const results = await pool.query(`SELECT nonce, expiration FROM gasless_login WHERE address = '${address}' ORDER BY expiration DESC`)

	if(results.rows.length === 0) {
		return false
	}

	if(results.rows[0].expiration <= new Date().getTime() / 1000) {
		return false
	}

	return results.rows[0].nonce

}

export const existsLogin = async(address: string, nonce: string) => {
	const results = await pool.query(`SELECT * FROM gasless_login WHERE address = '${address}' AND nonce = '${nonce}';`)

	if(results.rows.length === 0) {
		return false
	}

	const expiration = results.rows[0].expiration

	const cur_date = new Date().getTime() / 1000

	return expiration > cur_date

}

export const existsWebwallet = async(address: string) => {
	const results = await pool.query(`SELECT * FROM gasless_login WHERE address = '${address}';`)

	if(results.rows.length === 0) {
		return false
	}

	return true
}

export const addUser = async(address: string) => {
	const newNonce = createNonce(100)
	console.log('adding nonce')
	await pool.query(`INSERT INTO gasless_login VALUES ('${address}', '${newNonce}', ${EXPIRATION + new Date().getTime() / 1000});`)
}

export const addWorkspaceOwner = async(workspace_id: number, address: string,
	scw_address: string, safe_address: string, chain_id: number) => {
	await pool.query(`INSERT INTO workspace_owners (workspace_id, webwallet_address, scw_address, safe_address,
        chain_id ) VALUES 
    ('${workspace_id}', '${address}', '${scw_address}', '${safe_address}', '${chain_id}')`)

}

export const authorizeOwner = async(address: string) => {
	const results = await pool.query(`SELECT * FROM workspace_owners WHERE address = '${address}';`)

	return results.rows.length !== 0

}

export const refreshNonce = async(address: string) => {

	if(!(await existsWebwallet(address))) {
		throw new Error('User not authorized!')
	}

	const newNonce = createNonce(100)

	await pool.query(`UPDATE gasless_login SET nonce = '${newNonce}' WHERE address = '${address}';`)

	return newNonce
}

export const chargeGas = async(workspace_id: number, chain_id: number, amount: number) => {
	const currentGasCharging = await pool.query(`SELECT payment_due FROM workspace_owners WHERE workspace_id=${workspace_id} AND chain_id = ${chain_id};`)

	const updatedGasCharging = (currentGasCharging.rows[0]?.payment_due || 0) + amount

	await pool.query(`UPDATE workspace_owners SET payment_due = ${updatedGasCharging} WHERE workspace_id=${workspace_id};`)
}