"use client"

import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import Appbar from './components/Appbar';
import SearchBar from './components/SearchBar';

const Home = () => {
  return (
    <ConnectionProvider endpoint='https://api.devnet.solana.com'>
      <WalletProvider wallets={[]}>
        <WalletModalProvider>
          <div className='bg-[#111] h-screen w-screen'>
            <Appbar/> 
            <SearchBar />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default Home