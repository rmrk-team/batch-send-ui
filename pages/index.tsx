import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import React from 'react';

import dynamic from 'next/dynamic';

const BatchMint = dynamic(() => import('../components/batch-mint'), {
  ssr: false,
});

const WalletSelect = dynamic(() => import('../components/wallet-select'), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <Box>
      <WalletSelect />
      <BatchMint />
    </Box>
  );
};

export default Home;
