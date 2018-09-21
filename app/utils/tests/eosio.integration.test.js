/**
 * Integration tests for eosioUtils.
 * NOTE: Integration tests require running local eosio node
 */

import { getTableRow, getTableRows, sendTransaction } from '../eosio';

describe('eosio integration', () => {
  describe('sendTransaction', () => {
    // Test runs successfully only first time and fails the second time (restart eos node to re-run)
    xit('sends transaction to eos node for first user', async () => {
      const actionResult1 = await sendTransaction('user1', 'registeracc', {
        owner: 'user1',
        display_name: 'user1DispName',
        ipfs_profile: 'user1_IPFS',
      });

      expect(actionResult1).toBeDefined();
      expect(actionResult1.error).toBeUndefined();
    });

    // Test runs successfully only first time and fails the second time (restart eos node to re-run)
    xit('sends transaction to eos node for second user', async () => {
      const actionResult2 = await sendTransaction('user2', 'registeracc', {
        owner: 'user2',
        display_name: 'user2DispName',
        ipfs_profile: 'user2_IPFS',
      });

      expect(actionResult2).toBeDefined();
      expect(actionResult2.error).toBeUndefined();
    });
  });

  describe('getTableRow', () => {
    // run 'sends transaction to eos node' prior running this test
    xit('returns one record from account table', async () => {
      const record = await getTableRow('account', 'allaccounts', 'user1');
      expect(record).toBeDefined();
      expect(record.owner).toBe('user1');
      expect(record.display_name).toBe('user1DispName');
      expect(record.ipfs_profile).toBe('user1_IPFS');
    });
  });

  describe('getTableRows', () => {
    // run 'sends transaction to eos node' prior running this test
    xit('returns all records account table', async () => {
      const records = await getTableRows('account', 'allaccounts');
      expect(records).toBeDefined();
      expect(records.length).toBe(2);
      expect(records[0].owner).toBe('user1');
      expect(records[0].display_name).toBe('user1DispName');
      expect(records[0].ipfs_profile).toBe('user1_IPFS');
      expect(records[1].owner).toBe('user2');
      expect(records[1].display_name).toBe('user2DispName');
      expect(records[1].ipfs_profile).toBe('user2_IPFS');
    });
  });
});
