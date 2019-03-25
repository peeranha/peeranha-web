import { DISPLAY_NAME_FIELD } from 'containers/Profile/constants';
import { saveText, getText, saveFile, getFileUrl } from './ipfs';

import {
  ACCOUNT_TABLE,
  ALL_ACCOUNTS_SCOPE,
  SAVE_PROFILE_METHOD,
} from './constants';

export async function uploadImg(img) {
  const imgHash = await saveFile(img);
  const imgUrl = await getFileUrl(imgHash);
  return { imgUrl, imgHash };
}

/* eslint camelcase: 0 */
export async function getProfileInfo(user, eosService) {
  if (!user) return null;

  const profile = await eosService.getTableRow(
    ACCOUNT_TABLE,
    ALL_ACCOUNTS_SCOPE,
    user,
  );

  if (!profile) return null;

  const ipfsProfile = await getText(profile.ipfs_profile);
  const parsedIpfsProfile = JSON.parse(ipfsProfile);

  const ipfs_avatar = parsedIpfsProfile.ipfs_avatar
    ? await getFileUrl(parsedIpfsProfile.ipfs_avatar)
    : '';

  profile.profile = parsedIpfsProfile;
  profile.ipfs_avatar = ipfs_avatar;

  return profile;
}

export async function saveProfile(user, profile, eosService) {
  const ipfsProfile = await saveText(JSON.stringify(profile));

  await eosService.sendTransaction(user, SAVE_PROFILE_METHOD, {
    user,
    ipfs_profile: ipfsProfile,
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
