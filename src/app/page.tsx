"use client"

import React from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider
} from '@solana/wallet-adapter-react-ui';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import Appbar from './components/Appbar';
import SearchBar from './components/SearchBar';
import { AccountInfoProvider, AddressProvider } from './context';
import AccountInfo from './components/AccountInfo';

const Home = () => {
  return (
    <AddressProvider>
      <AccountInfoProvider>
        <ConnectionProvider endpoint='https://api.devnet.solana.com'>
          <WalletProvider wallets={[]}>
            <WalletModalProvider>
              <div className='bg-[#111] h-[1050px] w-auto  overflow-x-hidden'>
                <Appbar/>   
                <SearchBar />
                <AccountInfo/>  
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </AccountInfoProvider>
    </AddressProvider>
  )
}

export default Home