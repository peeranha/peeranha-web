import { DISPLAY_NAME_FIELD } from 'containers/Profile/constants';
import { saveText, getText, saveFile, getFileUrl } from './ipfs';

import {
  ACCOUNT_TABLE,
  ALL_ACCOUNTS_SCOPE,
  SET_IPFS_METHOD,
  SET_DISPLAY_NAME_METHOD,
} from './constants';

export async function uploadImg(img) {
  const imgHash = await saveFile(img);
  const imgUrl = await getFileUrl(imgHash);
  return { imgUrl, imgHash };
}

export async function getBlob(canvas) {
  const res = await fetch(canvas);
  const blob = await res.blob();
  return blob;
}

/* eslint camelcase: 0 */
export async function getProfileInfo(user, eosService) {
  if (!user) return null;

  const profile = await eosService.getTableRow(
    ACCOUNT_TABLE,
    ALL_ACCOUNTS_SCOPE,
    user,
  );

  const ipfsProfile = await getText(profile.ipfs_profile);
  const parsedIpfsProfile = JSON.parse(ipfsProfile);

  const ipfs_avatar = parsedIpfsProfile.ipfs_avatar
    ? await getFileUrl(parsedIpfsProfile.ipfs_avatar)
    : '';

  profile.profile = parsedIpfsProfile;
  profile.ipfs_avatar = ipfs_avatar;

  return profile;
}

export async function saveProfile(owner, profile, eosService) {
  const ipfsProfile = await saveText(JSON.stringify(profile));

  await eosService.sendTransaction(owner, SET_IPFS_METHOD, {
    owner,
    ipfs_profile: ipfsProfile,
  });

  await eosService.sendTransaction(owner, SET_DISPLAY_NAME_METHOD, {
    owner,
    display_name: profile[DISPLAY_NAME_FIELD] || '',
  });
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
