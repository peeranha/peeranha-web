import { getVector8FromIpfsHash, saveText } from 'utils/ipfs';
import {
  AUTHOR_EDIT_REPLY_ACTION_NAME,
  CREATE_COMMENT_ACTION_NAME,
  CREATE_REPLY_ACTION_NAME,
  createPost,
  DELETE_ANSWER_ACTION_NAME,
  DELETE_COMMENT_ACTION_NAME,
  DELETE_POST_ACTION_NAME,
  CHANGE_BEST_REPLY_ACTION_NAME,
  editPost,
  EDIT_COMMENT_ACTION_NAME,
  handleMoveCall,
  MODERATOR_EDIT_REPLY_ACTION_NAME,
  postLib,
  votePost,
  voteReply,
  CLOCK_OBJECT_ID,
} from 'utils/sui/sui';
import { WalletContextState } from '@suiet/wallet-kit';

export async function postSuiQuestion(
  wallet: WalletContextState,
  userSuiId: string,
  communitySuiId: string,
  questionData: object,
  postType: number,
  tags: Array<object>,
  language: number,
) {
  const ipfsLink = await saveText(JSON.stringify(questionData));
  const ipfsHash = getVector8FromIpfsHash(ipfsLink);
  return handleMoveCall(wallet, postLib, createPost, [
    process.env.USER_RATING_COLLECTION_ID,
    userSuiId,
    communitySuiId,
    process.env.USER_ROLES_COLLECTION_ID,
    ipfsHash,
    postType,
    tags,
    language,
    CLOCK_OBJECT_ID,
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
  language: number,
) {
  const ipfsLink = await saveText(JSON.stringify(questionData));
  const ipfsHash = getVector8FromIpfsHash(ipfsLink);
  return handleMoveCall(wallet, postLib, editPost, [
    process.env.USER_RATING_COLLECTION_ID,
    process.env.PERIOD_REWARD_CONTAINER_ID,
    userSuiId,
    process.env.USER_ROLES_COLLECTION_ID,
    postSuiId,
    postMetaData,
    communitySuiId,
    ipfsHash,
    postType,
    tags,
    language,
  ]);
}

export async function deleteSuiQuestion(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
) {
  return handleMoveCall(wallet, postLib, DELETE_POST_ACTION_NAME, [
    process.env.USER_RATING_COLLECTION_ID,
    process.env.PERIOD_REWARD_CONTAINER_ID,
    userSuiId,
    process.env.USER_ROLES_COLLECTION_ID,
    postId,
    CLOCK_OBJECT_ID,
  ]);
}

export async function postSuiComment(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
  answerId: number,
  ipfsLink: string,
  language: number,
) {
  const ipfsHash = getVector8FromIpfsHash(ipfsLink);
  return handleMoveCall(wallet, postLib, CREATE_COMMENT_ACTION_NAME, [
    process.env.USER_RATING_COLLECTION_ID,
    userSuiId,
    process.env.USER_ROLES_COLLECTION_ID,
    postId,
    answerId,
    ipfsHash,
    language,
    CLOCK_OBJECT_ID,
  ]);
}

export async function deleteSuiComment(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
  parentId: string,
  commentId: string,
) {
  return handleMoveCall(wallet, postLib, DELETE_COMMENT_ACTION_NAME, [
    process.env.USER_RATING_COLLECTION_ID,
    process.env.PERIOD_REWARD_CONTAINER_ID,
    userSuiId,
    process.env.USER_ROLES_COLLECTION_ID,
    postId,
    parentId,
    commentId,
  ]);
}

export async function editSuiComment(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
  comment: any,
  parentId: number,
  commentId: number,
  ipfsLink: string,
  language: number,
) {
  const ipfsHash = getVector8FromIpfsHash(ipfsLink);

  return handleMoveCall(wallet, postLib, EDIT_COMMENT_ACTION_NAME, [
    process.env.USER_RATING_COLLECTION_ID,
    userSuiId,
    process.env.USER_ROLES_COLLECTION_ID,
    postId,
    comment,
    parentId,
    commentId,
    ipfsHash,
    language,
  ]);
}

export async function postSuiAnswer(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
  ipfsLink: string,
  isOfficial: boolean,
  language: number,
) {
  const ipfsHash = getVector8FromIpfsHash(ipfsLink);
  return handleMoveCall(wallet, postLib, CREATE_REPLY_ACTION_NAME, [
    process.env.USER_RATING_COLLECTION_ID,
    process.env.PERIOD_REWARD_CONTAINER_ID,
    userSuiId,
    process.env.USER_ROLES_COLLECTION_ID,
    postId,
    0, // parent reply id is always 0 for now
    ipfsHash,
    isOfficial,
    language,
    CLOCK_OBJECT_ID,
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
  language: number,
) {
  const ipfsLink = await saveText(JSON.stringify(answerData));
  const ipfsHash = getVector8FromIpfsHash(ipfsLink);
  return handleMoveCall(wallet, postLib, AUTHOR_EDIT_REPLY_ACTION_NAME, [
    process.env.USER_RATING_COLLECTION_ID,
    userSuiId,
    process.env.USER_ROLES_COLLECTION_ID,
    postId,
    answerObjectId,
    answerId,
    ipfsHash,
    isOfficial,
    language,
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
  language: number,
) {
  const ipfsLink = await saveText(JSON.stringify(answerData));
  const ipfsHash = getVector8FromIpfsHash(ipfsLink);
  return handleMoveCall(wallet, postLib, MODERATOR_EDIT_REPLY_ACTION_NAME, [
    process.env.USER_RATING_COLLECTION_ID,
    userSuiId,
    process.env.USER_ROLES_COLLECTION_ID,
    postId,
    answerId,
    isOfficial,
    language,
  ]);
}

export async function deleteSuiAnswer(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
  answerId: string,
) {
  return handleMoveCall(wallet, postLib, DELETE_ANSWER_ACTION_NAME, [
    process.env.USER_RATING_COLLECTION_ID,
    process.env.PERIOD_REWARD_CONTAINER_ID,
    userSuiId,
    process.env.USER_ROLES_COLLECTION_ID,
    postId,
    answerId,
    CLOCK_OBJECT_ID,
  ]);
}

export async function voteSuiPost(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
  isUpvote: boolean,
) {
  return handleMoveCall(wallet, postLib, votePost, [
    process.env.USER_RATING_COLLECTION_ID,
    process.env.PERIOD_REWARD_CONTAINER_ID,
    userSuiId,
    process.env.USER_ROLES_COLLECTION_ID,
    postId,
    isUpvote,
  ]);
}

export async function voteSuiReply(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
  replyId: number,
  isUpvote: boolean,
) {
  return handleMoveCall(wallet, postLib, voteReply, [
    process.env.USER_RATING_COLLECTION_ID,
    process.env.PERIOD_REWARD_CONTAINER_ID,
    userSuiId,
    process.env.USER_ROLES_COLLECTION_ID,
    postId,
    replyId,
    isUpvote,
  ]);
}

export async function markAsAcceptedSuiReply(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
  answerId: string,
) {
  return handleMoveCall(wallet, postLib, CHANGE_BEST_REPLY_ACTION_NAME, [
    process.env.USER_RATING_COLLECTION_ID,
    process.env.PERIOD_REWARD_CONTAINER_ID,
    process.env.USER_ROLES_COLLECTION_ID,
    userSuiId,
    postId,
    answerId,
  ]);
}
