import userBodyAvatar from 'images/user2.svg?inline';
import noAvatar from 'images/noAvatar.png';
import editUserNoAvatar from 'images/editUserNoAvatar.png';

import { getBytes32FromIpfsHash, getFileUrl, getText, saveFile, saveText } from './ipfs';

import { INIT_RATING, NO_AVATAR } from './constants';
import { callService, NOTIFICATIONS_INFO_SERVICE } from './web_integration/src/util/aws-connector';
import { CONTRACT_USER, GET_USER_RATING, UPDATE_ACC } from './ethConstants';
import { getUser, getUserPermissions, getUserStats } from './theGraph';
import { isUserExists } from './accountManagement';

export const getRatingByCommunity = (
  user: { ratings: any[] },
  communityId: { toString: () => any },
) =>
  user?.ratings?.find((ratingObj) => ratingObj.communityId.toString() === communityId?.toString())
    ?.rating ?? 0;

export function getUserAvatar(avatarHash: any, userId: any, account: any) {
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

/* eslint camelcase: 0 */
export async function getProfileInfo(
  user,
  ethereumService,
  getExtendedProfile,
  isLogin,
  communityIdForRating,
) {
  if (!user) return null;
  let profileInfo;
  let userStats;

  if (isLogin) {
    const isUserRegistered = await isUserExists(user, ethereumService);
    if (!isUserRegistered) {
      return;
    }
    profileInfo = await ethereumService.getProfile(user);
    profileInfo.permissions = await getUserPermissions(user);
    userStats = await getUserStats(user);
    profileInfo.ratings = userStats?.ratings ?? [];
    if (!profileInfo.creationTime) {
      const profile = await getUser(user);
      profileInfo.creationTime = profile.creationTime;
    }
  } else {
    profileInfo = await getUser(user);
  }

  if (communityIdForRating) {
    const newRating =
      (await ethereumService.getUserDataWithArgs(GET_USER_RATING, [user, communityIdForRating])) ||
      INIT_RATING;

    const foundRating = profileInfo.ratings.find(
      (ratingData) => ratingData.communityId === communityIdForRating,
    );
    if (!foundRating) {
      // avoiding "Cannot assign to read only property" error
      profileInfo.ratings = profileInfo.ratings.concat({
        communityId: communityIdForRating,
        rating: newRating,
      });
    } else {
      // avoiding "Cannot assign to read only property" error
      profileInfo.ratings = profileInfo.ratings.map((ratingData) => ({
        communityId: ratingData.communityId,
        rating: ratingData.communityId === communityIdForRating ? ratingData.rating : newRating,
      }));
    }
  }

  profileInfo.highestRating = profileInfo.ratings?.length
    ? profileInfo.ratings?.reduce((max, current) => (max.rating > current.rating ? max : current))
    : 0;
  profileInfo.user = user;

  let profile;
  if (isLogin) {
    profile = JSON.parse(await getText(profileInfo.ipfsHash));
    profileInfo.displayName = profile.displayName;
    profileInfo.avatar = profile.avatar;
    profileInfo.achievements = userStats?.achievements ?? [];
  } else {
    profile = profileInfo;
  }

  profileInfo.profile = {
    about: profile.about,
    company: profile.company,
    location: profile.location,
    position: profile.position,
  };
  profileInfo.id = user;
  profileInfo.postCount = profileInfo.postCount ?? userStats?.postCount ?? 0;
  profileInfo.answersGiven = profileInfo.replyCount ?? userStats?.replyCount ?? 0;
  return profileInfo;
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
