import { components } from './gen'

export type ITransactionRequest = components['schemas']['TransactionRequest']
export interface SignedTransaction {
    transactionHash: string,
    r: string,
    s: string,
    v: number
}
