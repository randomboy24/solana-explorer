import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

// Define the shape of the Address context
interface AddressContextType {
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
}

// Create the Address context with a default value (empty strings or placeholders)
export const AddressContext = createContext<AddressContextType>({
  address: "",
  setAddress: () => {}, // Placeholder, will be overridden by the Provider
});

// Address Provider component
export const AddressProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string>("");

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

// Define the shape of the AccountInfo context
interface AccountInfoObj {
  address: string;  
  balance: number | string; // Corrected from 'balace' to 'balance'
  allocatedDataSize: number;
  assignedProgramId: string;
  executable: boolean; // Changed to boolean for better clarity
}

interface AccountInfoContextType {
  accountInfo: AccountInfoObj;
  setAccountInfo: Dispatch<SetStateAction<AccountInfoObj>>; // Updated type
  setIsSearched:Dispatch<SetStateAction<boolean>>,
  isSearched:boolean
}

// Create the AccountInfo context
export const AccountInfoContext = createContext<AccountInfoContextType>({
  accountInfo: {
    address: "",
    balance: 0,
    allocatedDataSize: 0,
    assignedProgramId: "",
    executable: false, // Provide a default value
  },
  setAccountInfo: () => {}, // Placeholder, will be overridden by the Provider,
  isSearched:false,
  setIsSearched:() => {}
});

// AccountInfo Provider component
export const AccountInfoProvider = ({ children }: { children: ReactNode }) => {
  const [accountInfo, setAccountInfo] = useState<AccountInfoObj>({
    address: "",
    balance: 0, // Fixed typo here
    allocatedDataSize: 0,
    assignedProgramId: "",
    executable: false, // Set default boolean value
  });

  const [isSearched,setIsSearched] = useState(false);

  return (
    <AccountInfoContext.Provider value={{ accountInfo, setAccountInfo,isSearched ,setIsSearched }}>
      {children}
    </AccountInfoContext.Provider>
  );
};

