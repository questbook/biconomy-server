import configEnv from '../utils/env'
import { Handler } from '../utils/make-api'
import { addUser } from '../utils/pg-utils'

configEnv()

const add_user: Handler<'add_user'> = async(
	{
		webwallet_address
	},
	{ },
	logger

) => {

	await addUser(webwallet_address)

	return { authorize: true }
}

export default add_user