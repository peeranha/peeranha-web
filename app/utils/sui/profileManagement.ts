import {
  createUser,
  handleMoveCall,
  updateUser,
  USER_RATING_COLLECTION,
  userLib,
  userObject,
} from 'utils/sui/sui';
import { WalletContextState } from '@suiet/wallet-kit';
import { getIpfsHashFromBytes32, getText, getVector8FromIpfsHash, saveText } from 'utils/ipfs';
import { getSuiUserObject } from 'utils/sui/accountManagement';
export const getRatingByCommunity = (
  user: { ratings: any[] },
  communityId: { toString: () => any },
) =>
  user?.ratings?.find((ratingObj) => ratingObj.communityId.toString() === communityId?.toString())
    ?.rating ?? 0;

export const byteArrayToHexString = (byteArray: any[]) => {
  const uint8Array = new Uint8Array(byteArray);
  return new TextDecoder('utf-8').decode(uint8Array).slice(2, -1);
};

/* eslint camelcase: 0 */
export async function getSuiProfileInfo(wallet: WalletContextState) {
  if (!wallet.connected) return null;
  const profileObject = await getSuiUserObject(wallet);
  const ipfsHash = getIpfsHashFromBytes32(
    `0x${byteArrayToHexString(profileObject.ipfsDoc.fields.hash)}`,
  );
  const profile = JSON.parse(await getText(ipfsHash));
  return {
    id: profileObject.id.id,
    user: wallet.account?.address,
    displayName: profile.displayName,
    avatar: profile.avatar,
    achievements: [],
    permissions: [],
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
  const suiUserObject = await getSuiUserObject(wallet);
  if (!suiUserObject) {
    return handleMoveCall(wallet, userLib, createUser, [USER_RATING_COLLECTION, transactionData]);
  }
  return handleMoveCall(wallet, userLib, updateUser, [
    USER_RATING_COLLECTION,
    suiUserObject.id.id,
    transactionData,
  ]);
}

export const getSuiNotificationsInfo = async () =>
  // const response = await callService(NOTIFICATIONS_INFO_SERVICE, { user }, true);
  ({ all: 0, unread: 0 });

export const getSuiAvailableBalance = () => 0;
