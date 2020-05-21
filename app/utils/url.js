/* eslint consistent-return: 0, no-empty: 0 */

/*
 * input: ?refcode=REFCODE&email=email@email.ru
 * output: [{ key: refcode, value: REFCODE }, { key: email, value: email@email.ru }]
 */

const parseSearchString = str =>
  str
    .replace(/\?/gim, '')
    .split('&')
    .map(x => ({ key: x.split('=')[0], value: x.split('=')[1] }));

/*
 * input:
 *   search: ?refcode=REFCODE&email=email@email.ru
 *   key: refcode
 *
 * output: REFCODE
 */

export const getValueFromSearchString = (search, key) => {
  try {
    return parseSearchString(search).find(x => x.key === key).value;
  } catch (err) {}
};

export const getTwitterShareLink = (url, text, via) => {
  try {
    return `https://twitter.com/share?url=${url}&text=${text}&via=${via}`;
  } catch (err) {}
};

export const getFacebookShareLink = url => {
  try {
    return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  } catch (err) {}
};

export const getTelegramShareLink = (url, text) => {
  try {
    return `https://t.me/share/url?url=${url}&text=${text}`;
  } catch (err) {}
};

export const getRedditShareLink = (url, title, text) => {
  try {
    return `http://www.reddit.com/submit?url=${url}&title=${title}&text=${text}`;
  } catch (err) {}
};
