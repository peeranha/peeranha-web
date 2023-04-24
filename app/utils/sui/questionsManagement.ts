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
  PERIOD_REWARD_CONTAINER_ID,
  postLib,
  USER_RATING_COLLECTION_ID,
  votePost,
  voteReply,
} from 'utils/sui/sui';
import { WalletContextState } from '@suiet/wallet-kit';
import { CONTRACT_CONTENT, VOTE_ITEM } from 'utils/ethConstants';

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
    USER_RATING_COLLECTION_ID,
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
    USER_RATING_COLLECTION_ID,
    PERIOD_REWARD_CONTAINER_ID,
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
  return handleMoveCall(wallet, postLib, DELETE_POST_ACTION_NAME, [
    USER_RATING_COLLECTION_ID,
    PERIOD_REWARD_CONTAINER_ID,
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
    USER_RATING_COLLECTION_ID,
    userSuiId,
    postId,
    answerId,
    ipfsHash,
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
    USER_RATING_COLLECTION_ID,
    PERIOD_REWARD_CONTAINER_ID,
    userSuiId,
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
) {
  const ipfsHash = getVector8FromIpfsHash(ipfsLink);

  return handleMoveCall(wallet, postLib, EDIT_COMMENT_ACTION_NAME, [
    USER_RATING_COLLECTION_ID,
    userSuiId,
    postId,
    comment,
    parentId,
    commentId,
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
    USER_RATING_COLLECTION_ID,
    PERIOD_REWARD_CONTAINER_ID,
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
    USER_RATING_COLLECTION_ID,
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
    USER_RATING_COLLECTION_ID,
    userSuiId,
    postId,
    answerId,
    isOfficial,
  ]);
}

export async function deleteSuiAnswer(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
  answerId: string,
) {
  return handleMoveCall(wallet, postLib, DELETE_ANSWER_ACTION_NAME, [
    USER_RATING_COLLECTION_ID,
    PERIOD_REWARD_CONTAINER_ID,
    userSuiId,
    postId,
    answerId,
  ]);
}

export async function upVotePost(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
  isUpvote: boolean,
) {
  return handleMoveCall(wallet, postLib, votePost, [
    USER_RATING_COLLECTION_ID,
    PERIOD_REWARD_CONTAINER_ID,
    userSuiId,
    postId,
    isUpvote,
  ]);
}

export async function upVoteReply(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
  replyId: number,
  isUpvote: boolean,
) {
  return handleMoveCall(wallet, postLib, voteReply, [
    USER_RATING_COLLECTION_ID,
    PERIOD_REWARD_CONTAINER_ID,
    userSuiId,
    postId,
    replyId,
    isUpvote,
  ]);
}

export async function downVote(user, questionId, answerId, ethereumService) {
  await ethereumService.sendTransaction(CONTRACT_CONTENT, user, VOTE_ITEM, [
    user,
    questionId,
    answerId,
    0,
    false,
  ]);
}

export async function markAsAcceptedSuiReply(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
  answerId: string,
) {
  return handleMoveCall(wallet, postLib, CHANGE_BEST_REPLY_ACTION_NAME, [
    USER_RATING_COLLECTION_ID,
    PERIOD_REWARD_CONTAINER_ID,
    userSuiId,
    postId,
    answerId,
    answerId,
  ]);
}
