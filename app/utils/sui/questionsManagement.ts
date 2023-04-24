import { getVector8FromIpfsHash, saveText } from 'utils/ipfs';
import {
  createPost,
  DELETE_POST_ACTION_NAME,
  deletePost,
  handleMoveCall,
  PERIOD_REWARD_CONTAINER,
  postLib,
  USER_RATING_COLLECTION,
} from 'utils/sui/sui';
import { WalletContextState } from '@suiet/wallet-kit';

export async function postSuiQuestion(
  wallet: WalletContextState,
  userSuiId: string,
  communitySuiId: string,
  questionData: object,
  postType: number,
  tags: Array<object>,
) {
  const ipfsLink = await saveText(JSON.stringify(questionData));
  const ipfsHash = getVector8FromIpfsHash(ipfsLink);
  return handleMoveCall(wallet, postLib, createPost, [
    USER_RATING_COLLECTION,
    userSuiId,
    communitySuiId,
    ipfsHash,
    postType,
    tags,
  ]);
}

export async function deleteSuiQuestion(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
) {
  return handleMoveCall(wallet, postLib, DELETE_POST_ACTION_NAME, [
    USER_RATING_COLLECTION,
    PERIOD_REWARD_CONTAINER,
    userSuiId,
    postId,
  ]);
}
