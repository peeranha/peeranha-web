/**
 * Tests IPFS utils
 */

import { saveText, getText, saveFile, getFileUrl } from '../ipfs';
import { IPFS_URL } from '../constants';

const dummyHash = 'dummy-hash';

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
  describe('getFileUrl', async () => {
    const fileHash = 'hash';
    const fileUrl = await getFileUrl(fileHash);

    expect(fileUrl).toBe(`${IPFS_URL}/${fileHash}`);
  });

  describe('saveFile', async () => {
    const file = 'file';
    const hash = await saveFile(file);
    expect(hash).toBe(dummyHash);
  });

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
