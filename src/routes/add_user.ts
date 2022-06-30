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

	console.log(res.data);
	if(res.data.substring(0, 5) === "error"){
		return { authorize: false}
	}

	addUser(webwallet_address);
    
	return { authorize: true };
}

export default add_user