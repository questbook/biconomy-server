import { ethers } from 'ethers'
import { Handler } from '../utils/make-api'
import { subsidize } from '../utils/config';

const check: Handler<'transactionExecute'> = async(
	{
		transaction: signedTransaction, 
		data
	},
	{ },
	logger
) => {
	
    if(subsidize(signedTransaction, data)){
        return "OK"
    }
    
	return "NO";
}

export default check