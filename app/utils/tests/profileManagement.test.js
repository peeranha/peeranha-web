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

describe('getProfileInfo', async () => {
  const user = 'user';

  const eosProfile = {
    user,
    ipfs_profile: '1111',
    ipfs_avatar: '1111',
  };

  const eosService = {
    getTableRow: jest.fn(),
  };

  it('!!user is falsy', async () => {
    expect(await getProfileInfo(null)).toBe(null);
  });

  it('eosProfile is falsy', async () => {
    eosService.getTableRow.mockImplementationOnce(() => null);
    expect(await getProfileInfo(user, eosService, false)).toBe(null);
  });

  describe('eosProfile is truthy', () => {
    it('getExtendedProfile is falsy', async () => {
      eosService.getTableRow.mockImplementationOnce(() => eosProfile);
      const getExtendedProfile = false;

      expect(
        await getProfileInfo(user, eosService, getExtendedProfile),
      ).toEqual(eosProfile);
    });

    it('getExtendedProfile is truthy', async () => {
      const ipfsProfile = `{"username":"username"}`;
      const getExtendedProfile = true;

      const extendedProfile = {
        ...eosProfile,
        profile: JSON.parse(ipfsProfile),
      };

      eosService.getTableRow.mockImplementationOnce(() => eosProfile);
      getText.mockImplementationOnce(() => ipfsProfile);

      expect(
        await getProfileInfo(user, eosService, getExtendedProfile),
      ).toEqual(extendedProfile);
    });
  });
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
