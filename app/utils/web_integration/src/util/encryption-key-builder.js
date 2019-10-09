const crypto = require('crypto');

const buildEncryptionKeys = password => {
  const encryptionKey = crypto
    .createHash('sha256')
    .update(password)
    .digest()
    .toString('base64');

  // Is this right desision?
  const authKey = crypto
    .createHash('sha256')
    .update(encryptionKey)
    .digest()
    .toString('base64');
  return { authKey, encryptionKey };
};

module.exports = { buildEncryptionKeys };
