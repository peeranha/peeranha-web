import userBodyAvatar from 'images/user2.svg?inline';
import noAvatar from 'images/noAvatar.png';
import editUserNoAvatar from 'images/editUserNoAvatar.png';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { getCookie } from 'utils/cookie';
import { NETWORK_ID } from 'utils/ethereum/ethereum';

import { getBytes32FromIpfsHash, getFileUrl, getText, saveFile, saveText } from './ipfs';

import { INIT_RATING, NO_AVATAR } from './constants';
import { callService, NOTIFICATIONS_INFO_SERVICE } from './web_integration/src/util/aws-connector';
import { CONTRACT_USER, GET_USER_RATING, UPDATE_ACC } from './queries/constants';

import { getUser, getUserPermissions, getUserStats } from './queries/ethereumService';
import { isUserExists } from './accountManagement';

export const getRatingByCommunity = (user, communityId) =>
  user?.ratings?.find((ratingObj) => ratingObj.communityId?.toString() === communityId?.toString())
    ?.rating ?? 0;

export function getUserAvatar(avatarHash, userId, account) {
  if (avatarHash && avatarHash !== NO_AVATAR) {
    return getFileUrl(avatarHash);
  }

  if (userId && userId === account) {
    return editUserNoAvatar;
  }

  if (userId) {
    return noAvatar;
  }

  return userBodyAvatar;
}

export async function uploadImg(img) {
  const data = img.replace(/^data:image\/\w+;base64,/, '');
  const buf = Buffer.from(data, 'base64');

  const imgHash = await saveFile(buf);
  const imgUrl = await getFileUrl(imgHash);

  return { imgUrl, imgHash };
}

/* eslint camelcase: 0 */
export async function getProfileInfo(user, isProfilePage = false) {
  if (!user) return null;
  const profileInfo = await getUser(user, isProfilePage);
  let userStats;

  profileInfo.highestRating = profileInfo.ratings?.length
    ? profileInfo.ratings?.reduce((max, current) => (max.rating > current.rating ? max : current))
    : 0;
  profileInfo.user = user;

  profileInfo.profile = {
    about: profileInfo.about,
    company: profileInfo.company,
    location: profileInfo.location,
    position: profileInfo.position,
  };

  profileInfo.id = user;
  profileInfo.postCount = profileInfo.postCount ?? userStats?.postCount ?? 0;
  profileInfo.answersGiven = profileInfo.replyCount ?? userStats?.replyCount ?? 0;
  return profileInfo;
}

export async function saveProfile(ethereumService, user, profile) {
  const singleCommId = isSingleCommunityWebsite();
  const network = singleCommId?.split('-')[0] - 1 || getCookie(NETWORK_ID) || 0;
  const ipfsHash = await saveText(JSON.stringify(profile));
  const transactionData = getBytes32FromIpfsHash(ipfsHash);
  return ethereumService.sendTransaction(network, CONTRACT_USER[network], user, UPDATE_ACC, [
    user,
    transactionData,
  ]);
}

export const getNotificationsInfo = async (user) => {
  const response = await callService(NOTIFICATIONS_INFO_SERVICE, { user }, true);
  return response.OK ? response.body : { all: 0, unread: 0 };
};

export const getAvailableBalance = (profile) => {
  const stakedInCurrentPeriod = profile?.stakedInCurrentPeriod ?? 0;
  const stakedInNextPeriod = profile?.stakedInNextPeriod ?? 0;
  const balance = profile?.balance ?? 0;
  return stakedInCurrentPeriod >= stakedInNextPeriod
    ? balance - stakedInCurrentPeriod
    : balance - stakedInNextPeriod;
};
