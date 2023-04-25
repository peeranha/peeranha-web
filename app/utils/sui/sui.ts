import {
  TransactionBlock,
  JsonRpcProvider,
  devnetConnection,
  PaginatedObjectsResponse,
} from '@mysten/sui.js';
import { WalletContextState } from '@suiet/wallet-kit';

const SUI_PACKAGE_ID = '0x87fdd12300ec006cf986231983766ec193bea14c96b727a1d1b9a94241edf07d';
export const USER_RATING_COLLECTION =
  '0xfa4ab7ac89a1801ae2a43018413f70c562331bab9d28f2ff9d092f378fecb3d3';
export const PERIOD_REWARD_CONTAINER =
  '0x94d9ef89b4e4f45ec706c4afffd1898b2789bcfe13d03f7e1e5c69b027e79c02';

export const SUI_INDEXER_URL = 'https://dev3-query-index-api.testpeeranha.io/graphql';
export const PERIOD_REWARD_CONTAINER =
  '0x94d9ef89b4e4f45ec706c4afffd1898b2789bcfe13d03f7e1e5c69b027e79c02';

// TODO: name these constants properly
export const userLib = 'userLib';
export const communityLib = 'communityLib';
export const postLib = 'postLib';
export const followCommunityLib = 'followCommunityLib';
export const userObject = 'User';
export const communityObject = 'Community';

export const createUser = 'createUser';
export const updateUser = 'updateUser';
export const updateCommunity = 'updateCommunity';
export const createCommunity = 'createCommunity';
export const updateTag = 'updateTag';
export const createTag = 'createTag';
export const createPost = 'createPost';
export const editPost = 'authorEditPost';
export const votePost = 'votePost';
export const voteReply = 'voteReply';
export const CREATE_REPLY_ACTION_NAME = 'createReply';
export const CREATE_COMMENT_ACTION_NAME = 'createComment';

export const AUTHOR_EDIT_REPLY_ACTION_NAME = 'authorEditReply';
export const MODERATOR_EDIT_REPLY_ACTION_NAME = 'moderatorEditReply';

export const DELETE_POST_ACTION_NAME = 'deletePost';
export const DELETE_ANSWER_ACTION_NAME = 'deleteReply';
export const DELETE_COMMENT_ACTION_NAME = 'deleteComment';
export const EDIT_COMMENT_ACTION_NAME = 'editComment';
export const CHANGE_BEST_REPLY_ACTION_NAME = 'changeStatusBestReply';

export const followCommunity = 'followCommunity';
export const unfollowCommunity = 'unfollowCommunity';
export const isSuiBlockchain = process.env.BLOCKCHAIN === 'sui';
export const IS_INDEXER_ON = true;

export const CREATE_POST_EVENT_NAME = 'CreatePostEvent';

export const waitForTransactionConfirmation = async (_transaction: string): Promise<void> =>
  // TODO: add actual implementation
  new Promise((resolve) => setTimeout(resolve, 4000));

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

  const transactionResult = await wallet.signAndExecuteTransactionBlock({
    transactionBlock: tx,
  });

  await waitForTransactionConfirmation(transactionResult.digest);

  return transactionResult;
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

export const getTransactionEventByName = async (
  transacion: string,
  eventName: string,
): Promise<
  | {
      id: {
        txDigest: string;
        eventSeq: string;
      };
      packageId: string;
      transactionModule: string;
      sender: string;
      type: string;
      parsedJson?: Record<string, any> | undefined;
      bcs?: string | undefined;
      timestampMs?: string | undefined;
    }
  | undefined
> => {
  const rpc = new JsonRpcProvider(devnetConnection);
  const result = await rpc.getTransactionBlock({
    digest: transacion,
    options: {
      showInput: false,
      showEffects: false,
      showEvents: true,
      showObjectChanges: false,
      showBalanceChanges: false,
    },
  });
  const { events } = result;

  if (!events) {
    return undefined;
  }

  const resultEvent = events.filter((event) => event.type.includes(eventName));

  if (!resultEvent) {
    return undefined;
  }

  return resultEvent[0];
};
