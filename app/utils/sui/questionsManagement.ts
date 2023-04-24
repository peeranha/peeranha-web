import { getVector8FromIpfsHash, saveText } from 'utils/ipfs';
import {
  AUTHOR_EDIT_REPLY_ACTION_NAME,
  CREATE_COMMENT_ACTION_NAME,
  CREATE_REPLY_ACTION_NAME,
  createPost,
  DELETE_POST_ACTION_NAME,
  editPost,
  handleMoveCall,
  MODERATOR_EDIT_REPLY_ACTION_NAME,
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

export async function editSuiQuestion(
  wallet: WalletContextState,
  userSuiId: string,
  postSuiId: string,
  postMetaData: string,
  communitySuiId: string,
  questionData: object,
  postType: number,
  tags: Array<object>,
) {
  const ipfsLink = await saveText(JSON.stringify(questionData));
  const ipfsHash = getVector8FromIpfsHash(ipfsLink);
  return handleMoveCall(wallet, postLib, editPost, [
    USER_RATING_COLLECTION,
    PERIOD_REWARD_CONTAINER,
    userSuiId,
    postSuiId,
    postMetaData,
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
  console.log(postId);
  return handleMoveCall(wallet, postLib, DELETE_POST_ACTION_NAME, [
    USER_RATING_COLLECTION,
    PERIOD_REWARD_CONTAINER,
    userSuiId,
    postId,
  ]);
}

export async function postSuiComment(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
  answerId: number,
  ipfsLink: string,
) {
  const ipfsHash = getVector8FromIpfsHash(ipfsLink);
  return handleMoveCall(wallet, postLib, CREATE_COMMENT_ACTION_NAME, [
    USER_RATING_COLLECTION,
    userSuiId,
    postId,
    answerId,
    ipfsHash,
  ]);
}

export async function postSuiAnswer(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
  ipfsLink: string,
  isOfficial: boolean,
) {
  const ipfsHash = getVector8FromIpfsHash(ipfsLink);
  return handleMoveCall(wallet, postLib, CREATE_REPLY_ACTION_NAME, [
    USER_RATING_COLLECTION,
    PERIOD_REWARD_CONTAINER,
    userSuiId,
    postId,
    0, // parent reply id is always 0 for now
    ipfsHash,
    isOfficial,
  ]);
}

export async function authorEditSuiAnswer(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
  answerObjectId: string,
  answerId: number,
  answerData: any,
  isOfficial: boolean,
) {
  const ipfsLink = await saveText(JSON.stringify(answerData));
  const ipfsHash = getVector8FromIpfsHash(ipfsLink);
  return handleMoveCall(wallet, postLib, AUTHOR_EDIT_REPLY_ACTION_NAME, [
    USER_RATING_COLLECTION,
    userSuiId,
    postId,
    answerObjectId,
    answerId,
    ipfsHash,
    isOfficial,
  ]);
}

export async function moderatorEditSuiAnswer(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
  answerObjectId: string,
  answerId: number,
  answerData: any,
  isOfficial: boolean,
) {
  const ipfsLink = await saveText(JSON.stringify(answerData));
  const ipfsHash = getVector8FromIpfsHash(ipfsLink);
  return handleMoveCall(wallet, postLib, MODERATOR_EDIT_REPLY_ACTION_NAME, [
    USER_RATING_COLLECTION,
    userSuiId,
    postId,
    answerId,
    isOfficial,
  ]);
}
