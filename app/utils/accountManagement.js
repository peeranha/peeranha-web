import { saveText } from './ipfs';

import {
  REGISTER_ACC,
  ACCOUNT_TABLE,
  ALL_ACCOUNTS_SCOPE,
  NO_AVATAR,
  UPDATE_ACC,
  INVITE_USER,
  KEY_LAST_RATING_UPDATE_TIME,
} from './constants';

import { ApplicationError } from './errors';
import { dateNowInSeconds } from './datetime';

export const updateAcc = async (profile, eosService) => {
  if (!profile) throw new ApplicationError('No profile');

  const currentTime = dateNowInSeconds();
  const currentPeriod = Math.floor(
    (currentTime - profile.registration_time) /
      process.env.ACCOUNT_STAT_RESET_PERIOD,
  );

  const periodsHavePassed = currentPeriod - profile.last_update_period;
  const integerProperties = profile?.integer_properties ?? [];
  const lastUpdateTime = integerProperties.find(
    prop => prop.key === KEY_LAST_RATING_UPDATE_TIME,
  )?.value;
  const timeSinceRatingUpdate = currentTime - lastUpdateTime;

  if (
    periodsHavePassed > 0 ||
    timeSinceRatingUpdate >= process.env.ACCOUNT_STAT_RESET_PERIOD
  ) {
    console.log('ok');
    await eosService.sendTransaction(profile.user, UPDATE_ACC, {
      user: profile.user,
    });
  } else {
    // throw new ApplicationError('Period is not finished');
  }
};

export const registerAccount = async (profile, eosService) => {
  const profileText = JSON.stringify(profile);
  const ipfsHash = await saveText(profileText);

  try {
    await eosService.sendTransaction(
      profile.accountName,
      REGISTER_ACC,
      {
        user: profile.accountName,
        display_name: profile.displayName,
        ipfs_profile: ipfsHash,
        ipfs_avatar: NO_AVATAR,
      },
      null,
      true,
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
