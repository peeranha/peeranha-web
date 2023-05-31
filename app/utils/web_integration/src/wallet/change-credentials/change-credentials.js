const {
  callService,
  GET_VERIFICATION_CODE,
  GET_NOTIFICATION_SETTINGS,
  SUBSCRIBE_LINK_EMAIL,
  UNSUBSCRIBE_LINK_EMAIL,
  UPDATE_NOTIFICATION_SETTINGS,
} = require('../../util/aws-connector');

async function getVerificationCode(email) {
  return await callService(GET_VERIFICATION_CODE, {
    email,
  });
}

async function getNotificationSettings(address) {
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

async function unsubscribeLinkEmail(address) {
  return await callService(UNSUBSCRIBE_LINK_EMAIL, {
    address,
  });
}

async function updateNotificationSettings(address, isSubscribed = true) {
  return await callService(UPDATE_NOTIFICATION_SETTINGS, {
    address,
    isSubscribed,
  });
}

module.exports = {
  getVerificationCode,
  getNotificationSettings,
  subscribeLinkEmail,
  unsubscribeLinkEmail,
  updateNotificationSettings,
};
