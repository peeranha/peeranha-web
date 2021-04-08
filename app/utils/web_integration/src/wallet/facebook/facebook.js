import { DEFAULT_LOCALE } from 'i18n';

import {
  callService,
  SEND_FB_VERIFICATION_CODE_SERVICE,
  GET_FACEBOOK_PRIVATE_KEY_SERVICE,
  CHECK_FACEBOOK_DATA_SERVICE,
} from '../../util/aws-connector';

async function getFacebookUserPrivateKey({
  id,
  isActiveKey = false,
  isOwnerKey = false,
}) {
  const response = await callService(GET_FACEBOOK_PRIVATE_KEY_SERVICE, {
    id,
    isActiveKey,
    isOwnerKey,
  });

  return response;
}

async function checkFacebookIdService(id, locale = DEFAULT_LOCALE, type) {
  const response = await callService(CHECK_FACEBOOK_DATA_SERVICE, {
    id,
    locale,
    type,
  });
  return response;
}

async function sendFbVerificationCode(id, locale = DEFAULT_LOCALE, type) {
  const response = await callService(SEND_FB_VERIFICATION_CODE_SERVICE, {
    id,
    locale,
    type,
  });

  return response;
}

export {
  getFacebookUserPrivateKey,
  checkFacebookIdService,
  sendFbVerificationCode,
};
