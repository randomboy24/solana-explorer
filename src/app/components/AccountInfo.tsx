import { useContext } from "react"
import { AccountInfoContext } from "../context"

export default function AccountInfo(){
    const {accountInfo} = useContext(AccountInfoContext);
    const {isSearched} = useContext(AccountInfoContext)
    console.log(isSearched)
    if(isSearched){
        return( 
            <div className="flex justify-center  items-center mt-20 ">
            <div className="px-3 flex flex-col justify-between  w-[90%]  sm:w-[85%] md:w-[75%] lg:w-[70%] xl:w-[60%]   rounded-lg  bg-[#242424]  flex-wrap text-white">
                <div className="h-16 flex items-center border-b border-gray-600">Overview</div>
                <div className="flex justify-between h-16 items-center border-b border-gray-600">
                    <div>
                        Adress
                    </div>
                    <div>
                        {accountInfo.address}
                    </div>
                </div>        
                <div className="flex justify-between h-16 items-center border-b border-gray-600">
                    <div>Balance (SOL)</div>
                    <div>{accountInfo.balance===null?'null':accountInfo.balance as number}</div>
                </div>      
                <div className="flex justify-between h-16 items-center border-b border-gray-600">
                    <div>Allocated Data Size</div>
                    <div>{accountInfo.allocatedDataSize} bSyte(s)</div>
                </div>   
                <div className="flex justify-between h-16 items-center border-b border-gray-600">
                    <div>Assigned Program Id</div>
                    <div>{accountInfo.assignedProgramId}</div>
                </div> 
                <div className="flex justify-between h-16 items-center">
                    <div>Executable</div>
                    <div>{accountInfo.executable?'Yes':'No'}</div>
                </div>
            </div>
        </div>
    )
    }
    else{
        return null;
    }
}