import { saveText } from './ipfs';

import {
  ACCOUNT_TABLE,
  ALL_ACCOUNTS_SCOPE,
  NO_AVATAR,
  UPDATE_ACC,
  INVITE_USER,
  KEY_LAST_RATING_UPDATE_TIME,
} from './constants';

import { ApplicationError } from './errors';
import { dateNowInSeconds } from './datetime';
import { IS_USER_EXISTS } from './ethConstants';

export const emptyProfile = account => ({
  achievements: [],
  answersGiven: 0,
  avatar: undefined,
  balance: 0,
  boost: null,
  creationTime: 0,
  displayName: `${account.substring(0, 6)}...${account.substring(
    account.length - 4,
  )}`,
  followedCommunities: [],
  highestRating: 0,
  id: account,
  loginData: { loginWithMetaMask: true },
  permissions: [],
  postCount: 0,
  profile: {},
  rating: undefined,
  ratings: [],
  stakedInCurrentPeriod: null,
  stakedInNextPeriod: null,
  user: account,
});

export const isUserExists = async (userAddress, ethereumService) => {
  return await ethereumService.getUserDataWithArgs(IS_USER_EXISTS, [
    userAddress,
  ]);
};

export const updateAcc = async (profile, ethereumService) => {
  if (!profile) throw new ApplicationError('No profile');

  const currentTime = dateNowInSeconds();
  // const currentPeriod = Math.floor(
  //   (currentTime - profile.creationTime) /
  //     process.env.ACCOUNT_STAT_RESET_PERIOD,
  // );

  // const periodsHavePassed = currentPeriod - profile.last_update_period;
  // const integerProperties = profile?.integer_properties ?? [];
  // const lastUpdateTime = integerProperties.find(
  //   prop => prop.key === KEY_LAST_RATING_UPDATE_TIME,
  // )?.value;
  // const timeSinceRatingUpdate = currentTime - lastUpdateTime;

  // if (
  //   periodsHavePassed > 0 ||
  //   timeSinceRatingUpdate >= process.env.ACCOUNT_STAT_RESET_PERIOD
  // ) {
  //   await eosService.sendTransaction(profile.user, UPDATE_ACC, {
  //     user: profile.user,
  //   });
  // } else {
  //   // throw new ApplicationError('Period is not finished');
  // }
};

export const isUserInSystem = async (user, eosService) => {
  const profile = await eosService.getTableRow(
    ACCOUNT_TABLE,
    ALL_ACCOUNTS_SCOPE,
    user,
  );

  return Boolean(profile);
};

export const inviteUser = async (accountName, referralCode, eosService) => {};

export const checkUserURL = user => {
  const path = document.location.pathname.split('/');
  const userInURL = path[1] === 'users' ? path[2] : undefined;
  return userInURL ? userInURL === user : true;
};
