/**
 * Tests account management operations
 */

import { sendTransaction } from '../eosio';
import { saveText } from '../ipfs';
import { registerAccount } from '../accountManagement';

jest.mock('../eosio');
sendTransaction.mockImplementation(async (actor, action, data) => ({
  actor,
  action,
  data,
}));

const dummyHash = 'dummyHash';
jest.mock('../ipfs');
saveText.mockImplementation(async () => dummyHash);

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  sendTransaction.mockClear();
});

describe('accountManagement', () => {
  describe('registerAccount', () => {
    it('registers account on blockchain and saves profile to ipfs', async () => {
      const account = 'dummyAccount';
      const displayName = 'dummyDisplayName';
      const profile = {
        description: 'dummyDescription',
      };
      const result = await registerAccount(account, displayName, profile);
      expect(result).toBe(true);
      expect(saveText).toHaveBeenCalledWith(JSON.stringify(profile));
      expect(sendTransaction).toHaveBeenCalledWith(account, 'registeracc', {
        owner: account,
        display_name: displayName,
        ipfs_profile: dummyHash,
      });
    });
  });
});
