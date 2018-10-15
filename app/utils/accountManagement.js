import { saveText } from './ipfs';

export async function registerAccount(
  accountName,
  displayName,
  profile,
  eosService,
) {
  const profileText = JSON.stringify(profile);
  const ipfsHash = await saveText(profileText);

  await eosService.sendTransaction(accountName, 'registeracc', {
    owner: accountName,
    display_name: displayName,
    ipfs_profile: ipfsHash,
  });

  // TODO: add here wait for transaction to be added to a block

  return true;
}
