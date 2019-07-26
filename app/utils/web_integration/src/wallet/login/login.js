import { buildEncryptionKeys } from '../../util/encryption-key-builder';
import { decryptObject, encryptObject, getRandomIv } from '../../util/cipher';
import { callService, LOGIN_SERVICE } from '../../util/aws-connector';

async function login(email, password) {
  const { authKey, encryptionKey } = buildEncryptionKeys(password);
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
    encryptedPassphrase,
  };

  const response = await callService(LOGIN_SERVICE, requestBody);

  if (!response.OK) {
    return response;
  }

  const eosKeyCarrier = decryptObject(
    response.body.encryptedEosKeyCarrier,
    authKey,
    ivResponseEncrypt,
  );

  const activeKey = decryptObject(eosKeyCarrier.activeEosKey, encryptionKey);

  return {
    OK: true,
    body: { activeKey },
  };
}

export { login };
