/* eslint no-useless-escape: 0 */
class Cookies {
  static get = name => {
    const matches = document.cookie.match(
      new RegExp(
        `(?:^|; )${name.replace(
          /([\.$?*|{}\(\)\[\]\\\/\+^])/g,
          '\\$1',
        )}=([^;]*)`,
      ),
    );

    return matches ? decodeURIComponent(matches[1]) : undefined;
  };

  static set = (name, value, time) => {
    const date = new Date(new Date().getTime() + time * 1000);
    document.cookie = `${name}=${value}; path=/; expires=${date.toUTCString()}`;
  };

  static remove = name => {
    const date = new Date(0);
    document.cookie = `${name}=; path=/; expires=${date.toUTCString()}`;
  };
}

export default Cookies;
