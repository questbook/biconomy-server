import { Handler } from '../utils/make-api';
import { addUser } from '../utils/pg-utils';
import configEnv from '../utils/env';

configEnv()

const add_user: Handler<'add_user'> = async(
	{
		webwallet_address
	},
	{ },
	logger

) => {

	addUser(webwallet_address);
    
	return { authorize: true };
}

export default add_user