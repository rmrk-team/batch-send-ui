import { ReactNode } from 'react';
import { ApiProviderConfig, SubstraHooksProvider } from '@substra-hooks/core';
import { AccountStoreSync } from '@rmrk-team/dotsama-wallet-react';

interface ISubstraHooksProviderProps {
  apiProviderConfig: ApiProviderConfig;
  children: ReactNode;
}

const SubstraHooksProviderSSR = ({ apiProviderConfig, children }: ISubstraHooksProviderProps) => {
  return (
    <SubstraHooksProvider
      apiProviderConfig={apiProviderConfig}
      defaultApiProviderId={'kusama'}
      autoInitialiseExtension>
      <>
        <AccountStoreSync />
        {children}
      </>
    </SubstraHooksProvider>
  );
};

export default SubstraHooksProviderSSR;
