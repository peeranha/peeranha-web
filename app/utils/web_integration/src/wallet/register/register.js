const {
  callService,
  ACCOUNT_REGISTER,
  ACCOUNT_BEGIN_SIGNUP,
  ACCOUNT_VALIDATE_SIGNUP_CODE,
} = require('../../util/aws-connector');
const { saveText } = require('../../../../ipfs');

async function registerInit(email) {
  return await callService(ACCOUNT_BEGIN_SIGNUP, { email });
}

async function registerConfirmEmail(email, code) {
  return await callService(ACCOUNT_VALIDATE_SIGNUP_CODE, {
    email,
    code,
  });
}

async function registerComplete(registerProperties, profile) {
  const ipfsHashHex = await saveText(JSON.stringify(profile));

  return await callService(ACCOUNT_REGISTER, {
    ...registerProperties,
    ipfsHashHex,
  });
}

module.exports = {
  registerInit,
  registerConfirmEmail,
  registerComplete,
};
