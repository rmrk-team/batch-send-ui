import {
  ACCOUNT_MODAL_STEPS,
  ConnectAccountModal,
  selectedAccountSelector,
  selectedWalletSelector,
  toggleAccountSelectionModalSelector,
  useAccountModalStore,
  useSelectedAccountsStore,
  useWalletsStore,
} from '@rmrk-team/dotsama-wallet-react';
import { Box, Button } from '@chakra-ui/react';
import React from 'react';

const WalletSelect = () => {
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
    </Box>
  );
};

export default WalletSelect;
