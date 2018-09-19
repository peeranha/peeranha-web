/**
 * Integration tests for eosioUtils.
 * NOTE: Integration tests require running local eosio node
 */

import {
  getTableRows,
  sendTransaction,
} from '../eosio';

describe('eosio integration', () => {
  describe('sendTransaction', () => {
    it('sends transaction to eos node', async () => {
      const actionResult = await sendTransaction('user1', 'registeracc', {
        owner: 'user1',
        display_name: 'aliceDispName',
        ipfs_profile: 'alice_IPFS',
      });

      console.log(JSON.stringify(actionResult));

      expect(actionResult).toBeDefined();
      expect(actionResult.error).toBeUndefined();
    });
  });

  describe('getTableRows', () => {
    it('returns data from table account', async () => {
      const data = await getTableRows('account', 'allaccounts');
      expect(data).toBeDefined();
      console.log(JSON.stringify(data));
    });
  });
});
