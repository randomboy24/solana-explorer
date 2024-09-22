import { SearchIcon } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="flex justify-center     items-center mt-10 ">
            <div className="flex justify-between   w-[70%] items-center rounded-lg  bg-[#242424]">
                <input type="text" placeholder="put your public address here" className="pl-3 w-[95%] rounded-md h-[54px] bg-[#242424]  text-white focus:outline-none focus:ring-0" />
                <div className="border-l-[1px] w-[5%] pl-4 bg-[#242424] h-[100%] hover:cursor-pointer" >
                    <SearchIcon className="text-gray-400 hover:text-gray-600 text-xs mr-6  "/>
                </div>
            </div>
        </div>  
    )
}