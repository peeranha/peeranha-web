import EosioService from '../eosio';

import { saveFile, getFileUrl, getText, saveText } from '../ipfs';

import {
  uploadImg,
  getProfileInfo,
  saveProfile,
  getCitiesList,
} from '../profileManagement';

import { ACCOUNT_TABLE, ALL_ACCOUNTS_SCOPE } from '../constants';

jest.mock('../ipfs', () => ({
  saveFile: jest.fn().mockImplementation(() => {}),
  getFileUrl: jest.fn().mockImplementation(() => {}),
  getText: jest.fn().mockImplementation(() => {}),
  saveText: jest.fn().mockImplementation(() => {}),
}));

const cmp = new EosioService();
cmp.sendTransaction = jest.fn().mockImplementation(() => {});
cmp.getTableRow = jest.fn().mockImplementation(() => {});

beforeEach(() => {
  jest.clearAllMocks();
});

it('uploadImg', async () => {
  const txt = 'txt';
  const imgHash = 'ipfsHash';
  const imgUrl = 'url';

  saveFile.mockImplementationOnce(() => imgHash);
  getFileUrl.mockImplementationOnce(() => imgUrl);

  expect(await uploadImg(txt)).toEqual({ imgHash, imgUrl });
  expect(saveFile).toHaveBeenCalledWith(txt);
  expect(getFileUrl).toHaveBeenCalledWith(imgHash);
});

it('getProfileInfo', async () => {
  const profileHash = 'hash';
  const img = 'savedProfileImg';
  const ipfs = JSON.stringify({ savedProfileImg: img });
  const savedProfileImg = 'url';
  const eos = {
    ipfs_profile: {},
  };

  cmp.getTableRow.mockImplementation(() => eos);
  getText.mockImplementation(() => ipfs);
  getFileUrl.mockImplementation(() => savedProfileImg);

  expect(await getProfileInfo(profileHash, cmp)).toEqual({
    eos,
    ipfs: JSON.parse(ipfs),
    savedProfileImg,
  });
  expect(cmp.getTableRow).toHaveBeenCalledWith(
    ACCOUNT_TABLE,
    ALL_ACCOUNTS_SCOPE,
    profileHash,
  );
  expect(getText).toHaveBeenCalledWith(eos.ipfs_profile);
  expect(getFileUrl).toHaveBeenCalledWith(img);
});

it('saveProfile', async () => {
  const owner = 'user';
  const profile = {};
  const ipfsProfile = 'ipfsProfile';

  saveText.mockImplementation(() => ipfsProfile);

  expect(cmp.sendTransaction).toHaveBeenCalledTimes(0);

  await saveProfile(owner, profile, cmp);

  expect(saveText).toHaveBeenCalledWith(JSON.stringify(profile));
  expect(cmp.sendTransaction).toHaveBeenCalledTimes(2);
});

it('getCitiesList', async () => {
  const city = 'Chicago';
  const citiesList = await getCitiesList(city);

  expect(!!citiesList[0]).toBe(true);
  expect(citiesList[0].name).toBe(city);
  expect(citiesList.length).toBe(5);
});
