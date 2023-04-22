import { getOwnedObject, userLib, userObject } from 'utils/sui/sui';
import { WalletContextState } from '@suiet/wallet-kit';
import { getIpfsHashFromBytes32, getText } from 'utils/ipfs';
import { getUserAvatar } from 'utils/profileManagement';

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
  const profileObjects = (
    await getOwnedObject(userLib, userObject, wallet.account?.address)
  )?.data.sort((first, second) => Number(second?.data?.version) - Number(first?.data?.version));
  const profileObject = profileObjects ? profileObjects[0].data?.content?.fields : null;
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

export async function saveProfile() {
  // const ipfsHash = await saveText(JSON.stringify(profile));
  // const transactionData = getBytes32FromIpfsHash(ipfsHash);
  // await ethereumService.sendTransaction(CONTRACT_USER, user, UPDATE_ACC, [user, transactionData]);
}

export const getNotificationsInfo = async () => {
  // const response = await callService(NOTIFICATIONS_INFO_SERVICE, { user }, true);
  // return response.OK ? response.body : { all: 0, unread: 0 };
};

export const getAvailableBalance = () => {
  // const stakedInCurrentPeriod = profile?.stakedInCurrentPeriod ?? 0;
  // const stakedInNextPeriod = profile?.stakedInNextPeriod ?? 0;
  // const balance = profile?.balance ?? 0;
  // return stakedInCurrentPeriod >= stakedInNextPeriod
  //   ? balance - stakedInCurrentPeriod
  //   : balance - stakedInNextPeriod;
};
