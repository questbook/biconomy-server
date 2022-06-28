import { toNumber } from "lodash"


const EXPIRATION = 86400; // 1 day
const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: toNumber(process.env.POSTGRES_PORT)
})

const createNonce = (length: number) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

// export const existsAddress = async (address: string) => {
//     let results = await pool.query(`SELECT * FROM github_gasless_login WHERE address = '${address}';`)

//     return results.rows.length > 0;
// }

export const getValidNonce = async (address: string) => {
    console.log("HERE OK")
    let results = await pool.query(`SELECT nonce, expiration FROM github_gasless_login WHERE address = '${address}' ORDER BY expiration DESC`);
    console.log("HERE OK")
    console.log(results);

    if(results.rows.length <= 0){
        return false;
    }

    if(results.rows[0].expiration <= new Date().getTime() / 1000){
        return false;
    }

    return results.rows[0].nonce;

}

export const existsLogin = async (address: string, nonce: string) => {
    let results = await pool.query(`SELECT * FROM github_gasless_login WHERE address = '${address}' AND nonce = '${nonce}';`)
    
    let expiration = results.rows[0].expiration;

    let cur_date = new Date().getTime() / 1000;

    console.log(expiration, cur_date);

    return expiration > cur_date;
        
}

export const addUser = async (address: string) => {
    let newNonce = createNonce(100);
    await pool.query(`INSERT INTO github_gasless_login VALUES ('${address}', '${newNonce}', ${EXPIRATION});`)
}

// export const deleteUser = async (username: string, address: string) => {
//     await pool.query(`DELETE FROM github_gasless_login WHERE username = '${username}' AND address = '${address}'`);
// }


