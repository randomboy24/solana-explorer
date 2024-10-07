"use client"
import { Connection, PublicKey } from '@solana/web3.js'
import { Copy, Loader } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { AccountInfoContext } from '../context'

type Props = {}

function TransactionHistory({}: Props) {
    const { accountInfo } = useContext(AccountInfoContext);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [isLoading,setIsLoading] = useState(true)

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!accountInfo?.address) return; // Ensure accountInfo and address are defined

            const connection = new Connection("https://api.devnet.solana.com");
            try {
                const fetchedTransactions = await connection.getSignaturesForAddress(new PublicKey(accountInfo.address));
                setTransactions(fetchedTransactions);
                // console.log(fetchedTransactions);
                // console.log(transactions)
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
            setIsLoading(false)
        };

        fetchTransactions();
    }, [accountInfo]); // Add accountInfo to the dependency array to refetch if it changes

    useEffect(() => {
        console.log(transactions)
    },[transactions])
    if(!isLoading){
  return ( 
    <div className='flex flex-col items-center text-white w-screen'>
        <div className='flex flex-col w-[90%]  sm:w-[85%] md:w-[75%] lg:w-[70%] xl:w-[60%] bg-[#242424] rounded-lg'>
            <div className='flex flex-row justify-between mx-10 h-16 items-center'>
                <div>
                    <h3 className='text-xl'>Transaction history</h3>
                </div>
                <div>
                    Refresh
                </div>
            </div>
            <div className='overflow-x-auto'>
                <div className='flex flex-row bg-[#111] text-gray-400 px-10 text-xs h-12 items-center'>
                    <div className='basis-[50%] '>
                        TRANSACTION SIGNATURE
                    </div>
                    <div className='basis-[11.5%] '>
                        BLOCK
                    </div>  
                    <div className='basis-[11.5%] '>
                        AGE
                    </div>
                    <div className='basis-[18%] '>
                        TIMESTAMP   
                    </div>
                    <div className='basis-[9%] '>
                        RESULT
                    </div>
                </div>
                {transactions.map(transaction => 
                <div className='flex flex-row text-sm  ml-10 text-gray-400 h-14 items-center'>
                    <div className='basis-[48%]  flex flex-row'>
                        <span>
                            <Copy width={15} height={15} className='hover:cursor-pointer' onClick={() => {
                                navigator.clipboard.writeText(transaction.signature)
                            }}/>
                        </span>
                        <span className='text-[#4ade80] ml-1'>
                            {(transaction.signature).slice(0,40)}....
                        </span>
                    </div>
                    <div className='flex basis-[11.3%]  '>
                        <Copy width={15} height={15}  className='hover:cursor-pointer' onClick={() => {
                            navigator.clipboard.writeText(transaction.block)
                        }}/> 
                        <div className='text-[#4ade80] ml-1'>
                            {transaction.blockTime}
                        </div>
                    </div>
                    <div className='basis-[9.5%]'>10 hours ago</div>
                    <div className='basis-[17%]  ml-4'>Oct 6,2024 at 18:04:20 UTC</div>
                    <div className='basis-[5%]  ml-1 text-gray-300 bg-green-700 rounded-lg pl-[3px]'>{transaction.confirmationStatus==="finalized"?"success":null}</div>
                </div>
                )}
                {/* <hr className='borde border-gray-500'/> */}
            </div>
            <div className='flex justify-center h-14 items-center text-gray-400'>
                Fetched full history
            </div>
        </div>
    </div> 
  )
}
else{
    <div className='mt-20 justify-center items-center'>
        <Loader height={30} width={30} />
    </div>
}
}

export default TransactionHistory