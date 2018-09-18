/**
 * Integration tests for ipfs.
 * NOTE: Integration tests require running local ipfs daemon
 */

import { saveText, getText } from '../ipfs';

describe('ipfs integration', () => {
  describe('saveText and getText', () => {
    it('saves text to ipfs and loads it from ipfs', async () => {
      const testText = 'This is test text';

      const hash = await saveText(testText);
      console.log(hash);
      expect(hash).toBeDefined();

      const loadedText = getText(hash);
      expect(loadedText).toEqual(testText);
    });
  });
});
