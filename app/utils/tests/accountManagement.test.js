/**
 * Tests account management operations
 */

import EosioService from '../eosio';
import { saveText } from '../ipfs';
import { registerAccount, isUserInSystem } from '../accountManagement';
import { REGISTER_ACC, ACCOUNT_TABLE, ALL_ACCOUNTS_SCOPE } from '../constants';

jest.mock('../ipfs', () => ({
  saveText: jest.fn().mockImplementation(() => {}),
}));

JSON.stringify = jest.fn();

const cmp = new EosioService();
cmp.sendTransaction = jest.fn().mockImplementation(() => {});
cmp.getTableRow = jest.fn().mockImplementation(() => {});

it('registerAccount', async () => {
  const acc = 'user1';
  const dName = 'user2';
  const profile = {};
  const savedHash = 'savedHash';

  saveText.mockImplementation(() => savedHash);

  expect(JSON.stringify).toHaveBeenCalledTimes(0);
  expect(cmp.sendTransaction).toHaveBeenCalledTimes(0);

  await registerAccount(acc, dName, profile, cmp);

  expect(cmp.sendTransaction).toHaveBeenCalledWith(acc, REGISTER_ACC, {
    owner: acc,
    display_name: dName,
    ipfs_profile: savedHash,
  });
  expect(saveText).toHaveBeenCalledTimes(1);
  expect(JSON.stringify).toHaveBeenCalledTimes(1);
});

describe('isUserInSystem', () => {
  const user = 'user1';
  cmp.getTableRow.mockImplementationOnce(() => true);

  it('@user is true', async () => {
    expect(await isUserInSystem(user, cmp)).toBe(true);
    expect(cmp.getTableRow).toHaveBeenCalledWith(
      ACCOUNT_TABLE,
      ALL_ACCOUNTS_SCOPE,
      user,
    );
  });

  it('@user is null', async () => {
    expect(await isUserInSystem(null, cmp)).toBe(false);
  });
});
