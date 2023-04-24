import {
  createUser,
  handleMoveCall,
  updateUser,
  USER_RATING_COLLECTION_ID,
  userLib,
  userObject,
} from 'utils/sui/sui';
import { WalletContextState } from '@suiet/wallet-kit';
import { getIpfsHashFromBytes32, getText, getVector8FromIpfsHash, saveText } from 'utils/ipfs';
import { getSuiUserObject } from 'utils/sui/accountManagement';
import { getFollowCommunitySuiIds, getSuiCommunities } from './suiIndexer';

export const getRatingByCommunity = (
  user: { ratings: any[] },
  communityId: { toString: () => any },
) =>
  user?.ratings?.find((ratingObj) => ratingObj.communityId.toString() === communityId?.toString())
    ?.rating ?? 0;

export const byteArrayToHexString = (byteArray: any[]) => {
  const uint8Array = new Uint8Array(byteArray);
  return `0x${new TextDecoder('utf-8').decode(uint8Array)}`;
};
/* eslint camelcase: 0 */
export async function getSuiProfileInfo(address: string) {
  const profileObject = await getSuiUserObject(address);
  const ipfsHash = getIpfsHashFromBytes32(byteArrayToHexString(profileObject.ipfsDoc.fields.hash));
  const profile = JSON.parse(await getText(ipfsHash));
  const followedCommunityIds = await getFollowCommunitySuiIds();
  const communities = await getSuiCommunities();
  const followedCommunities = communities.filter((community) =>
    followedCommunityIds.includes(community.suiId),
  );
  return {
    id: profileObject.id.id,
    user: address,
    address,
    displayName: profile.displayName,
    avatar: profile.avatar,
    achievements: [],
    permissions: [],
    followedCommunities: followedCommunities.map((community) => community.id),
    profile: {
      about: profile.about,
      company: profile.company,
      location: profile.location,
      position: profile.position,
    },
    ratings: [],
    highestRating: 0,
    postCount: 0,
    answersGiven: 0,
  };
}

export async function saveSuiProfile(wallet: WalletContextState, profile: object) {
  const ipfsHash = await saveText(JSON.stringify(profile));
  const transactionData = getVector8FromIpfsHash(ipfsHash);
  const suiUserObject = await getSuiUserObject(wallet.address);
  if (!suiUserObject) {
    return handleMoveCall(wallet, userLib, createUser, [
      USER_RATING_COLLECTION_ID,
      transactionData,
    ]);
  }
  return handleMoveCall(wallet, userLib, updateUser, [
    USER_RATING_COLLECTION_ID,
    suiUserObject.id.id,
    transactionData,
  ]);
}

export const getSuiNotificationsInfo = async () =>
  // const response = await callService(NOTIFICATIONS_INFO_SERVICE, { user }, true);
  ({ all: 0, unread: 0 });

export const getSuiAvailableBalance = () => 0;
