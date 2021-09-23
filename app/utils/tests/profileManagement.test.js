import userBodyAvatar from 'images/user2.svg?inline';
import noAvatar from 'images/noAvatar.png';
import editUserNoAvatar from 'images/editUserNoAvatar.png';

import { saveFile, getFileUrl, getText, saveText } from '../ipfs';

import {
  uploadImg,
  getProfileInfo,
  saveProfile,
  UsersFetcher,
  AccountsSortedBy,
  getUserAvatar,
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

describe('getUserAvatar', () => {
  it('get file url', () => {
    const avatarHash = 'avatarHash';
    const userId = 'userId';
    const account = 'account';

    expect(getUserAvatar(avatarHash, userId, account)).toBe(
      getFileUrl(avatarHash),
    );
  });

  it('return editUserNoAvatar', () => {
    const avatarHash = null;
    const userId = 'userId';
    const account = 'userId';

    expect(getUserAvatar(avatarHash, userId, account)).toBe(editUserNoAvatar);
  });

  it('return noAvatar', () => {
    const avatarHash = null;
    const userId = 'userId';
    const account = 'account';

    expect(getUserAvatar(avatarHash, userId, account)).toBe(noAvatar);
  });

  it('return userBodyAvatar', () => {
    const avatarHash = null;
    const userId = null;
    const account = 'account';

    expect(getUserAvatar(avatarHash, userId, account)).toBe(userBodyAvatar);
  });
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
  expect(typeof AccountsSortedBy.creationTime).toBe('object');
});

it('UsersFetcher', () => {
  const fetcher = new UsersFetcher();

  expect(fetcher.TABLE).toBe(ACCOUNT_TABLE);
  expect(fetcher.SCOPE).toBe(ALL_ACCOUNTS_SCOPE);
  expect(fetcher.PRIMARY_KEY).toBe('user');
});

/* eslint camelcase: 0 */
it('uploadImg', async () => {
  const imgHash = 'ipfsHash';
  const imgUrl = 'url';
  const img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCA';

  saveFile.mockImplementationOnce(() => imgHash);
  getFileUrl.mockImplementationOnce(() => imgUrl);

  expect(await uploadImg(img)).toEqual({ imgHash, imgUrl });

  expect(saveFile).toHaveBeenCalledWith(
    Buffer.from(img.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
  );

  expect(getFileUrl).toHaveBeenCalledWith(imgHash);
});

describe('getProfileInfo', async () => {
  const user = 'user';

  const eosProfile = {
    user,
    ipfs_profile: '1111',
    avatar: '1111',
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
  const avatar = 'avatar';
  const user = 'user';
  const profile = { avatar };
  const ipfsProfile = 'ipfsProfile';

  saveText.mockImplementation(() => ipfsProfile);

  expect(cmp.sendTransaction).toHaveBeenCalledTimes(0);

  await saveProfile(cmp, user, avatar, profile);

  expect(saveText).toHaveBeenCalledWith(JSON.stringify(profile));
  expect(cmp.sendTransaction).toHaveBeenCalledTimes(1);
});
