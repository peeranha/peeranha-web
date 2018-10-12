import { DISPLAY_NAME_FIELD } from 'containers/Profile/constants';

import { saveText, getText, saveFile } from './ipfs';
import { getTableRow, sendTransaction } from './eosio';

import {
  ACCOUNT_TABLE,
  ALL_ACCOUNTS_SCOPE,
  SET_IPFS_METHOD,
  SET_DISPLAY_NAME_METHOD,
  IPFS_URL,
} from './constants';

export async function uploadFile(file) {
  const savedFile = await saveFile(file);
  return savedFile;
}

export async function getFileIpfs(fileHash) {
  const fileUrl = `${IPFS_URL}/${fileHash}`;
  return fileUrl;
}

export async function getBlob(canvas) {
  const res = await fetch(canvas);
  const blob = await res.blob();
  return blob;
}

export async function getProfileInfo(profileHash) {
  const eos = await getTableRow(ACCOUNT_TABLE, ALL_ACCOUNTS_SCOPE, profileHash);
  const ipfs = await getText(eos.ipfs_profile);
  const ipfsParsed = JSON.parse(ipfs);
  const savedProfileImg = ipfsParsed.savedProfileImg
    ? await getFileIpfs(ipfsParsed.savedProfileImg)
    : '';

  return {
    eos,
    ipfs: ipfsParsed,
    savedProfileImg,
  };
}

export async function saveProfile(owner, profile) {
  const ipfsProfile = await saveText(JSON.stringify(profile));

  await Promise.all([
    sendTransaction(owner, SET_IPFS_METHOD, {
      owner,
      ipfs_profile: ipfsProfile,
    }),
    sendTransaction(owner, SET_DISPLAY_NAME_METHOD, {
      owner,
      display_name: profile[DISPLAY_NAME_FIELD] || '',
    }),
  ]);
}

// TODO: to move url to .env file later
export async function getCitiesList(city) {
  const cities = await fetch(
    `http://api.geonames.org/searchJSON?q=${city}&maxRows=5&username=romrem`,
  );
  const citiesText = await cities.text();
  const citiesParsed = await JSON.parse(citiesText);
  return citiesParsed.geonames;
}
