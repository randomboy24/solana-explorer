import { SearchIcon } from "lucide-react";
import { useContext, useState } from "react";
import { AccountInfoContext, AddressContext } from "../context";
import axios from "axios";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export default function SearchBar() {
    const {address,setAddress} = useContext(AddressContext);
    const {setAccountInfo} = useContext(AccountInfoContext);
    const {setIsSearched} = useContext(AccountInfoContext);
    const [isLoading,setIsLoading] = useState(false)
    return (
        <div>
            <div className="flex justify-center items-center mt-10 ">
                <div className="flex justify-between  w-[95%] sm:w-[85%] md:w-[75%] lg:w-[70%] xl:w-[60%]  items-center rounded-lg  bg-[#242424]  flex-wrap">
                    <input type="text" placeholder="put your public address here" className=" pl-3 md-w[93%] lg:w-[94%] xl:w-[95%] sm:w-[90%] w-[88%] rounded-md h-[54px] bg-[#242424]  text-white focus:outline-none focus:ring-0" onChange={(e) => {
                        setAddress(e.target.value)
                    }}/>
                    <div className="border-l-[1px] lg:w-[6%] xl:w-[5%] md:w-[7%] sm:w-[10%] w-[12%] pl-4 bg-[#242424] h-[100%] hover:cursor-pointer" onClick={async () => {
                        // console.log(connection);
                        // const response = await connection.get(new PublicKey(address));
                        // console.log(response)
                        setIsSearched(false)
                        // return;
                        try{
                            new PublicKey(address)
                        }catch {
                            alert("invalid public key.")
                            return;
                        }
                        setIsLoading(true)
                        console.log("crossed the try catch.")
                        const response = await axios.post('https://api.devnet.solana.com',{
        
                                "jsonrpc": "2.0",
                                "id": 1,
                                "method": "getAccountInfo",
                                "params": [address]
                            
                        })
                        setIsLoading(false)
                        setIsSearched(true)
                        // console.log(isSearched)
                        if(response.data.result.value===null){  
                            // alert("account doesn't exist on solana")
                            setAccountInfo({address:address,balance:"Account Doesn't Exist",allocatedDataSize:0,assignedProgramId:"System Program",executable:false})
                            return;
                        }
                        // console.log(typeof(response.data.result.value))
                        console.log(response.data)
                        setAccountInfo({address:address,balance:response.data.result.value.lamports/LAMPORTS_PER_SOL,allocatedDataSize:(response.data.result.value.data).length,assignedProgramId:response.data.result.value.owner==='11111111111111111111111111111111'?"SystemProgram":"",executable:response.data.result.value.executable})
                    }} >
                        <SearchIcon className="text-gray-400 hover:text-gray-600  "/>
                    </div>
                </div>
            </div>  
            {isLoading?
            <div className="flex justify-center h-[780px] items-center">         
                <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-green-600 animate-bounce"></div>
                <div
                    className="w-4 h-4 rounded-full bg-green-600 animate-bounce [animation-delay:-.3s]"
                ></div>
                <div
                    className="w-4 h-4 rounded-full bg-green-600 animate-bounce [animation-delay:-.5s]"
                ></div>
                </div>
            </div>:null}
        </div>
    )
}
