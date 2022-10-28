import type { NextPage } from 'next';
import {Box, Button} from '@chakra-ui/react';
import React from 'react';

import {
  ConnectAccountModal,
  selectedAccountSelector,
  toggleAccountSelectionModalSelector,
  useAccountModalStore,
  useSelectedAccountsStore,
  selectedWalletSelector,
  useWalletsStore,
  ACCOUNT_MODAL_STEPS,
} from '@rmrk-team/dotsama-wallet-react';

import dynamic from 'next/dynamic';

const BatchMint = dynamic(() => import('../components/batch-mint'), {
  ssr: false,
});

const Home: NextPage = () => {
  const selectedAccount = useSelectedAccountsStore(selectedAccountSelector);
  const toggleAccountSelectionModal = useAccountModalStore(toggleAccountSelectionModalSelector);
  const selectedWallet = useWalletsStore(selectedWalletSelector);
  const accountCopy = selectedAccount?.name || selectedAccount?.address;
  const openSubstrateAccountsModal = () => {
    toggleAccountSelectionModal(true, selectedWallet ? ACCOUNT_MODAL_STEPS.accounts : undefined);
  };
  return (
    <Box>
      <ConnectAccountModal />
      <Box m={10}>
        <Box my={4}>
          <Button onClick={openSubstrateAccountsModal} size={'lg'}>
            {selectedAccount ? accountCopy : 'Connect wallet'}
          </Button>
        </Box>
      </Box>
      <BatchMint />
    </Box>
  );
};

export default Home;
