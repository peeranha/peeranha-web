const REGISTER_INIT_SERVICE = 'wallet/register/init';
const REGISTER_CONFIRM_SERVICE = 'wallet/register/confirm';
const REGISTER_COMPLETE_SERVICE = 'wallet/register/complete';

const LOGIN_SERVICE = 'wallet/login/login';
const LOGIN_AUTOLOGIN_DATA_SERVICE = 'wallet/login/autologin';

const GET_OWNER_KEY_INIT_SERVICE = 'wallet/get-owner-key/init';
const GET_OWNER_KEY_COMPLETE_SERVICE = 'wallet/get-owner-key/complete';

const CHANGE_CREDENTIALS_INIT_SERVICE = 'wallet/change-credentials/init';
const CHANGE_CREDENTIALS_CONFIRM_SERVICE = 'wallet/change-credentials/confirm';
const CHANGE_CREDENTIALS_GET_KEYS_SERVICE =
  'wallet/change-credentials/get-keys';
const CHANGE_CREDENTIALS_COMPLETE_SERVICE =
  'wallet/change-credentials/complete';

const LOGGER_SERVICE = 'status/ui/report-error';
const PAY_FOR_CPU_SERVICE = 'wallet/pay-for-cpu/pay';
const BEST_NODE_SERVICE = 'status/eos-endpoints/get-all';

const NOTIFICATIONS_GET_SERVICE = 'notifications/get';
const NOTIFICATIONS_INFO_SERVICE = 'notifications/info';
const NOTIFICATIONS_READ_SERVICE = 'notifications/read';

async function callService(service, props, isGet = false) {
  const url = new URL(process.env.WALLET_API_ENDPOINT + service);

  if (isGet) {
    url.search = new URLSearchParams(props).toString();
  }

  const rawResponse = await fetch(url, {
    method: isGet ? 'GET' : 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...(!isGet ? { body: JSON.stringify(props) } : {}),
  });
  const response = await rawResponse.json();
  if (rawResponse.status < 200 || rawResponse.status > 208) {
    return {
      errorMessage: response.message,
      errorCode: response.code,
    };
  }
  return {
    OK: true,
    body: response,
  };
}

module.exports = {
  callService,
  REGISTER_INIT_SERVICE,
  REGISTER_CONFIRM_SERVICE,
  REGISTER_COMPLETE_SERVICE,
  LOGIN_SERVICE,
  LOGIN_AUTOLOGIN_DATA_SERVICE,
  GET_OWNER_KEY_INIT_SERVICE,
  GET_OWNER_KEY_COMPLETE_SERVICE,
  CHANGE_CREDENTIALS_INIT_SERVICE,
  CHANGE_CREDENTIALS_CONFIRM_SERVICE,
  CHANGE_CREDENTIALS_GET_KEYS_SERVICE,
  CHANGE_CREDENTIALS_COMPLETE_SERVICE,
  LOGGER_SERVICE,
  PAY_FOR_CPU_SERVICE,
  BEST_NODE_SERVICE,
  NOTIFICATIONS_GET_SERVICE,
  NOTIFICATIONS_INFO_SERVICE,
  NOTIFICATIONS_READ_SERVICE,
};
