import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import React from 'react';

import dynamic from 'next/dynamic';

const BatchSend = dynamic(() => import('../components/batch-send'), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <Box>
      <BatchSend />
    </Box>
  );
};

export default Home;
