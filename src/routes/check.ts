import { ethers } from 'ethers'
import { Handler } from '../utils/make-api'
import { subsidize } from "../utils/subsidize" 

const check: Handler<'check'> = async(
	{
		transaction, 
		data
	},
	{ },
	logger
) => {
	
    if(await subsidize(transaction, data)){
        return { success: "SUBSIDIZE" }
    }
    
	return { success: "DONT SUBSIDIZE" };
}

export default check