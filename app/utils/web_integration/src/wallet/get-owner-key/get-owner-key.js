const { buildEncryptionKeys } = require('../../util/encryption-key-builder');
const {
  decryptObject,
  encryptObject,
  getRandomIv,
} = require('../../util/cipher');
const {
  callService,
  GET_OWNER_KEY_INIT_SERVICE,
  GET_OWNER_KEY_COMPLETE_SERVICE,
} = require('../../util/aws-connector');

async function getOwnerKeyInit(email, rawAuthKey, authByMasterKey) {
  const { authKey } = buildEncryptionKeys(rawAuthKey);
  const requestCreationTime = Date.now();
  const ivResponseEncrypt = getRandomIv();
  const pasphrase = {
    requestCreationTime,
    ivResponseEncrypt,
    supplicant: email,
  };

  const encryptedPassphrase = encryptObject(pasphrase, authKey);

  const requestBody = {
    email,
    authByMasterKey,
    encryptedPassphrase,
  };

  const response = await callService(GET_OWNER_KEY_INIT_SERVICE, requestBody);

  return response;
}

async function getOwnerKeyInitByPwd(email, password) {
  const response = await getOwnerKeyInit(email, password, false);
  return response;
}

async function getOwnerKeyInitByMk(email, masterKey) {
  const response = await getOwnerKeyInit(email, masterKey, true);
  return response;
}

async function getOwnerKey(email, rawAuthKey, authByMasterKey, mailSecret) {
  const { authKey, encryptionKey } = buildEncryptionKeys(rawAuthKey);
  const passphrase = {
    requestCreationTime: Date.now(),
    ivResponseEncrypt: getRandomIv(),
    supplicant: email,
  };

  const encryptedPassphrase = encryptObject(passphrase, authKey);
  const requestBody = {
    emailConfirmRequest: {
      email,
      secretCode: mailSecret,
    },
    authByMasterKey,
    encryptedPassphrase,
  };

  const response = await callService(
    GET_OWNER_KEY_COMPLETE_SERVICE,
    requestBody,
  );

  if (!response.OK) return response;

  const eosKeyCarrier = decryptObject(
    response.body.encryptedEosKeyCarrier,
    authKey,
    passphrase.ivResponseEncrypt,
  );

  const body = {
    keys: {
      activeKey: decryptObject(eosKeyCarrier.activeEosKey, encryptionKey),
      ownerKey: decryptObject(eosKeyCarrier.ownerEosKey, encryptionKey),
    },
  };

  return {
    OK: true,
    body,
  };
}

async function getOwnerKeyByPwd(email, password, mailSecret) {
  const response = await getOwnerKey(email, password, false, mailSecret);
  return response;
}

async function getOwnerKeyByMK(email, masterKey, mailSecret) {
  const response = await getOwnerKey(email, masterKey, true, mailSecret);
  return response;
}

module.exports = {
  getOwnerKeyInitByMk,
  getOwnerKeyInitByPwd,
  getOwnerKeyByPwd,
  getOwnerKeyByMK,
};
