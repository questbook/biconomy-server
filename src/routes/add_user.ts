import { Handler } from '../utils/make-api';
import { addUser, getValidNonce } from '../utils/pg-utils';
import axios from 'axios';
import configEnv from '../utils/env';

configEnv()


const add_user: Handler<'add_user'> = async(
	{
		code, 
		webwallet_address
	},
	{ },
	logger

) => {
	
	let res = await axios.post(`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`)

	if(res.data.substring(0, 5) === "error"){
		return { authorize: "Code is invalid"}
	}

	addUser(webwallet_address);
    
	return { authorize: "OK" };
}

export default add_user