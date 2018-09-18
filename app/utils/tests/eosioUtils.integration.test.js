/**
 * Integration tests for eosioUtils.
 * NOTE: Integration tests require running local eosio node
 */

import {
  getCurrentAccountName,
  getTableRows,
  sendTransaction,
} from '../eosioUtils';

describe('eosioUtils integration', () => {
  describe('getCurrentAccountName', () => {
    it('returns valid not empty account name', () => {
      const currentAccountName = getCurrentAccountName();
      expect(currentAccountName).toBeDefined();
    });
  });

  describe('getTableRows', () => {
    it('returns data from table account', () => {
      const data = getTableRows('account', 'allaccounts');
      expect(data).toBeDefined();
      console.log(JSON.stringify(data));
    });
  });

  describe('sendTransaction', () => {
    it('sends transaction to eos node', () => {
      const actionResult = sendTransaction('user1', 'registeracc', {
        owner: 'user1',
        display_name: 'aliceDispName',
        ipfs_profile: 'alice_IPFS',
      });

      console.log(JSON.stringify(actionResult));

      expect(actionResult).toBeDefined();
      expect(actionResult.error).toBeUndefined();
    });
  });
});
