/**
 * Tests account management operations
 */

import { saveText } from '../ipfs';
import { isUserInSystem } from '../accountManagement';

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

const EthereumService = {
  sendTransaction: jest.fn(),
  getTableRow: jest.fn(),
};

describe('isUserInSystem', () => {
  const user = 'user1';
  EthereumService.getTableRow.mockImplementationOnce(() => true);

  it('@user is true', async () => {
    expect(await isUserInSystem(user, EthereumService)).toBe(true);
    expect(EthereumService.getTableRow).toHaveBeenCalledWith(
      ACCOUNT_TABLE,
      ALL_ACCOUNTS_SCOPE,
      user,
    );
  });

  it('@user is null', async () => {
    expect(await isUserInSystem(null, EthereumService)).toBe(false);
  });
});
