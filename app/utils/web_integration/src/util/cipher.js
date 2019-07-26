import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const encoding = 'base64';

function objectToBytes(obj) {
  const objectText = JSON.stringify(obj);
  return Buffer.from(objectText);
}

function decodeString(str) {
  return Buffer.from(str, encoding);
}

function encodeBytes(byteArray) {
  return Buffer.from(byteArray).toString(encoding);
}

function bytesToObject(byteArray) {
  const objectText = byteArray.toString();
  return JSON.parse(objectText);
}

function encryptObject(obj, key, iv) {
  let aes;

  const plainBytes = objectToBytes(obj);
  const keyBytes = decodeString(key);

  if (iv == null) {
    aes = crypto.createCipher(algorithm, keyBytes);
  } else {
    const ivBytes = decodeString(iv);
    aes = crypto.createCipheriv(algorithm, keyBytes, ivBytes);
  }

  const encryptedObject = Buffer.concat([aes.update(plainBytes), aes.final()]);
  const encryptedText = encodeBytes(encryptedObject);

  return encryptedText;
}

function decryptObject(ecryptedObject, key, iv) {
  let aes;

  const plainBytes = decodeString(ecryptedObject);
  const keyBytes = decodeString(key);

  if (iv == null) {
    aes = crypto.createDecipher(algorithm, keyBytes);
  } else {
    const ivBytes = decodeString(iv);
    aes = crypto.createDecipheriv(algorithm, keyBytes, ivBytes);
  }

  const objectBytes = Buffer.concat([aes.update(plainBytes), aes.final()]);
  const encryptedText = bytesToObject(objectBytes);

  return encryptedText;
}

function getRandomIv() {
  const iv = crypto.randomBytes(16);
  return encodeBytes(iv);
}

export { encryptObject, decryptObject, getRandomIv };
