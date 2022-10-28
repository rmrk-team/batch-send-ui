import '../styles/globals.css';
import dynamic from 'next/dynamic';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import React from 'react';
import { AccountStoreSync } from '@rmrk-team/dotsama-wallet-react';
const SubstraHooksProviderSSR = dynamic(() => import('../components/app/substra-hooks-provider'), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SubstraHooksProviderSSR
      apiProviderConfig={{
        kusama: {
          id: 'kusama',
          wsProviderUrl: 'wss://kusama-rpc.polkadot.io',
        },
      }}>
      <ChakraProvider resetCSS>
        <AccountStoreSync />
        <Component {...pageProps} />
      </ChakraProvider>
    </SubstraHooksProviderSSR>
  );
}

export default MyApp;
