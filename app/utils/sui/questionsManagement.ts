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
  moderatorEditPost,
} from 'utils/sui/sui';
import { WalletContextState } from '@suiet/wallet-kit';
import { DOWNVOTE_STATUS, UPVOTE_STATUS } from 'utils/ethConstants';

export const suiVotingStatus = (statusHistory) => ({
  isUpVoted: statusHistory === 3,
  isDownVoted: statusHistory === 1,
  isVotedToDelete: false,
});

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
  return handleMoveCall(
    wallet,
    postLib,
    createPost,
    [
      process.env.USER_RATING_COLLECTION_ID,
      process.env.USER_ROLES_COLLECTION_ID,
      CLOCK_OBJECT_ID,

      userSuiId,
      communitySuiId,
      ipfsHash,
      postType,
      tags,
      language,
    ],
    false,
  );
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
  return handleMoveCall(
    wallet,
    postLib,
    editPost,
    [
      process.env.USER_RATING_COLLECTION_ID,
      process.env.PERIOD_REWARD_CONTAINER_ID,
      process.env.USER_ROLES_COLLECTION_ID,

      userSuiId,
      postSuiId,
      postMetaData,
      communitySuiId,
      ipfsHash,
      postType,
      tags,
      language,
    ],
    false,
  );
}

export async function moderatorEditSuiQuestion(
  wallet: WalletContextState,
  userSuiId: string,
  postMetaData: string,
  communitySuiId: string,
  postType: number,
  tags: Array<object>,
  language: number,
) {
  return handleMoveCall(
    wallet,
    postLib,
    moderatorEditPost,
    [
      process.env.USER_RATING_COLLECTION_ID,
      process.env.PERIOD_REWARD_CONTAINER_ID,
      process.env.USER_ROLES_COLLECTION_ID,
      userSuiId,
      postMetaData,
      communitySuiId,
      postType,
      tags,
      language,
    ],
    false,
  );
}

export async function deleteSuiQuestion(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
) {
  return handleMoveCall(
    wallet,
    postLib,
    DELETE_POST_ACTION_NAME,
    [
      process.env.USER_RATING_COLLECTION_ID,
      process.env.PERIOD_REWARD_CONTAINER_ID,
      process.env.USER_ROLES_COLLECTION_ID,
      CLOCK_OBJECT_ID,
      userSuiId,
      postId,
    ],
    false,
  );
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
  return handleMoveCall(
    wallet,
    postLib,
    CREATE_COMMENT_ACTION_NAME,
    [
      process.env.USER_RATING_COLLECTION_ID,
      process.env.USER_ROLES_COLLECTION_ID,
      CLOCK_OBJECT_ID,
      userSuiId,
      postId,
      answerId,
      ipfsHash,
      language,
    ],
    false,
  );
}

export async function deleteSuiComment(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
  parentId: string,
  commentId: string,
) {
  return handleMoveCall(
    wallet,
    postLib,
    DELETE_COMMENT_ACTION_NAME,
    [
      process.env.USER_RATING_COLLECTION_ID,
      process.env.PERIOD_REWARD_CONTAINER_ID,
      process.env.USER_ROLES_COLLECTION_ID,
      userSuiId,
      postId,
      parentId,
      commentId,
    ],
    false,
  );
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

  return handleMoveCall(
    wallet,
    postLib,
    EDIT_COMMENT_ACTION_NAME,
    [
      process.env.USER_RATING_COLLECTION_ID,
      process.env.USER_ROLES_COLLECTION_ID,
      userSuiId,
      postId,
      comment,
      parentId,
      commentId,
      ipfsHash,
      language,
    ],
    false,
  );
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
  return handleMoveCall(
    wallet,
    postLib,
    CREATE_REPLY_ACTION_NAME,
    [
      process.env.USER_RATING_COLLECTION_ID,
      process.env.PERIOD_REWARD_CONTAINER_ID,
      process.env.USER_ROLES_COLLECTION_ID,
      CLOCK_OBJECT_ID,
      userSuiId,
      postId,
      0, // parent reply id is always 0 for now
      ipfsHash,
      isOfficial,
      language,
    ],
    false,
  );
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
  return handleMoveCall(
    wallet,
    postLib,
    AUTHOR_EDIT_REPLY_ACTION_NAME,
    [
      process.env.USER_RATING_COLLECTION_ID,
      process.env.USER_ROLES_COLLECTION_ID,
      userSuiId,
      postId,
      answerObjectId,
      answerId,
      ipfsHash,
      isOfficial,
      language,
    ],
    false,
  );
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
  return handleMoveCall(
    wallet,
    postLib,
    MODERATOR_EDIT_REPLY_ACTION_NAME,
    [
      process.env.USER_RATING_COLLECTION_ID,
      process.env.USER_ROLES_COLLECTION_ID,
      userSuiId,
      postId,
      answerId,
      isOfficial,
      language,
    ],
    false,
  );
}

export async function deleteSuiAnswer(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
  answerId: string,
) {
  return handleMoveCall(
    wallet,
    postLib,
    DELETE_ANSWER_ACTION_NAME,
    [
      process.env.USER_RATING_COLLECTION_ID,
      process.env.PERIOD_REWARD_CONTAINER_ID,
      process.env.USER_ROLES_COLLECTION_ID,
      userSuiId,
      postId,
      answerId,
      CLOCK_OBJECT_ID,
    ],
    false,
  );
}

export async function voteSuiPost(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
  isUpvote: boolean,
) {
  return handleMoveCall(
    wallet,
    postLib,
    votePost,
    [
      process.env.USER_RATING_COLLECTION_ID,
      process.env.PERIOD_REWARD_CONTAINER_ID,
      process.env.USER_ROLES_COLLECTION_ID,
      userSuiId,
      postId,
      isUpvote,
    ],
    false,
  );
}

export async function voteSuiReply(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
  replyId: number,
  isUpvote: boolean,
) {
  return handleMoveCall(
    wallet,
    postLib,
    voteReply,
    [
      process.env.USER_RATING_COLLECTION_ID,
      process.env.PERIOD_REWARD_CONTAINER_ID,
      process.env.USER_ROLES_COLLECTION_ID,
      userSuiId,
      postId,
      replyId,
      isUpvote,
    ],
    false,
  );
}

export async function markAsAcceptedSuiReply(
  wallet: WalletContextState,
  userSuiId: string,
  postId: string,
  answerId: string,
) {
  return handleMoveCall(
    wallet,
    postLib,
    CHANGE_BEST_REPLY_ACTION_NAME,
    [
      process.env.USER_RATING_COLLECTION_ID,
      process.env.PERIOD_REWARD_CONTAINER_ID,
      process.env.USER_ROLES_COLLECTION_ID,
      userSuiId,
      postId,
      answerId,
    ],
    false,
  );
}
