import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import React from 'react';
import SubstraHooksProviderSSR from '../components/app/substra-hooks-provider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS>
      <SubstraHooksProviderSSR
        apiProviderConfig={{
          kusama: {
            id: 'kusama',
            wsProviderUrl: 'wss://kusama-rpc.polkadot.io',
          },
        }}>
        <Component {...pageProps} />
      </SubstraHooksProviderSSR>
    </ChakraProvider>
  );
}

export default MyApp;
