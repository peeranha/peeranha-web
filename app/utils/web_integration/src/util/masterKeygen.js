const bs58 = require('bs58');
const { randomBytes } = require('crypto');

const masterKeyStrength = 16;

// Stub
// Secure random
function generateMasterKey() {
  const rb = randomBytes(masterKeyStrength);
  return bs58.encode(rb);
}

module.exports = {
  generateMasterKey,
};
