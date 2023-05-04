import {
  TransactionBlock,
  JsonRpcProvider,
  Connection,
  PaginatedObjectsResponse,
} from '@mysten/sui.js';
import { WalletContextState } from '@suiet/wallet-kit';
import { ApplicationError } from 'utils/errors';
import { delay } from 'utils/reduxUtils';

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
export const moderatorEditPost = 'moderatorEditPostMetaData';
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

export const CLOCK_OBJECT_ID = '0x6';

export const TX_WAIT_DELAY_MS = 1000;

export function createSuiProvider() {
  if (!process.env.SUI_RPC_ENDPOINT) {
    throw new ApplicationError('SUI_RPC_ENDPOINT is not configured');
  }

  const connection = new Connection({
    fullnode: process.env.SUI_RPC_ENDPOINT,
  });

  return new JsonRpcProvider(connection);
}

export const waitForTransactionConfirmation = async (transactionDigest: string): Promise<any> => {
  const provider = createSuiProvider();
  const confirmed = false;
  /* eslint-disable no-await-in-loop */
  do {
    try {
      const confirmedTx = await provider.getTransactionBlock({
        digest: transactionDigest,
        options: {
          showInput: false,
          showEffects: false,
          showEvents: true,
          showObjectChanges: false,
          showBalanceChanges: false,
        },
      });
      if (!confirmedTx.errors) {
        return confirmedTx;
      }
    } catch {}
    await delay(TX_WAIT_DELAY_MS);
  } while (!confirmed);
  /* eslint-enable no-await-in-loop */
  return undefined;
};

export const handleMoveCall = async (
  wallet: WalletContextState,
  libName: string,
  action: string,
  data: unknown[],
  waitForConfirmaiton = true,
): Promise<object> => {
  if (!process.env.SUI_SPONSORED_TRANSACTIONS_ENDPOINT) {
    throw new ApplicationError('SUI_SPONSORED_TRANSACTIONS_ENDPOINT is not configured');
  }

  const response = await fetch(process.env.SUI_SPONSORED_TRANSACTIONS_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: wallet.address,
      module: libName,
      action,
      arguments: data,
    }),
  });

  const sponsorSignedTransaction = await response.json();

  const transactionBlock = TransactionBlock.from(sponsorSignedTransaction?.transactionBlockBytes);

  const senderSignedTransaction = await wallet.signTransactionBlock({
    transactionBlock,
  });

  const provider = createSuiProvider();

  const executeResponse = await provider.executeTransactionBlock({
    transactionBlock: sponsorSignedTransaction?.transactionBlockBytes,
    signature: [sponsorSignedTransaction?.signatureBytes, senderSignedTransaction.signature],
    options: { showEffects: true },
    requestType: 'WaitForLocalExecution',
  });

  if (!waitForConfirmaiton) {
    return executeResponse;
  }

  const confirmedTx = await waitForTransactionConfirmation(executeResponse.digest);
  return confirmedTx;
};

export const getOwnedObject = async (
  libName: string,
  objectName: string,
  ownerAddress: string | undefined,
): Promise<PaginatedObjectsResponse | null> => {
  if (!ownerAddress) return null;
  const rpc = createSuiProvider();
  return rpc.getOwnedObjects({
    owner: ownerAddress,
    filter: {
      // example
      // 0x4e05c416411b99d4a4b12dcd0599811fed668010f994b4cd37683d886f45262f::userLib::User
      StructType: `${process.env.SUI_PACKAGE_ID}::${libName}::${objectName}`,
    },
    options: {
      showType: true,
      showContent: true,
    },
  });
};

// getObjectById(userObjects.data[0].data.objectId)
export const getObjectById = async (objectId: string): Promise<object> => {
  const rpc = createSuiProvider();
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
  const rpc = createSuiProvider();
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
