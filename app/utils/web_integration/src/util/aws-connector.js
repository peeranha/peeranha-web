const { WEB3_TOKEN } = require('../../../constants');
const { getCookie } = require('../../../cookie');
const { AUTOLOGIN_DATA } = require('../../../../containers/Login/constants');

const LOGIN_SERVICE = 'account/login';
const LOGIN_AUTOLOGIN_DATA_SERVICE = 'wallet/login/autologin';

const BLOCKCHAIN = 'blockchain';
const BLOCKCHAIN_MAIN_CALL = `${BLOCKCHAIN}/main/call`;
const BLOCKCHAIN_TOKEN_CALL = `${BLOCKCHAIN}/token/call`;
const BLOCKCHAIN_MAIN_SEND_TRANSACTION = `${BLOCKCHAIN}/main/send-transaction`;
const BLOCKCHAIN_SEND_META_TRANSACTION = `${BLOCKCHAIN}/send-meta-transaction`;
const BLOCKCHAIN_SEND_DISPATCHER_TRANSACTION = `${BLOCKCHAIN}/send-dispatcher-transaction/`;

const GET_OWNER_KEY_INIT_SERVICE = 'wallet/get-owner-key/init';
const GET_OWNER_KEY_COMPLETE_SERVICE = 'wallet/get-owner-key/complete';

const LOGGER_SERVICE = 'status/ui/report-error';
const PAY_FOR_CPU_SERVICE = 'wallet/pay-for-cpu/pay';

const NOTIFICATIONS_GET_SERVICE = 'notifications/get';
const NOTIFICATIONS_INFO_SERVICE = 'notifications/info';
const NOTIFICATIONS_READ_SERVICE = 'notifications/read';
const NOTIFICATIONS_TIPS_SERVICE = 'notifications/tips';

const SAVE_FILE_SERVICE = 'save-file';

async function callService(service, props, isGet = false, signal) {
  const url = new URL(process.env.WALLET_API_ENDPOINT + service);

  const auth = {};

  const authData = JSON.parse(getCookie(AUTOLOGIN_DATA) || null);
  const authorizationWeb3Token = getCookie(WEB3_TOKEN) || null;

  if (authData?.authToken) {
    auth.Authorization = `${authData?.authToken}`;
  }

  if (authorizationWeb3Token) {
    auth.Authorization = authorizationWeb3Token;
  }

  if (isGet) {
    url.search = new URLSearchParams(props).toString();
  }

  const rawResponse = await fetch(url, {
    method: isGet ? 'GET' : 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': isGet ? '' : 'application/json',
      ...auth,
    },
    ...(!isGet ? { body: JSON.stringify(props) } : {}),
    signal,
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
  LOGIN_SERVICE,
  LOGIN_AUTOLOGIN_DATA_SERVICE,
  GET_OWNER_KEY_INIT_SERVICE,
  GET_OWNER_KEY_COMPLETE_SERVICE,
  LOGGER_SERVICE,
  PAY_FOR_CPU_SERVICE,
  NOTIFICATIONS_GET_SERVICE,
  NOTIFICATIONS_INFO_SERVICE,
  NOTIFICATIONS_READ_SERVICE,
  NOTIFICATIONS_TIPS_SERVICE,
  BLOCKCHAIN_MAIN_CALL,
  BLOCKCHAIN_TOKEN_CALL,
  BLOCKCHAIN_MAIN_SEND_TRANSACTION,
  BLOCKCHAIN_SEND_META_TRANSACTION,
  BLOCKCHAIN_SEND_DISPATCHER_TRANSACTION,
  SAVE_FILE_SERVICE,
};
