const { DEFAULT_LOCALE } = require('i18n');
const { buildEncryptionKeys } = require('../../util/encryption-key-builder');

const {
  decryptObject,
  encryptObject,
  getRandomIv,
} = require('../../util/cipher');

const {
  callService,
  CHANGE_CREDENTIALS_INIT_SERVICE,
  CHANGE_CREDENTIALS_CONFIRM_SERVICE,
  CHANGE_CREDENTIALS_GET_KEYS_SERVICE,
  CHANGE_PASSWORD_CONFIRM_SERVICE,
  DELETE_FACEBOOK_ACCOUNT_SERVICE,
  GET_VERIFICATION_CODE,
  GET_NOTIFICATION_SETTINGS,
  SUBSCRIBE_LINK_EMAIL,
  UPDATE_NOTIFICATION_SETTINGS,
} = require('../../util/aws-connector');

async function changeCredentialsInit(
  email,
  isDelete = false,
  locale = DEFAULT_LOCALE,
) {
  return await callService(CHANGE_CREDENTIALS_INIT_SERVICE, {
    email,
  });
}

async function changeCredentialsConfirm(email, code, newPassword) {
  return await callService(CHANGE_CREDENTIALS_CONFIRM_SERVICE, {
    email,
    code,
    newPassword,
  });
}

async function deleteFacebookAccService(id) {
  const response = await callService(DELETE_FACEBOOK_ACCOUNT_SERVICE, {
    id,
  });

  return response;
}

async function changeCredentialsGetKeys(
  email,
  rawAuthKey = '',
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
  if (confirmResponse.eosKeyCarrier.ownerEosKey)
    body.keys.ownerKey = decryptObject(
      confirmResponse.eosKeyCarrier.ownerEosKey,
      encryptionKey,
    );
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

async function changeCredentialsComplete(email, password, newPassword) {
  const response = await callService(CHANGE_PASSWORD_CONFIRM_SERVICE, {
    email,
    password,
    newPassword,
  });

  return response;
}

async function getVerificationCode(email) {
  return await callService(GET_VERIFICATION_CODE, {
    email,
  });
}

async function getNotificationSettings(address) {
  console.log(address, '4');
  return await callService(
    GET_NOTIFICATION_SETTINGS,
    {
      address,
    },
    true,
  );
}

async function subscribeLinkEmail(email, address, code) {
  return await callService(SUBSCRIBE_LINK_EMAIL, {
    email,
    address,
    code,
  });
}

async function updateNotificationSettings(address, isSubscribed = true) {
  return await callService(UPDATE_NOTIFICATION_SETTINGS, {
    address,
    isSubscribed,
  });
}

module.exports = {
  changeCredentialsInit,
  changeCredentialsConfirm,
  changeCredentialsGetKeysByPwd,
  changeCredentialsGetKeysByMK,
  changeCredentialsComplete,
  deleteFacebookAccService,
  getVerificationCode,
  getNotificationSettings,
  subscribeLinkEmail,
  updateNotificationSettings,
};
