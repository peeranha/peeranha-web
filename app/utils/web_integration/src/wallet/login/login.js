const { buildEncryptionKeys } = require('../../util/encryption-key-builder');

const {
  decryptObject,
  encryptObject,
  getRandomIv,
  getRandomKey,
  xorArray,
} = require('../../util/cipher');

const {
  callService,
  LOGIN_SERVICE,
  LOGIN_AUTOLOGIN_DATA_SERVICE,
} = require('../../util/aws-connector');

const { AUTOLOGIN_DATA } = require('../../../../../containers/Login/constants');

async function login(email, password, rememberMe = false) {
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
    autoLogin: rememberMe,
  };

  const response = await callService(LOGIN_SERVICE, requestBody);

  if (!response.OK) {
    return response;
  }

  const loginResponse = decryptObject(
    response.body.encryptedLoginResponse,
    authKey,
    ivResponseEncrypt,
  );

  const {
    eosAccountName,
    eosKeyCarrier,
    autoLoginOptions,
  } = loginResponse.eosKeyCarrier;

  const activeKey = decryptObject(eosKeyCarrier.activeEosKey, encryptionKey);

  window.localStorage.setItem(AUTOLOGIN_DATA, JSON.stringify({ email }));

  if (rememberMe) {
    const { authToken, passwordServerPart } = autoLoginOptions;
    const passwordUserPart = getRandomKey();
    const xorArrayPassword = xorArray(passwordUserPart, passwordServerPart);
    const encryptedKeys = encryptObject(activeKey, xorArrayPassword);

    const peeranhaAutoLogin = {
      email,
      eosAccountName,
      authToken,
      passwordUserPart,
      encryptedKeys,
    };

    window.localStorage.setItem(
      AUTOLOGIN_DATA,
      JSON.stringify(peeranhaAutoLogin),
    );
  }

  return {
    OK: true,
    body: { activeKey, eosAccountName },
  };
}

async function autoLogin() {
  const peeranhaAutoLogin = JSON.parse(
    window.localStorage.getItem(AUTOLOGIN_DATA),
  );

  if (!(peeranhaAutoLogin && peeranhaAutoLogin.authToken)) {
    return {
      errorCode: 100,
      errorMessage: 'No autologin entity',
    };
  }

  const requestBody = {
    email: peeranhaAutoLogin.email,
    authToken: peeranhaAutoLogin.authToken,
  };

  const response = await callService(LOGIN_AUTOLOGIN_DATA_SERVICE, requestBody);

  if (!response.OK) return response;
  const password = xorArray(
    peeranhaAutoLogin.passwordUserPart,
    response.body.passwordServerPart,
  );

  const activeKey = decryptObject(peeranhaAutoLogin.encryptedKeys, password);

  return {
    OK: true,
    body: { activeKey, eosAccountName: peeranhaAutoLogin.eosAccountName },
  };
}

module.exports = {
  login,
  autoLogin,
};
