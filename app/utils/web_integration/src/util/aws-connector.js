import { WEB3_TOKEN } from 'utils/constants';
import { getCookie } from 'utils/cookie';
import { AUTOLOGIN_DATA } from 'containers/Login/constants';
export const BLOCKCHAIN = 'blockchain';
export const BLOCKCHAIN_SEND_META_TRANSACTION = `${BLOCKCHAIN}/send-meta-transaction`;
export const BLOCKCHAIN_SEND_DISPATCHER_TRANSACTION = `${BLOCKCHAIN}/send-dispatcher-transaction/`;

export const LOGGER_SERVICE = 'status/ui/report-error';

export const NOTIFICATIONS_GET_SERVICE = 'notifications/get';
export const NOTIFICATIONS_INFO_SERVICE = 'notifications/info';
export const NOTIFICATIONS_READ_SERVICE = 'notifications/read';
export const SAVE_FILE_SERVICE = 'save-file';

export async function callService(service, props, isGet = false, signal) {
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
      reCaptchaToken: props.reCaptchaToken,
      ...auth,
      reCaptchaToken: props.reCaptchaToken,
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
