import crypto from 'crypto';

const buildEncryptionKeys = password => {
  const encryptionKey = crypto
    .createHash('sha256')
    .update(password)
    .digest()
    .toString('base64');

  const authKey = crypto
    .createHash('sha256')
    .update(encryptionKey)
    .digest()
    .toString('base64');

  return { authKey, encryptionKey };
};

export { buildEncryptionKeys };
