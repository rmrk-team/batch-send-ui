import { Box, Button, Select, useToast } from '@chakra-ui/react';
import PageContainer from '../components/app/page-container';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useApiProvider, usePolkadotExtension } from '@substra-hooks/core';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { ApiPromise } from '@polkadot/api';
import { web3FromAddress } from '@polkadot/extension-dapp';
import Dropzone from './upload-data';

type SendData = { recipient: string; nftId: string }[];

export const sendBatch = async (
  api: ApiPromise | null,
  account: InjectedAccountWithMeta | undefined,
  version: string,
  sendData: SendData,
  onSuccess: Function,
  onPending: Function,
  onError: Function,
) => {
  try {
    if (!api) {
      throw new Error('Api not ready');
    }

    if (!account) {
      throw new Error('Account not ready');
    }

    const remarks = sendData.map((sendDataItem) => {
      return api.tx.system.remark(
        `RMRK::SEND::${version}::${sendDataItem.nftId}::${sendDataItem.recipient}`,
      );
    });

    const accountAddress = account.address;
    const acc = await web3FromAddress(accountAddress);
    const tx = api.tx.utility.batchAll(remarks);
    await tx.signAndSend(accountAddress, { signer: acc.signer }, async (result) => {
      if (result.status.isInBlock) {
        onPending();
      } else if (result.status.isFinalized) {
        onSuccess();
      }
    });
    return;
  } catch (error: any) {
    console.error(error);
    onError(error?.message || 'something went wrong');
  }
};

const BatchSend = () => {
  const [sendData, setData] = useState<SendData>([]);
  const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta>();
  const [version, setVersion] = useState('2.0.0');
  const { accounts } = usePolkadotExtension();
  const apiProvider = useApiProvider();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const dataPayload = await fetch('/data.json');
      const dataJson = await dataPayload.json();
      setData(dataJson);
    };

    fetchData();
  }, []);

  const onSuccess = () => {
    toast({
      status: 'success',
      title: 'Success',
    });
  };

  const onPending = () => {
    toast({
      status: 'info',
      title: 'Pending...',
    });
  };

  const onError = (error: string) => {
    toast({
      status: 'error',
      title: error,
    });
  };

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const account = (accounts || []).find((acc) => acc.address === e.target.value);
    if (account) {
      setSelectedAccount(account);
    }
  };

  const onChangeVersion = (e: ChangeEvent<HTMLSelectElement>) => {
    setVersion(e.target.value);
  };

  const send = () => {
    sendBatch(apiProvider, selectedAccount, version, sendData, onSuccess, onPending, onError);
  };

  const onFileAccepted = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;
      if (binaryStr) {
        const jsonArray: SendData = JSON.parse(new TextDecoder().decode(binaryStr as ArrayBuffer));
        setData(jsonArray);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <PageContainer>
      <Box>
        <Box mb={4}>Batch Send RMRK NFTs</Box>

        <Box maxW={400}>
          <Box mb={1}>RMRK version:</Box>
          <Box mb={4}>
            <Select
              size={'sm'}
              onChange={onChangeVersion}
              value={version}
              _focus={{ outline: 'none' }}>
              <option value="1.0.0">RMR 1.0.0</option>
              <option value="2.0.0">RMRK 2.0.0</option>
            </Select>
          </Box>
        </Box>

        <Box maxW={400}>
          <Box mb={1}>From:</Box>
          <Box mb={4}>
            <Select
              size={'sm'}
              onChange={onChange}
              value={selectedAccount?.address}
              _focus={{ outline: 'none' }}>
              {(accounts || []).map((account) => (
                <option key={`account-${account.address}`} value={account.address}>
                  {account.meta.name} - {account.address}
                </option>
              ))}
            </Select>
          </Box>
        </Box>

        <Box maxW={400} mb={4}>
          <Dropzone onFileAccepted={onFileAccepted} />
        </Box>

        <Box>
          <Box>
            <Box mb={1}>Sending following:</Box>
            {sendData.map((sendDataItem) => (
              <Box
                key={sendDataItem.nftId}
                display={'flex'}
                my={1}
                borderBottomWidth={1}
                borderBottomStyle={'solid'}
                pb={2}>
                <Box mr={2}>
                  <Box color={'pink'} as={'span'} mr={1}>
                    NFT:
                  </Box>{' '}
                  {sendDataItem.nftId}
                </Box>
                <Box>
                  <Box color={'pink'} as={'span'} mr={1}>
                    TO:
                  </Box>{' '}
                  {sendDataItem.recipient}
                </Box>
              </Box>
            ))}
          </Box>

          <Box mt={4}>
            <Button onClick={send}>Send</Button>
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default BatchSend;