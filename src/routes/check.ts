import { ethers } from 'ethers'
import { Handler } from '../utils/make-api'
import { subsidize } from "../utils/config" 

const check: Handler<'check'> = async(
	{
		transaction, 
		data
	},
	{ },
	logger
) => {
	
    if(subsidize(transaction, data)){
        return { success: "OK" }
    }
    
	return { success: "NO" };
}

export default check