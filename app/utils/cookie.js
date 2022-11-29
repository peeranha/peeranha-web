export const NEVER_EXPIRES = 'Tue, 19 Jan 2038 01:14:07 GMT';
export const DEFAULT_PATH = '/';
export const TELOS_DOMAIN = '.telos.net';
export const TEST_COMM_DOMAIN = 'testcommunity.net';

export const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(
      // eslint-disable-next-line no-useless-escape
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
    ),
  );
  return matches ? matches[1] : '';
};

export const setCookie = ({
  name,
  value,
  options = { defaultPath: true, allowSubdomains: true },
}) => {
  const optionsCopy = options;
  if (optionsCopy.expires instanceof Date) {
    optionsCopy.expires = options.expires.toUTCString();
  }

  const updatedCookie = `${name}=${value}`;

  document.cookie = Object.keys(optionsCopy).reduce((acc, optionKey) => {
    if (optionKey === 'neverExpires') {
      return `${acc}; expires=${NEVER_EXPIRES}`;
    } else if (optionKey === 'allowSubdomains' && process.env.ENV !== 'dev') {
      let domain = process.env.COOKIE_DOMAIN;

      if (window.location.origin.endsWith(TELOS_DOMAIN)) {
        domain = TELOS_DOMAIN;
      }
      if (window.location.origin.endsWith(TEST_COMM_DOMAIN)) {
        domain = TEST_COMM_DOMAIN;
      }

      return `${acc}; domain=${domain}`;
    } else if (optionKey === 'defaultPath') {
      return `${acc}; path=${DEFAULT_PATH}`;
    }

    let res = `; ${optionKey}`;
    const optionValue = optionsCopy[optionKey];
    if (optionValue !== true) {
      res += `=${optionValue}`;
    }
    return acc + res;
  }, updatedCookie);
};

export const deleteCookie = (name) =>
  setCookie({
    name,
    value: '',
    options: { 'max-age': -1, defaultPath: true, allowSubdomains: true },
  });
