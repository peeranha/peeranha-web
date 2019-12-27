const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const encoding = 'base64';
const DEFAULT_IV = Buffer.from([
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
]);

/* eslint no-throw-literal: 0, no-plusplus: 0, no-bitwise: 0 */

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
  const plainBytes = objectToBytes(obj);
  let aes;
  const keyBytes = decodeString(key);
  if (iv == null) {
    aes = crypto.createCipheriv(algorithm, keyBytes, DEFAULT_IV);
  } else {
    const ivBytes = decodeString(iv);
    aes = crypto.createCipheriv(algorithm, keyBytes, ivBytes);
  }
  const encryptedObject = Buffer.concat([aes.update(plainBytes), aes.final()]);
  const encryptedText = encodeBytes(encryptedObject);
  return encryptedText;
}

function decryptObject(ecryptedObject, key, iv) {
  const plainBytes = decodeString(ecryptedObject);
  let aes;
  const keyBytes = decodeString(key);
  if (iv == null) {
    aes = crypto.createDecipheriv(algorithm, keyBytes, DEFAULT_IV);
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

function getRandomKey() {
  const key = crypto.randomBytes(32);
  return encodeBytes(key);
}

function xorArray(p1, p2) {
  const p1bytes = decodeString(p1);
  const p2bytes = decodeString(p2);
  if (p1bytes.length !== p2bytes.length) throw 'Different length';
  const xorRes = [];
  for (let i = 0; i < p1bytes.length; ++i) {
    xorRes.push(p1bytes[i] ^ p2bytes[i]);
  }
  return encodeBytes(xorRes);
}

module.exports = {
  encryptObject,
  decryptObject,
  getRandomIv,
  getRandomKey,
  xorArray,
};
