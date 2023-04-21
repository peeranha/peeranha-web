import {
  TransactionBlock,
  JsonRpcProvider,
  testnetConnection,
  devnetConnection,
} from '@mysten/sui.js';
import { WalletContextState } from '@suiet/wallet-kit';
export const isSuiBlockchain: () => boolean = () => process.env.BLOCKCHAIN === 'sui';

export const getOwnedObject = async (
  packageObjectId: string,
  libName: string,
  objectName: string,
  ownerAddress: string,
): Promise<object> => {
  const rpc = new JsonRpcProvider(devnetConnection);
  return rpc.getOwnedObjects({
    owner: ownerAddress,
    filter: {
      // example
      // 0x4e05c416411b99d4a4b12dcd0599811fed668010f994b4cd37683d886f45262f::userLib::User
      StructType: `${packageObjectId}::${libName}::${objectName}`,
    },
    options: {
      showType: true,
    },
  });
};

export const handleMoveCall = async (
  wallet: WalletContextState,
  packageObjectId: string,
  libName: string,
  action: string,
  data: unknown[],
): Promise<object> => {
  const tx = new TransactionBlock();
  tx.moveCall({
    // example
    // 0x4e05c416411b99d4a4b12dcd0599811fed668010f994b4cd37683d886f45262f::userLib::createUser
    target: `${packageObjectId}::${libName}::${action}`,
    arguments: data.map((item: unknown) => tx.pure(item)),
  });

  return wallet.signAndExecuteTransactionBlock({
    transactionBlock: tx,
  });
};
