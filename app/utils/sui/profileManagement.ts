import { createUser, handleMoveCall, updateUser, userLib, userObject } from 'utils/sui/sui';
import { WalletContextState } from '@suiet/wallet-kit';
import { getIpfsHashFromBytes32, getText, getVector8FromIpfsHash, saveText } from 'utils/ipfs';
import { getSuiUserObject } from 'utils/sui/accountManagement';
import { getSuiCommunities } from './suiIndexer';
import { getUserPermissions } from 'utils/theGraph';

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
  const userId = profileObject.id.id;

  const ipfsHash = getIpfsHashFromBytes32(byteArrayToHexString(profileObject.ipfsDoc.fields.hash));
  const profile = JSON.parse(await getText(ipfsHash));
  const communities = await getSuiCommunities();
  const followedCommunities = communities.filter((community: any) =>
    profileObject.followedCommunities.find(
      (followCommunity: any) => followCommunity === community.suiId,
    ),
  );
  const profileInfo = {
    id: userId,
    user: userId,
    address,
    displayName: profile.displayName,
    avatar: profile.avatar,
    achievements: [],
    permissions: [],
    followedCommunities: followedCommunities.map((community: any) => community.id),
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
  profileInfo.permissions = await getUserPermissions(userId);
  return profileInfo;
}

export async function saveSuiProfile(wallet: WalletContextState, profile: object) {
  const ipfsHash = await saveText(JSON.stringify(profile));
  const transactionData = getVector8FromIpfsHash(ipfsHash);
  const suiUserObject = await getSuiUserObject(wallet.address);
  if (!suiUserObject) {
    return handleMoveCall(
      wallet,
      userLib,
      createUser,
      [process.env.USER_RATING_COLLECTION_ID, transactionData],
      false,
    );
  }
  return handleMoveCall(
    wallet,
    userLib,
    updateUser,
    [process.env.USER_RATING_COLLECTION_ID, suiUserObject.id.id, transactionData],
    false,
  );
}

export async function createSuiProfile(wallet: WalletContextState) {
  const ipfsHash = await saveText(
    JSON.stringify({
      about: '',
      avatar: '',
      company: '',
      displayName: `${wallet.address.substring(0, 6)}...${wallet.address.substring(
        wallet.address.length - 4,
      )}`,
      location: '',
      position: '',
    }),
  );
  const transactionData = getVector8FromIpfsHash(ipfsHash);
  return handleMoveCall(wallet, userLib, createUser, [
    process.env.USER_RATING_COLLECTION_ID,
    transactionData,
  ]);
}

export const getSuiNotificationsInfo = async () =>
  // const response = await callService(NOTIFICATIONS_INFO_SERVICE, { user }, true);
  ({ all: 0, unread: 0 });

export const getSuiAvailableBalance = () => 0;
