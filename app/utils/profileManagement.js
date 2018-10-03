import { saveText, getText, getImage } from './ipfs';
import { getTableRow } from './eosio';

export async function uploadImageFile(image) {
  const savedText = await saveText(image);
  return savedText;
}

export async function getImageFile(imageHash) {
  const image = await getImage(imageHash);
  return image;
}

export async function getProfileInformation(profileHash) {
  const eos = await getTableRow('account', 'allaccounts', profileHash);
  const ipfs = await getText(eos.ipfs_profile);
  return {
    eos,
    ipfs: JSON.parse(ipfs),
  };
}
