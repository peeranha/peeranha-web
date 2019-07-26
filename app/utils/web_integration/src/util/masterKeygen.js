import bs58 from 'bs58';
import { randomBytes } from 'crypto';

const masterKeyStrength = 16;

function generateMasterKey() {
  const rb = randomBytes(masterKeyStrength);
  return bs58.encode(rb);
}

export { generateMasterKey };
