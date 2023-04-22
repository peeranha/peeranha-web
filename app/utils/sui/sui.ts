import {
  TransactionBlock,
  JsonRpcProvider,
  devnetConnection,
  PaginatedObjectsResponse,
} from '@mysten/sui.js';
import { WalletContextState } from '@suiet/wallet-kit';

const SUI_PACKAGE_ID = '0xc2fef7601b437798ce882e7b3465a8a19d33982952e0a877a4be73f319d44775';
export const USER_RATING_COLLECTION =
  '0xb24d16b81133a76259d5367ede49cbd5b0fe292c87fb3fb333d0fcaf900348de';
export const PERIOD_REWARD_CONTAINER =
  '0x2550ab7d916675c52e3d6a4b7dc7d8f3bb8400f27c8160750d516cbeec757568';

export const userLib = 'userLib';
export const createUser = 'createUser';
export const userObject = 'User';

export const isSuiBlockchain = process.env.BLOCKCHAIN === 'sui';

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

export const getOwnedObject = async (
  libName: string,
  objectName: string,
  ownerAddress: string | undefined,
): Promise<PaginatedObjectsResponse | null> => {
  if (!ownerAddress) return null;
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
      showContent: true,
    },
  });
};

// getObjectById(userObjects.data[0].data.objectId)
export const getObjectById = async (objectId: string): Promise<object> => {
  const rpc = new JsonRpcProvider(devnetConnection);
  return rpc.getObject({
    id: objectId,
    options: {
      showType: true,
      showContent: true,
    },
  });
};
