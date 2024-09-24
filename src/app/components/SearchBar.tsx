import { SearchIcon } from "lucide-react";
import { useContext } from "react";
import { AccountInfoContext, AddressContext } from "../context";
import { useConnection } from "@solana/wallet-adapter-react";
import axios from "axios";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export default function SearchBar() {
    const {address,setAddress} = useContext(AddressContext);
    const {setAccountInfo,accountInfo} = useContext(AccountInfoContext);
    const {setIsSearched,isSearched} = useContext(AccountInfoContext);
    const {connection} = useConnection();
    connection.getAccountInfo
    return (
        <div className="flex justify-center     items-center mt-10 ">
            <div className="flex justify-between  w-[90%]  sm:w-[85%] md:w-[75%] lg:w-[70%] xl:w-[60%]  items-center rounded-lg  bg-[#242424]  flex-wrap">
                <input type="text" placeholder="put your public address here" className="pl-3 w-[95%] rounded-md h-[54px] bg-[#242424]  text-white focus:outline-none focus:ring-0" onChange={(e) => {
                    setAddress(e.target.value)
                }}/>
                <div className="border-l-[1px] w-[5%] pl-4 bg-[#242424] h-[100%] hover:cursor-pointer " onClick={async () => {
                    // console.log(connection);
                    // const response = await connection.get(new PublicKey(address));
                    // console.log(response)

                    try{
                        new PublicKey(address)
                    }catch(e) {
                        alert("invalid public key of solana key.")
                        return;
                    }
                    console.log("crossed the try catch.")
                    const response = await axios.post('https://api.devnet.solana.com',{
    
                            "jsonrpc": "2.0",
                            "id": 1,
                            "method": "getAccountInfo",
                            "params": [address]
                        
                    })
                    setIsSearched(true)
                    // console.log(isSearched)
                    if(response.data.result.value===null){  
                        alert("account doesn't exist on solana")
                        setAccountInfo({address:address,balance:"Account Doesn't Exist",allocatedDataSize:0,assignedProgramId:"System Program",executable:false})
                        return;
                    }
                    // console.log(typeof(response.data.result.value))
                    setAccountInfo({address:address,balance:response.data.result.value.lamports/LAMPORTS_PER_SOL,allocatedDataSize:(response.data.result.value.data).length,assignedProgramId:response.data.result.value.owner==='11111111111111111111111111111111'?"SystemProgram":"",executable:true})
                }} >
                    <SearchIcon className="text-gray-400 hover:text-gray-600  "/>
                </div>
            </div>
        </div>  
    )
}