export const NEVER_EXPIRES = 'Tue, 19 Jan 2038 01:14:07 GMT';
export const DOMAIN = '.peeranha.io';
export const DEFAULD_PATH = '/';

export const getCookie = name => {
  const matches = document.cookie.match(
    new RegExp(
      // eslint-disable-next-line no-useless-escape
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : '';
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

  const updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value,
  )}`;

  document.cookie = Object.keys(optionsCopy).reduce((acc, optionKey) => {
    if (optionKey === 'neverExpires') {
      return `${acc}; expires=${NEVER_EXPIRES}`;
    } else if (optionKey === 'allowSubdomains') {
      return `${acc}; domain=${DOMAIN}`;
    } else if (optionKey === 'defaultPath') {
      return `${acc}; path=${DEFAULD_PATH}`;
    }

    let res = `; ${optionKey}`;
    const optionValue = optionsCopy[optionKey];
    if (optionValue !== true) {
      res += `=${optionValue}`;
    }
    return acc + res;
  }, updatedCookie);
};

export const deleteCookie = name =>
  setCookie({
    name,
    value: '',
    options: { 'max-age': -1, allowSubdomains: true },
  });
