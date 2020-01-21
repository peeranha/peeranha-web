export const getCookie = name => {
  const matches = document.cookie.match(
    new RegExp(
      // eslint-disable-next-line no-useless-escape
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : '';
};

export const setCookie = ({ name, value, options = { expires: {} } }) => {
  const optionsCopy = options;
  if (optionsCopy.expires.toUTCString) {
    optionsCopy.expires = options.expires.toUTCString();
  }

  const updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value,
  )}`;

  document.cookie = Object.keys(optionsCopy).reduce((acc, optionKey) => {
    let res = `; ${optionKey}`;
    const optionValue = optionsCopy[optionKey];
    if (optionValue !== true) {
      res += `=${optionValue}`;
    }
    return acc + res;
  }, updatedCookie);
};

export const deleteCookie = name =>
  setCookie({ name, value: '', options: { 'max-age': -1 } });
