import { useWalletsStore, getWalletBySource, WALLET_EXTENSIONS } from '@rmrk-team/dotsama-wallet-react';

export const web3FromSource = () => {
  const { selectedWallet } = useWalletsStore.getState();
  const wallet = getWalletBySource(selectedWallet as WALLET_EXTENSIONS);

  return wallet?.extension;
};
