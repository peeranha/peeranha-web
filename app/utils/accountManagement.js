import { saveText } from './ipfs';

import {
  REGISTER_ACC,
  ACCOUNT_TABLE,
  ALL_ACCOUNTS_SCOPE,
  NO_AVATAR,
} from './constants';

export async function registerAccount(profile, eosService) {
  const profileText = JSON.stringify(profile);
  const ipfsHash = await saveText(profileText);

  await eosService.sendTransaction(profile.accountName, REGISTER_ACC, {
    user: profile.accountName,
    display_name: profile.displayName,
    ipfs_profile: ipfsHash,
    ipfs_avatar: NO_AVATAR,
  });

  // TODO: add here wait for transaction to be added to a block

  return true;
}

export async function isUserInSystem(user, eosService) {
  const profile = await eosService.getTableRow(
    ACCOUNT_TABLE,
    ALL_ACCOUNTS_SCOPE,
    user,
  );

  return Boolean(profile);
}
