const {
  callService,
  ACCOUNT_REGISTER,
  ACCOUNT_BEGIN_SIGNUP,
  ACCOUNT_VALIDATE_SIGNUP_CODE,
} = require('../../util/aws-connector');

async function registerInit(email) {
  return await callService(ACCOUNT_BEGIN_SIGNUP, { email });
}

async function registerConfirmEmail(email, code) {
  return await callService(ACCOUNT_VALIDATE_SIGNUP_CODE, {
    email,
    code,
  });
}

async function registerComplete(registerProperties) {
  return await callService(ACCOUNT_REGISTER, registerProperties);
}

module.exports = {
  registerInit,
  registerConfirmEmail,
  registerComplete,
};
