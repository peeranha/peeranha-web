const { AUTOLOGIN_DATA } = require('containers/Login/constants');

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

const { setCookie, getCookie } = require('../../../../cookie');

async function login(email, password, rememberMe = false) {
  const requestBody = {
    email,
    password,
  };

  const response = await callService(LOGIN_SERVICE, requestBody);

  if (!response.OK) {
    return response;
  }

  const { username, address, token } = response.body;

  const peeranhaAutoLogin = {
    email: username,
    username,
    account: address,
    ethereumUserAddress: address,
    authToken: token,
  };

  if (rememberMe) {
    setCookie({
      name: AUTOLOGIN_DATA,
      value: JSON.stringify(peeranhaAutoLogin),
      options: {
        defaultPath: true,
        allowSubdomains: true,
        neverExpires: true,
      },
    });
  } else {
    setCookie({
      name: AUTOLOGIN_DATA,
      value: JSON.stringify(peeranhaAutoLogin),
      options: {
        defaultPath: true,
        allowSubdomains: true,
        expires: 0,
      },
    });
  }

  return {
    OK: true,
    body: response.body,
    peeranhaAutoLogin,
  };
}

async function autoLogin() {
  const peeranhaAutoLogin = JSON.parse(getCookie(AUTOLOGIN_DATA) || null);

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
    body: {
      activeKey,
      eosAccountName: peeranhaAutoLogin.eosAccountName,
      hasOwnerEosKey: peeranhaAutoLogin.hasOwnerEosKey,
    },
  };
}

export { login, autoLogin };
