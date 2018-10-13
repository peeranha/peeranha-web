/**
 * Tests EOSIO
 */

import Eosjs from 'eosjs';
import EosioService from '../eosio';

jest.mock('eosjs');
jest.mock('scatter-js/dist/scatter.cjs');
Eosjs.mockImplementation(config => ({
  config,
  transaction: actions =>
    new Promise(resolve => {
      resolve(actions);
    }),
  getTableRows: request =>
    new Promise(resolve => {
      resolve({ rows: [request] });
    }),
}));

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Eosjs.mockClear();
});

describe('eosio', () => {
  describe('getEosio', () => {
    it('returns object with not empty configuration', async () => {
      expect(Eosjs).toHaveBeenCalledTimes(0);

      const eos = new EosioService();
      await eos.init();
      expect(eos).toBeDefined();
      expect(eos.initialized).toBe(true);
      expect(eos.scatterInstalled).toBe(false);
      expect(eos.eosInstance).toBeDefined();
      expect(eos.scatterInstance).toBeNull();
      expect(Eosjs).toHaveBeenCalledTimes(1);
    });
  });

  describe('sendTransaction', () => {
    it('sends transaction to eosio', async () => {
      const eos = new EosioService();
      await eos.init();
      const actor = 'dummyActor';
      const action = 'dummyAction';
      const data = 'data';
      const transactionDetails = await eos.sendTransaction(actor, action, data);
      expect(transactionDetails).toBeDefined();
      expect(transactionDetails.actions).toBeDefined();
      expect(transactionDetails.actions.length).toBe(1);
      expect(transactionDetails.actions[0].name).toBe(action);
      expect(transactionDetails.actions[0].authorization[0].actor).toBe(actor);
      expect(transactionDetails.actions[0].data).toBeDefined();
    });
  });

  describe('getTableRow', () => {
    it('retrieves single record from eosio table', async () => {
      const eos = new EosioService();
      await eos.init();
      const table = 'dummyTable';
      const scope = 'dummyScope';
      const primaryKey = 'dummyPrimaryKey';
      const rowDetails = await eos.getTableRow(table, scope, primaryKey);
      expect(rowDetails).toBeDefined();
      expect(rowDetails.json).toBe(true);
      expect(rowDetails.scope).toBe(scope);
      expect(rowDetails.table).toBe(table);
      expect(rowDetails.lower_bound).toBe(primaryKey);
      expect(rowDetails.limit).toBe(1);
    });
  });

  describe('getTableRows', () => {
    it('retrieves array of records from eosio table', async () => {
      const eos = new EosioService();
      await eos.init();
      const table = 'dummyTable';
      const scope = 'dummyScope';
      const rowsDetails = await eos.getTableRows(table, scope);
      expect(rowsDetails).toBeDefined();
      expect(rowsDetails.length).toBe(1);
      expect(rowsDetails[0].json).toBe(true);
      expect(rowsDetails[0].table).toBe(table);
      expect(rowsDetails[0].lower_bound).toBeUndefined();
      expect(rowsDetails[0].limit).toBeUndefined();
    });
  });
});
