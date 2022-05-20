/**
 * Tests account management operations
 */

import { isUserInSystem } from '../accountManagement';

import {
  ACCOUNT_TABLE,
  ALL_ACCOUNTS_SCOPE,
} from '../constants';

jest.mock('../ipfs', () => ({
  saveText: jest.fn().mockImplementation(() => {}),
}));

JSON.stringify = jest.fn();

const EosioService = {
  sendTransaction: jest.fn(),
  getTableRow: jest.fn(),
};

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
