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

export const getValidNonce = async (address: string) => {
    
    let results = await pool.query(`SELECT nonce, expiration FROM gasless_login WHERE address = '${address}' ORDER BY expiration DESC`);
    
    if(results.rows.length === 0){
        return false;
    }

    if(results.rows[0].expiration <= new Date().getTime() / 1000){
        return false;
    }

    return results.rows[0].nonce;

}

export const existsLogin = async (address: string, nonce: string) => {
    let results = await pool.query(`SELECT * FROM gasless_login WHERE address = '${address}' AND nonce = '${nonce}';`)
    
    if(results.rows.length === 0)
        return false;

    let expiration = results.rows[0].expiration;

    let cur_date = new Date().getTime() / 1000;

    return expiration > cur_date;
        
}

export const addUser = async (address: string) => {
    let newNonce = createNonce(100);
    await pool.query(`INSERT INTO gasless_login VALUES ('${address}', '${newNonce}', ${EXPIRATION + new Date().getTime() / 1000});`)
}

export const addWorkspaceOwner = async (workspace_id: number, workspace_name: string, address: string, 
    scw_address: string, safe_address: string, chain_id: number, safe_name: string) => {
    await pool.query(`INSERT INTO workspace_owners VALUES 
    ('${workspace_id}', '${workspace_name}', '${address}', '${scw_address}', '${safe_address}', '${chain_id}', '${safe_name}')`);
        
}

export const authorizeOwner = async (address: string) => {
    let results = await pool.query(`SELECT * FROM workspace_owners WHERE address = '${address}';`)
    
    return results.rows.length !== 0;
        
}

export const refreshNonce = async (address: string) => {
    const newNonce = createNonce(100);
    await pool.query(`UPDATE gasless_login SET nonce = '${newNonce}' WHERE address = '${address}';`)

    return newNonce;
}
