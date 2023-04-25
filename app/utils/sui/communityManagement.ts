import { getVector8FromIpfsHash, saveText } from 'utils/ipfs';
import {
  communityLib,
  createCommunity,
  createTag,
  handleMoveCall,
  updateCommunity,
  updateTag,
  followCommunityLib,
  followCommunity,
  unfollowCommunity,
  USER_RATING_COLLECTION_ID,
  USER_ROLES_COLLECTION_ID,
} from 'utils/sui/sui';
import { WalletContextState } from '@suiet/wallet-kit';
import { getSuiUserObject } from 'utils/sui/accountManagement';

export const createSuiCommunity = async (wallet: WalletContextState, community) => {
  const communityIpfsHash = await saveText(JSON.stringify(community));
  const communityTransactionData = getVector8FromIpfsHash(communityIpfsHash);
  const userObj = await getSuiUserObject(wallet.address);

  const tagsStringData = await Promise.all(
    community.tags.map(async (tag) => await saveText(JSON.stringify(tag))),
  );

  const tagsTransactionData = tagsStringData.map((tag) => getVector8FromIpfsHash(tag));

  return handleMoveCall(wallet, communityLib, createCommunity, [
    userObj.id.id,
    USER_ROLES_COLLECTION_ID,
    communityTransactionData,
    tagsTransactionData,
  ]);
};

export const updateSuiCommunity = async (wallet: WalletContextState, communityId, community) => {
  const communityIpfsHash = await saveText(JSON.stringify(community));
  const communityTransactionData = getVector8FromIpfsHash(communityIpfsHash);
  const userObj = await getSuiUserObject(wallet.address);

  return handleMoveCall(wallet, communityLib, updateCommunity, [
    userObj.id.id,
    USER_ROLES_COLLECTION_ID,
    communityId,
    communityTransactionData,
  ]);
};

export const createSuiTag = async (wallet: WalletContextState, communityId, tag) => {
  const tagIpfsHash = await saveText(JSON.stringify(tag));
  const tagTransactionData = getVector8FromIpfsHash(tagIpfsHash);
  const userObj = await getSuiUserObject(wallet.address);

  return handleMoveCall(wallet, communityLib, createTag, [
    userObj.id.id,
    USER_ROLES_COLLECTION_ID,
    communityId,
    tagTransactionData,
  ]);
};

export const updateSuiTag = async (wallet: WalletContextState, communityId, tagId, tag) => {
  const tagIpfsHash = await saveText(JSON.stringify(tag));
  const tagTransactionData = getVector8FromIpfsHash(tagIpfsHash);
  const userObj = await getSuiUserObject(wallet.address);

  return handleMoveCall(wallet, communityLib, updateTag, [
    userObj.id.id,
    USER_ROLES_COLLECTION_ID,
    communityId,
    tagId,
    tagTransactionData,
  ]);
};
export const followSuiCommunity = async (
  wallet: WalletContextState,
  userId: any,
  suiCommunityId: any,
  isFollow: boolean,
) =>
  handleMoveCall(wallet, followCommunityLib, isFollow ? unfollowCommunity : followCommunity, [
    USER_RATING_COLLECTION_ID,
    userId,
    suiCommunityId,
  ]);