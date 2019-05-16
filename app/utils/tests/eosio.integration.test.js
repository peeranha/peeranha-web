/**
 * Integration tests for eosioUtils.
 * NOTE: Integration tests require running local eosio node
 */

import EosioService from '../eosio';

jest.setTimeout(10000);

describe('eosio integration', () => {
  const eos = new EosioService();

  describe('connectToWallet', async () => {
    xit('Eos is intialized without scatter', async () => {
      await eos.init();
      expect(eos.initialized).toBe(true);
      expect(eos.scatterInstalled).toBe(false);
      expect(eos.eosInstance).toBeDefined();
    });
  });

  describe('sendTransaction', () => {
    // Test runs successfully only first time and fails the second time (restart eos node to re-run)
    xit('sends transaction to eos node for first user', async () => {
      const actionResult1 = await eos.sendTransaction('user1', 'registeracc', {
        user: 'user1',
        display_name: 'user1DispName',
        ipfs_profile: 'user1_IPFS',
      });

      expect(actionResult1).toBeDefined();
      expect(actionResult1.error).toBeUndefined();
    });

    // Test runs successfully only first time and fails the second time (restart eos node to re-run)
    xit('sends transaction to eos node for second user', async () => {
      const actionResult2 = await eos.sendTransaction('user2', 'registeracc', {
        user: 'user2',
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
      const record = await eos.getTableRow('account', 'allaccounts', 'user1');
      expect(record).toBeDefined();
      expect(record.user).toBe('user1');
      expect(record.display_name).toBe('user1DispName');
      expect(record.ipfs_profile).toBe('user1_IPFS');
    });
  });

  describe('getTableRows', () => {
    // run 'sends transaction to eos node' prior running this test
    xit('returns all records account table', async () => {
      const records = await eos.getTableRows('account', 'allaccounts');
      expect(records).toBeDefined();
      expect(records.length).toBe(2);
      expect(records[0].user).toBe('user1');
      expect(records[0].display_name).toBe('user1DispName');
      expect(records[0].ipfs_profile).toBe('user1_IPFS');
      expect(records[1].user).toBe('user2');
      expect(records[1].display_name).toBe('user2DispName');
      expect(records[1].ipfs_profile).toBe('user2_IPFS');
    });
  });
});
