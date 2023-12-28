import {
  Connection,
  JsonRpcProvider,
  PaginatedObjectsResponse,
  TransactionBlock,
} from '@mysten/sui.js';
import { WalletContextState } from '@suiet/wallet-kit';
import { EMAIL_LOGIN_DATA } from 'containers/Login/constants';
import { getCookie } from 'utils/cookie';
import { ApplicationError } from 'utils/errors';
import { writeTransactionList } from 'utils/transactionsListManagement';

// TODO: name these constants properly
export const userLib = 'userLib';
export const communityLib = 'communityLib';
export const postLib = 'postLib';
export const followCommunityLib = 'followCommunityLib';
export const achievementLib = 'achievementLib';
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
export const grantRole = 'grantRole';
export const revokeRole = 'revokeRole';
export const mintUserNFT = 'mintUserNFT';
export const updateDocumentationTree = 'updateDocumentationTree';

export const AUTHOR_EDIT_REPLY_ACTION_NAME = 'authorEditReply';
export const MODERATOR_EDIT_REPLY_ACTION_NAME = 'moderatorEditReply';

export const DELETE_POST_ACTION_NAME = 'deletePost';
export const DELETE_ANSWER_ACTION_NAME = 'deleteReply';
export const DELETE_COMMENT_ACTION_NAME = 'deleteComment';
export const EDIT_COMMENT_ACTION_NAME = 'editComment';
export const CHANGE_BEST_REPLY_ACTION_NAME = 'changeStatusBestReply';

export const followCommunity = 'followCommunity';
export const unfollowCommunity = 'unfollowCommunity';
export const IS_INDEXER_ON = true;

export const CREATE_POST_EVENT_NAME = 'CreatePostEvent';

export const CLOCK_OBJECT_ID = '0x6';

export const TX_WAIT_DELAY_MS = 1000;

let setTransactionList: ((arg0: any[]) => void) | null = null;
const transactionList: any[] = [];

export const initSetter = (setter: any) => {
  setTransactionList = setter;
};

export function createSuiProvider() {
  if (!process.env.SUI_RPC_ENDPOINT) {
    throw new ApplicationError('SUI_RPC_ENDPOINT is not configured');
  }

  const connection = new Connection({
    fullnode: process.env.SUI_RPC_ENDPOINT,
  });

  return new JsonRpcProvider(connection);
}

const suiProvider = createSuiProvider();

export const waitForTransactionConfirmation = async (
  transactionDigest: string,
  maxAttempts = 3,
): Promise<any> => {
  let attempts = 0;

  const getTransactionBlock = async () => {
    try {
      return await suiProvider.getTransactionBlock({
        digest: transactionDigest,
        options: {
          showInput: false,
          showEffects: false,
          showEvents: true,
          showObjectChanges: false,
          showBalanceChanges: false,
        },
      });
    } catch (error) {
      attempts += 1;

      if (attempts < maxAttempts) {
        return new Promise((resolve) => {
          setTimeout(() => resolve(getTransactionBlock()), 2000);
        });
      }
      throw error;
    }
  };

  return getTransactionBlock();
};

const setTransactionResult = (digest: string, status: number) => {
  transactionList.find(
    (transactionFromList) => transactionFromList.transactionHash === digest,
  ).result = { status };
  if (setTransactionList) {
    setTransactionList(transactionList);
  }
  setTimeout(() => {
    const index = transactionList
      .map((transactionFromList) => transactionFromList.transactionHash)
      .indexOf(digest);
    if (index !== -1) {
      transactionList.splice(index, 1);
      if (setTransactionList) {
        setTransactionList(transactionList);
      }
    }
  }, '30000');
};

export const handleMoveCall = async (
  wallet: WalletContextState,
  libName: string,
  action: string,
  data: unknown[],
): Promise<string> => {
  const emailCookieValue = getCookie(EMAIL_LOGIN_DATA);
  const emailData = emailCookieValue ? JSON.parse(emailCookieValue) : null;
  if (emailData) {
    if (!process.env.SUI_GASLESS_TRANSACTIONS_ENDPOINT) {
      throw new ApplicationError('SUI_GASLESS_TRANSACTIONS_ENDPOINT is not configured');
    }
    const hash = action + data.join('');
    transactionList.push({
      action,
      transactionHash: hash,
    });
    if (setTransactionList) {
      setTransactionList(transactionList);
    }
    const response = await fetch(process.env.SUI_GASLESS_TRANSACTIONS_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: emailData.token,
      },
      body: JSON.stringify({
        userId: emailData.email,
        module: libName,
        action,
        arguments: data,
      }),
    });
    const responseBody = await response.json();

    transactionList.find(
      (transactionFromList) => transactionFromList.transactionHash === hash,
    ).transactionHash = responseBody?.digest;

    setTransactionResult(responseBody?.digest, responseBody?.success ? 1 : 2);
    await waitForTransactionConfirmation(responseBody.digest);

    if (responseBody.success) {
      return responseBody;
    }
    throw new Error('Transaction Failed');
  }
  if (!process.env.SUI_SPONSORED_TRANSACTIONS_ENDPOINT) {
    throw new ApplicationError('SUI_SPONSORED_TRANSACTIONS_ENDPOINT is not configured');
  }

  const reCaptchaToken = await window.grecaptcha.execute(process.env.RECAPTCHA_SITE_KEY, {
    action: 'homepage',
  });

  const response = await fetch(process.env.SUI_SPONSORED_TRANSACTIONS_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      reCaptchaToken,
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
  transactionList.push({
    action,
    transactionHash: await transactionBlock.getDigest(),
  });
  if (setTransactionList) {
    setTransactionList(transactionList);
  }
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

  writeTransactionList(transactionList, 3);
  const result = await waitForTransactionConfirmation(executeResponse.digest);
  setTransactionResult(
    executeResponse.digest,
    executeResponse?.effects.status.status === 'failure' ? 2 : 1,
  );

  if (executeResponse?.effects.status.status === 'failure') {
    throw new Error('Transaction Failed');
  }

  return result;
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
      StructType: `${process.env.SUI_PACKAGE_ID_ORIGINAL}::${libName}::${objectName}`,
    },
    options: {
      showType: true,
      showContent: true,
    },
  });
};
