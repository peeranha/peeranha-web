import { sendTransaction } from './eosio';
import { saveText } from './ipfs';

export async function registerAccount(accountName, displayName, profile) {
  const profileText = JSON.stringify(profile);
  const ipfsHash = await saveText(profileText);

  await sendTransaction(accountName, 'registeracc', {
    owner: accountName,
    display_name: displayName,
    ipfs_profile: ipfsHash,
  });

  // TODO: add here wait for transaction to be added to a block

  return true;
}

export async function getCurrentAccount() {
  const account = {
    eosAccount: 'user1',
  };

  return account;
}
