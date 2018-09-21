/**
 * Integration tests for ipfs.
 * NOTE: Integration tests require running local ipfs daemon
 */

import { saveText, getText } from '../ipfs';

describe('ipfs integration', () => {
  describe('saveText and getText', () => {
    xit('saves text to ipfs and loads it from ipfs', async () => {
      const testText = 'This is test text';

      const hash = await saveText(testText);
      expect(hash).toBeDefined();

      const loadedText = await getText(hash);
      expect(loadedText).toEqual(testText);
    });
  });
});
