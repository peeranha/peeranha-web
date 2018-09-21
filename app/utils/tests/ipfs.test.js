/**
 * Tests IPFS utils
 */

import IpfsApi from 'ipfs-api';
import { saveText, getText } from '../ipfs';

const dummyHash = 'dummy-hash';

jest.mock('ipfs-api');
IpfsApi.mockImplementation(() => ({
  add: () =>
    new Promise(resolve => {
      resolve([
        {
          hash: dummyHash,
        },
      ]);
    }),
  get: () =>
    new Promise(resolve => {
      resolve([
        {
          content: new Uint16Array(100),
        },
      ]);
    }),
}));

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  IpfsApi.mockClear();
});

describe('ipfs', () => {
  describe('saveText', () => {
    it('saves text to ipfs', async () => {
      const text = 'dummyText';
      const hash = await saveText(text);
      expect(hash).toBe(dummyHash);
    });
  });

  describe('getTableRow', () => {
    it('retrieves single record from eosio table', async () => {
      const textFromIpfs = await getText(dummyHash);
      expect(textFromIpfs).toBeDefined();
    });
  });
});
