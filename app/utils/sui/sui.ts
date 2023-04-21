import {
  TransactionBlock,
  JsonRpcProvider,
  testnetConnection,
  devnetConnection,
} from '@mysten/sui.js';
import { WalletContextState } from '@suiet/wallet-kit';

const SUI_PACKAGE_ID = '0x29b03f4f192f748fd94849972bb8f2d6133710f8d05be675fbdbfa63a63bce5b';
export const USER_RATING_COLLECTION =
  '0xc552fbbfaddf9c331243228c2ac1cfedb2f73260c32287c434bd44855597ed46';
export const PERIOD_REWARD_CONTAINER =
  '0x996b3826b5d5eb6ddc97166cd9ec038e35a301010992d6af511d79cf939add10';

export const userLib = 'userLib';
export const createUser = 'createUser';
export const userObject = 'User';

export const isSuiBlockchain: () => boolean = () => process.env.BLOCKCHAIN === 'sui';

export const getOwnedObject = async (
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
      StructType: `${SUI_PACKAGE_ID}::${libName}::${objectName}`,
    },
    options: {
      showType: true,
    },
  });
};

export const handleMoveCall = async (
  wallet: WalletContextState,
  libName: string,
  action: string,
  data: unknown[],
): Promise<object> => {
  const tx = new TransactionBlock();
  tx.moveCall({
    // example
    // 0x4e05c416411b99d4a4b12dcd0599811fed668010f994b4cd37683d886f45262f::userLib::createUser
    target: `${SUI_PACKAGE_ID}::${libName}::${action}`,
    arguments: data.map((item: unknown) => tx.pure(item)),
  });

  return wallet.signAndExecuteTransactionBlock({
    transactionBlock: tx,
  });
};
