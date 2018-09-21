/**
 * Tests EOSIO
 */

import Eosjs from 'eosjs';
import { getEosio, sendTransaction, getTableRow, getTableRows } from '../eosio';

jest.mock('eosjs');
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

  describe('sendTransaction', () => {
    it('sends transaction to eosio', async () => {
      const actor = 'dummyActor';
      const action = 'dummyAction';
      const data = 'data';
      const transactionDetails = await sendTransaction(actor, action, data);
      expect(transactionDetails).toBeDefined();
      expect(transactionDetails.actions).toBeDefined();
      expect(transactionDetails.actions.length).toBe(1);
      expect(transactionDetails.actions[0].account).toBeDefined();
      expect(transactionDetails.actions[0].name).toBe(action);
      expect(transactionDetails.actions[0].authorization[0].actor).toBe(actor);
      expect(transactionDetails.actions[0].data).toBeDefined();
    });
  });

  describe('getTableRow', () => {
    it('retrieves single record from eosio table', async () => {
      const table = 'dummyTable';
      const scope = 'dummyScope';
      const primaryKey = 'dummyPrimaryKey';
      const rowDetails = await getTableRow(table, scope, primaryKey);
      expect(rowDetails).toBeDefined();
      expect(rowDetails.json).toBe(true);
      expect(rowDetails.code).toBeDefined();
      expect(rowDetails.scope).toBe(scope);
      expect(rowDetails.table).toBe(table);
      expect(rowDetails.lower_bound).toBe(primaryKey);
      expect(rowDetails.limit).toBe(1);
    });
  });

  describe('getTableRows', () => {
    it('retrieves array of records from eosio table', async () => {
      const table = 'dummyTable';
      const scope = 'dummyScope';
      const rowsDetails = await getTableRows(table, scope);
      expect(rowsDetails).toBeDefined();
      expect(rowsDetails.length).toBe(1);
      expect(rowsDetails[0].json).toBe(true);
      expect(rowsDetails[0].code).toBeDefined();
      expect(rowsDetails[0].scope).toBe(scope);
      expect(rowsDetails[0].table).toBe(table);
      expect(rowsDetails[0].lower_bound).toBeUndefined();
      expect(rowsDetails[0].limit).toBeUndefined();
    });
  });
});
