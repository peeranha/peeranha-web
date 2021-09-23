/**
 * Tests account management operations
 */

import { saveText } from '../ipfs';
import { registerAccount, isUserInSystem } from '../accountManagement';

import {
  REGISTER_ACC,
  ACCOUNT_TABLE,
  ALL_ACCOUNTS_SCOPE,
  NO_AVATAR,
} from '../constants';

jest.mock('../ipfs', () => ({
  saveText: jest.fn().mockImplementation(() => {}),
}));

JSON.stringify = jest.fn();

const EosioService = {
  sendTransaction: jest.fn(),
  getTableRow: jest.fn(),
};

it('registerAccount', async () => {
  const savedHash = 'savedHash';

  const profile = {
    accountName: 'accountName',
    displayName: 'displayName',
  };

  saveText.mockImplementation(() => savedHash);

  expect(JSON.stringify).toHaveBeenCalledTimes(0);
  expect(EosioService.sendTransaction).toHaveBeenCalledTimes(0);

  await registerAccount(profile, EosioService);

  expect(EosioService.sendTransaction).toHaveBeenCalledWith(
    profile.accountName,
    REGISTER_ACC,
    {
      user: profile.accountName,
      displayName: profile.displayName,
      ipfs_profile: savedHash,
      avatar: NO_AVATAR,
    },
  );
  expect(saveText).toHaveBeenCalledTimes(1);
  expect(JSON.stringify).toHaveBeenCalledTimes(1);
});

describe('isUserInSystem', () => {
  const user = 'user1';
  EosioService.getTableRow.mockImplementationOnce(() => true);

  it('@user is true', async () => {
    expect(await isUserInSystem(user, EosioService)).toBe(true);
    expect(EosioService.getTableRow).toHaveBeenCalledWith(
      ACCOUNT_TABLE,
      ALL_ACCOUNTS_SCOPE,
      user,
    );
  });

  it('@user is null', async () => {
    expect(await isUserInSystem(null, EosioService)).toBe(false);
  });
});
