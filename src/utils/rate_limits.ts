import { toNumber } from 'lodash'

const Pool = require('pg').Pool

const pool = new Pool({
	user: process.env.POSTGRES_USER,
	host: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DB,
	password: process.env.POSTGRES_PASSWORD,
	port: toNumber(process.env.POSTGRES_PORT)
})

const LIMITS_PER_TIMESTAMP = {
	'user': 1,
	'global': 10
}

const LIMIT_DURATION = 60

export const assertNotRateLimited = async(webwalletAddress: string, type: string) => {
	const results = await pool.query(`SELECT * FROM rate_limits WHERE webwallet_address = ${webwalletAddress}`)

	if(results.rows.length === 0) {
		await addRateLimit(webwalletAddress)
		return true
	}

	const currentFT = new Date().getTime() / (1000 * LIMIT_DURATION)

	if(results.rows[0].number_of_transactions_done < LIMITS_PER_TIMESTAMP[type]) {
		return true
	}

	if(results.rows[0].floored_timestamp < currentFT) {
		return true
	}

	return false
}

export const addRateLimit = async(webwalletAddress: string) => {
	await pool.query(`SELECT * FROM rate_limits WHERE webwallet_address = ${webwalletAddress}`)
}