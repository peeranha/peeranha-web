import userBodyAvatar from 'images/user2.svg?inline';
import noAvatar from 'images/noAvatar.png';
import editUserNoAvatar from 'images/editUserNoAvatar.png';

import { getFileUrl, getText, saveFile, saveText } from './ipfs';

import {
  ACCOUNT_TABLE,
  ALL_ACCOUNTS_SCOPE,
  ALL_TG_ACCOUNTS_SCOPE,
  CONFIRM_TELEGRAM_ACCOUNT,
  INF_LIMIT,
  NO_AVATAR,
  TG_ACCOUNT_TABLE,
  UNLINK_TELEGRAM_ACCOUNT,
} from './constants';
import {
  callService,
  NOTIFICATIONS_INFO_SERVICE,
} from './web_integration/src/util/aws-connector';
import { UPDATE_ACC } from './ethConstants';
import { getUser, getUserStats } from './theGraph';
import { WebIntegrationError } from './errors';

export const getRatingByCommunity = (user, communityId) => {
  return user?.ratings?.find(ratingObj => ratingObj.communityId.toString() === communityId.toString())?.rating ?? 0;
}

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
export async function getProfileInfo(
  user,
  ethereumService,
  getExtendedProfile,
  isLogin,
) {
  if (!user) return null;
  let profileInfo;
  let userStats;

  let communities;
  if (isLogin) {
    profileInfo = await ethereumService.getProfile(user);
    userStats = await getUserStats(user);
  } else {
    profileInfo = await getUser(user);
  }

  profileInfo.highestRating = profileInfo.ratings?.length ? profileInfo.ratings?.reduce(
    (max, current) => (max.rating > current.rating ? max : current),
  ) : 0;
  profileInfo.user = user;

  if (getExtendedProfile) {
    let profile;
    if (isLogin) {
      profile = JSON.parse(await getText(profileInfo.ipfsHash));
      profileInfo.displayName = profile.displayName;
      profileInfo.avatar = profile.avatar;
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
    profileInfo.answersGiven =
      profileInfo.replyCount ?? userStats?.replyCount ?? 0;
    profileInfo.achievementsReached = profileInfo.achievementsReached ?? [];
  }

  return profileInfo;
}

export async function saveProfile(ethereumService, user, profile) {
  const ipfsHash = await saveText(JSON.stringify(profile));
  const transactionData = ethereumService.getBytes32FromIpfsHash(ipfsHash);
  await ethereumService.sendTransactionWithSigner(user, UPDATE_ACC, [
    transactionData,
  ]);
}

export async function getUserRatings(ethereumService, user, communities) {
  if (!communities || !user) {
    return [];
  }

  const ratings = new Map();
  for await (const community of communities) {
    try {
      ratings.set(
        community.id.toString(),
        await ethereumService.getUserRating(user, community.id),
      );
    } catch (err) {
      new WebIntegrationError(err.message);
    }
  }
  return ratings;
}

export const getNotificationsInfo = async user => {
  const response = await callService(
    NOTIFICATIONS_INFO_SERVICE,
    { user },
    true,
  );
  return response.OK ? response.body : { all: 0, unread: 0 };
};

export async function getUserTelegramData(eosService, userName) {
  const { rows } = await eosService.getTableRows(
    TG_ACCOUNT_TABLE,
    ALL_TG_ACCOUNTS_SCOPE,
    0,
    INF_LIMIT,
  );

  const userTgData = rows.filter(item => item.user === userName);
  const telegram_id = userTgData.length > 0 ? userTgData[0].telegram_id : 0;
  const temporaryAccount = rows.filter(
    item => item.telegram_id === telegram_id && item.user !== userName,
  );
  const temporaryUser = temporaryAccount.length
    ? temporaryAccount[0].user
    : undefined;
  const profile = await eosService.getTableRow(
    ACCOUNT_TABLE,
    ALL_ACCOUNTS_SCOPE,
    temporaryUser,
  );
  const temporaryAccountDisplayName =
    profile && profile.user === temporaryUser ? profile.displayName : undefined;
  return userTgData.length > 0
    ? {
        ...userTgData[0],
        temporaryUser,
        temporaryAccountDisplayName,
      }
    : null;
}

export async function confirmTelegramAccount(eosService, user) {
  await eosService.sendTransaction(user, CONFIRM_TELEGRAM_ACCOUNT, { user });
}

export async function unlinkTelegramAccount(eosService, user) {
  await eosService.sendTransaction(user, UNLINK_TELEGRAM_ACCOUNT, { user });
}

export const getAvailableBalance = profile => {
  const stakedInCurrentPeriod = profile?.stakedInCurrentPeriod ?? 0;
  const stakedInNextPeriod = profile?.stakedInNextPeriod ?? 0;
  const balance = profile?.balance ?? 0;
  return stakedInCurrentPeriod >= stakedInNextPeriod
    ? balance - stakedInCurrentPeriod
    : balance - stakedInNextPeriod;
};
