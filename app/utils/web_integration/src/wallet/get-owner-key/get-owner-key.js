import { buildEncryptionKeys } from '../../util/encryption-key-builder';

import { decryptObject, encryptObject, getRandomIv } from '../../util/cipher';

import {
  callService,
  GET_OWNER_KEY_INIT_SERVICE,
  GET_OWNER_KEY_COMPLETE_SERVICE,
} from '../../util/aws-connector';

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

  const val = await callService(GET_OWNER_KEY_INIT_SERVICE, requestBody);

  return val;
}

async function getOwnerKeyInitByPwd(email, password) {
  const val = await getOwnerKeyInit(email, password, false);
  return val;
}

async function getOwnerKeyInitByMk(email, masterKey) {
  const val = await getOwnerKeyInit(email, masterKey, true);
  return val;
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
  const val = await getOwnerKey(email, password, false, mailSecret);
  return val;
}

async function getOwnerKeyByMK(email, masterKey, mailSecret) {
  const val = await getOwnerKey(email, masterKey, true, mailSecret);
  return val;
}

export {
  getOwnerKeyInitByMk,
  getOwnerKeyInitByPwd,
  getOwnerKeyByPwd,
  getOwnerKeyByMK,
};
