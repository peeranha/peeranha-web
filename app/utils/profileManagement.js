import { DISPLAY_NAME_FIELD } from 'containers/Profile/constants';

import { saveText, getText, getImage } from './ipfs';
import { getTableRow, sendTransaction } from './eosio';

export async function uploadImageFile(image) {
  const savedText = await saveText(image);
  return savedText;
}

export async function getImageFile(imageHash) {
  const image = await getImage(imageHash);
  return image;
}

export async function getBlob(canvas) {
  const res = await fetch(canvas);
  const blob = await res.blob();
  return blob;
}

export async function getProfileInfo(profileHash) {
  const eos = await getTableRow('account', 'allaccounts', profileHash);
  const ipfs = await getText(eos.ipfs_profile);
  const ipfsParsed = JSON.parse(ipfs);
  const savedProfileImg = ipfsParsed.savedProfileImg
    ? await getImageFile(ipfsParsed.savedProfileImg)
    : '';

  return {
    eos,
    ipfs: ipfsParsed,
    savedProfileImg,
  };
}

export async function saveProfile(owner, profile) {
  const ipfsProfile = await saveText(JSON.stringify(profile));

  const setipfspro = new Promise(async res => {
    await sendTransaction(owner, 'setipfspro', {
      owner,
      ipfs_profile: ipfsProfile,
    });
    res();
  });

  const setdispname = new Promise(async res => {
    await sendTransaction(owner, 'setdispname', {
      owner,
      display_name: profile[DISPLAY_NAME_FIELD],
    });
    res();
  });

  return Promise.all([setipfspro, setdispname]);
}

export async function getCitiesList(city) {
  const cities = await fetch(
    `http://api.geonames.org/searchJSON?q=${city}&maxRows=5&username=romrem`,
  );
  const citiesText = await cities.text();
  const citiesParsed = await JSON.parse(citiesText);
  return citiesParsed.geonames;
}
