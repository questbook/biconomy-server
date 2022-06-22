import { toNumber } from "lodash"

const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: toNumber(process.env.POSTGRES_PORT)
})

export const existsUserName = async (username: string) => {
    let results = await pool.query(`SELECT * FROM github_gasless_login WHERE username = '${username}';`)

    return results.rows.length > 0;
}

export const existsAddress = async (address: string) => {
    let results = await pool.query(`SELECT * FROM github_gasless_login WHERE address = '${address}';`)

    return results.rows.length > 0;
}

export const existsLogin = async (username: string, address: string) => {
    let results = await pool.query(`SELECT * FROM github_gasless_login WHERE address = '${address}' AND username = '${username}';`)

    return results.rows.length > 0;
}

export const addUser = async (username: string, address: string) => {
    await pool.query(`INSERT INTO github_gasless_login VALUES ('${username}', '${address}');`)
}

export const deleteUser = async (username: string, address: string) => {
    await pool.query(`DELETE FROM github_gasless_login WHERE username = '${username}' AND address = '${address}'`);
}


