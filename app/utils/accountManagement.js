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
import { REGISTER_ACC } from './ethConstants';

export const updateAcc = async (profile, ethereumService) => {
  if (!profile) throw new ApplicationError('No profile');

  const currentTime = dateNowInSeconds();
  // const currentPeriod = Math.floor(
  //   (currentTime - profile.registration_time) /
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

export const registerAccount = async (
  profile,
  ethereumService,
  avatar = NO_AVATAR,
) => {
  const ipfsHash = await saveText(JSON.stringify(profile));

  try {
    await ethereumService.sendTransaction(
      profile.userAddress,
      REGISTER_ACC,
      ipfsHash,
    );
    return true;
  } catch (e) {
    return false;
  }
};

export const isUserInSystem = async (user, eosService) => {
  const profile = await eosService.getTableRow(
    ACCOUNT_TABLE,
    ALL_ACCOUNTS_SCOPE,
    user,
  );

  return Boolean(profile);
};

export const inviteUser = async (accountName, referralCode, eosService) => {
  await eosService.sendTransaction(
    accountName,
    INVITE_USER,
    {
      inviter: referralCode,
      invited_user: accountName,
    },
    process.env.EOS_TOKEN_CONTRACT_ACCOUNT,
    false,
  );
};

export const checkUserURL = user => {
  const path = document.location.pathname.split('/');
  const userInURL = path[1] === 'users' ? path[2] : undefined;
  return userInURL ? userInURL === user : true;
};
