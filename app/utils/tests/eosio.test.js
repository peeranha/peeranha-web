/**
 * Tests EOSIO factory
 */

import Eosjs from 'eosjs';
import { getEosio } from '../eosio';

jest.mock('eosjs');
Eosjs.mockImplementation(config => ({ config }));

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Eosjs.mockClear();
});

describe('eosioFactory', () => {
  describe('getEosio', () => {
    it('returns object with not empty configuration', () => {
      expect(Eosjs).toHaveBeenCalledTimes(0);

      const eosio = getEosio();
      expect(eosio).toBeDefined();
      expect(eosio.config).toBeDefined();
      expect(eosio.config.httpEndpoint).toBeDefined();
      expect(eosio.config.chainId).toBeDefined();
      expect(eosio.config.keyProvider).toBeDefined();
      expect(eosio.config.broadcast).toBeDefined();
      expect(eosio.config.sign).toBeDefined();
      expect(Eosjs).toHaveBeenCalledTimes(1);
    });
  });
});
