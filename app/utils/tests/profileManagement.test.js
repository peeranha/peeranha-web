import { saveFile, getFileUrl, getText, saveText } from '../ipfs';

import {
  uploadImg,
  getProfileInfo,
  saveProfile,
  UsersFetcher,
  AccountsSortedBy,
} from '../profileManagement';

import { ACCOUNT_TABLE, ALL_ACCOUNTS_SCOPE } from '../constants';

jest.mock('../ipfs', () => ({
  saveFile: jest.fn().mockImplementation(() => {}),
  getFileUrl: jest.fn().mockImplementation(() => {}),
  getText: jest.fn().mockImplementation(() => {}),
  saveText: jest.fn().mockImplementation(() => {}),
}));

jest.setTimeout(10000);

const cmp = {
  sendTransaction: jest.fn(),
  getTableRow: jest.fn(),
  getTableRows: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Fetcher', () => {
  const firstFetchCount = 10;
  const fetchCount = 10;
  const sortType = AccountsSortedBy.rating;

  const fetcherEx = new UsersFetcher(
    firstFetchCount,
    fetchCount,
    sortType,
    cmp,
  );

  it('constructor', () => {
    fetcherEx.constructor(firstFetchCount, fetchCount, sortType, cmp);

    expect(fetcherEx.sortType).toBe(sortType);
    expect(fetcherEx.firstFetchCount).toBe(firstFetchCount);
    expect(fetcherEx.fetchCount).toBe(fetchCount);
    expect(fetcherEx.itemArray).toEqual([]);
    expect(fetcherEx.hasMoreToFetch).toBe(true);
    expect(fetcherEx.eosService).toEqual(cmp);
  });

  it('getNextItems', async () => {
    fetcherEx.eosService.getTableRows.mockImplementation(() => []);

    const res = await fetcherEx.getNextItems();

    expect(res).not.toBe(undefined);
  });
});

it('AccountsSortedBy', () => {
  expect(typeof AccountsSortedBy.rating).toBe('object');
  expect(typeof AccountsSortedBy.registration_time).toBe('object');
});

it('UsersFetcher', () => {
  const fetcher = new UsersFetcher();

  expect(fetcher.TABLE).toBe(ACCOUNT_TABLE);
  expect(fetcher.SCOPE).toBe(ALL_ACCOUNTS_SCOPE);
  expect(fetcher.PRIMARY_KEY).toBe('user');
});

/* eslint camelcase: 0 */
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
  const user = 'hash';
  const img = 'ipfs_avatar';
  const ipfs = JSON.stringify({ ipfs_avatar: img });
  const ipfs_avatar = 'url';

  const eos = {
    ipfs_profile: {},
    user,
  };

  cmp.getTableRow.mockImplementation(() => eos);
  getText.mockImplementation(() => ipfs);
  getFileUrl.mockImplementation(() => ipfs_avatar);

  expect(await getProfileInfo(user, cmp)).toEqual({
    ...eos,
    profile: JSON.parse(ipfs),
    ipfs_avatar,
  });

  expect(cmp.getTableRow).toHaveBeenCalledWith(
    ACCOUNT_TABLE,
    ALL_ACCOUNTS_SCOPE,
    user,
  );

  expect(getText).toHaveBeenCalledWith(eos.ipfs_profile);
  expect(getFileUrl).toHaveBeenCalledWith(img);
});

it('saveProfile', async () => {
  const user = 'user';
  const profile = {};
  const ipfsProfile = 'ipfsProfile';

  saveText.mockImplementation(() => ipfsProfile);

  expect(cmp.sendTransaction).toHaveBeenCalledTimes(0);

  await saveProfile(user, profile, cmp);

  expect(saveText).toHaveBeenCalledWith(JSON.stringify(profile));
  expect(cmp.sendTransaction).toHaveBeenCalledTimes(1);
});
