import { buildEncryptionKeys } from '../../util/encryption-key-builder';
import { encryptObject } from '../../util/cipher';

import {
  callService,
  REGISTER_COMPLETE_SERVICE,
  REGISTER_INIT_SERVICE,
  REGISTER_CONFIRM_SERVICE,
} from '../../util/aws-connector';

async function registerInit(email) {
  const response = await callService(REGISTER_INIT_SERVICE, { email });
  return response;
}

async function registerConfirmEmail(email, secretCode) {
  const response = await callService(REGISTER_CONFIRM_SERVICE, {
    email,
    secretCode,
  });

  return response;
}

async function registerComplete(
  registerProperties,
  encryptionKey,
  includeOwnerKeys = true,
  requestAccountMessage,
) {
  const { email, password, masterKey, keys } = registerProperties;
  const hashPassword = buildEncryptionKeys(password);
  const hashMasterKey = buildEncryptionKeys(masterKey);

  const encryptedPwdEosKeys = {
    activeKey: encryptObject(keys.activeKey, hashPassword.encryptionKey),
  };

  const encryptedMKEosKeys = {
    activeKey: encryptObject(keys.activeKey, hashMasterKey.encryptionKey),
  };

  if (includeOwnerKeys) {
    encryptedPwdEosKeys.ownerKey = encryptObject(
      keys.ownerKey,
      hashPassword.encryptionKey,
    );
    encryptedMKEosKeys.ownerKey = encryptObject(
      keys.ownerKey,
      hashMasterKey.encryptionKey,
    );
  }

  const credentials = {
    hashPassword: hashPassword.authKey,
    hashMasterKey: hashMasterKey.authKey,
    encryptedPwdEosKeys,
    encryptedMKEosKeys,
  };

  if (requestAccountMessage) {
    credentials.requestActivateAccount = {
      info: requestAccountMessage,
      publicActiveKey: keys.activeKey.public,
      publicOwnerKey: keys.ownerKey.public,
    };
  }
  const encryptedCredentials = encryptObject(credentials, encryptionKey);
  const requestBody = {
    email,
    encryptedCredentials,
  };

  const response = await callService(REGISTER_COMPLETE_SERVICE, requestBody);

  return response;
}

export { registerInit, registerConfirmEmail, registerComplete };
