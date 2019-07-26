import { buildEncryptionKeys } from '../../util/encryption-key-builder';

import { decryptObject, encryptObject, getRandomIv } from '../../util/cipher';

import {
  callService,
  CHANGE_CREDENTIALS_INIT_SERVICE,
  CHANGE_CREDENTIALS_CONFIRM_SERVICE,
  CHANGE_CREDENTIALS_GET_KEYS_SERVICE,
  CHANGE_CREDENTIALS_COMPLETE_SERVICE,
} from '../../util/aws-connector';

async function changeCredentialsInit(email) {
  const response = await callService(CHANGE_CREDENTIALS_INIT_SERVICE, {
    email,
  });
  return response;
}

async function changeCredentialsConfirm(email, secretCode) {
  const response = await callService(CHANGE_CREDENTIALS_CONFIRM_SERVICE, {
    email,
    secretCode,
  });

  return response;
}

async function changeCredentialsGetKeys(
  email,
  rawAuthKey,
  authByMasterKey,
  mailSecret,
) {
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
    CHANGE_CREDENTIALS_GET_KEYS_SERVICE,
    requestBody,
  );

  if (!response.OK) return response;

  const confirmResponse = decryptObject(
    response.body.encryptedConfirmResponse,
    authKey,
    passphrase.ivResponseEncrypt,
  );

  const body = {
    encryptionKey: confirmResponse.encryptionKey,
    keys: {
      activeKey: decryptObject(
        confirmResponse.eosKeyCarrier.activeEosKey,
        encryptionKey,
      ),
    },
  };

  if (confirmResponse.eosKeyCarrier.ownerEosKey) {
    body.keys.ownerKey = decryptObject(
      confirmResponse.eosKeyCarrier.ownerEosKey,
      encryptionKey,
    );
  }

  return {
    OK: true,
    body,
  };
}

async function changeCredentialsGetKeysByMK(email, masterKey, mailSecret) {
  const response = await changeCredentialsGetKeys(
    email,
    masterKey,
    true,
    mailSecret,
  );

  return response;
}

async function changeCredentialsGetKeysByPwd(email, password, mailSecret) {
  const response = await changeCredentialsGetKeys(
    email,
    password,
    false,
    mailSecret,
  );

  return response;
}

// Always keep <keys> in newProperties!!!
async function changeCredentialsComplete(
  newProperties,
  oldEmail,
  encryptionKey,
  includeOwnerKeys,
) {
  const { keys } = newProperties;
  const userKeyModify = {};

  if (newProperties.email) userKeyModify.email = newProperties.email;

  if (newProperties.password) {
    const hashPassword = buildEncryptionKeys(newProperties.password);
    const encryptedPwdEosKeys = {
      activeKey: encryptObject(keys.activeKey, hashPassword.encryptionKey),
    };
    if (keys.ownerKey)
      encryptedPwdEosKeys.ownerKey = encryptObject(
        keys.ownerKey,
        hashPassword.encryptionKey,
      );
    userKeyModify.hashPassword = hashPassword.authKey;
    userKeyModify.encryptedPwdEosKeys = encryptedPwdEosKeys;
  }

  if (newProperties.masterKey) {
    const hashMasterKey = buildEncryptionKeys(newProperties.masterKey);
    const encryptedMKEosKeys = {
      activeKey: encryptObject(keys.activeKey, hashMasterKey.encryptionKey),
    };

    if (includeOwnerKeys) {
      encryptedMKEosKeys.ownerKey = encryptObject(
        keys.ownerKey,
        hashMasterKey.encryptionKey,
      );
    }

    userKeyModify.hashMasterKey = hashMasterKey.authKey;
    userKeyModify.encryptedMKEosKeys = encryptedMKEosKeys;
  }

  const encryptedUserKeyModify = encryptObject(userKeyModify, encryptionKey);
  const requestBody = {
    email: oldEmail,
    encryptedUserKeyModify,
  };

  const response = await callService(
    CHANGE_CREDENTIALS_COMPLETE_SERVICE,
    requestBody,
  );

  return response;
}

export {
  changeCredentialsInit,
  changeCredentialsConfirm,
  changeCredentialsGetKeysByPwd,
  changeCredentialsGetKeysByMK,
  changeCredentialsComplete,
};
