/* eslint consistent-return: 0, no-empty: 0 */

/*
 * input: ?refcode=REFCODE&email=email@email.ru
 * output: [{ key: refcode, value: REFCODE }, { key: email, value: email@email.ru }]
 */

const parseSearchString = (str) =>
  str
    .replace(/\?/gim, '')
    .split('&')
    .map((x) => ({ key: x.split('=')[0], value: x.split('=')[1] }));

/*
 * input:
 *   search: ?refcode=REFCODE&email=email@email.ru
 *   key: refcode
 *
 * output: REFCODE
 */

export const getValueFromSearchString = (search, key) => {
  try {
    return parseSearchString(search).find((x) => x.key === key).value;
  } catch (err) {}
};

export const extractStrings = ([begin, end]) => {
  const matcher = new RegExp(`${begin}(.*?)${end}`, 'gm');
  const normalise = (str) => str.slice(begin.length, end.length * -1);

  return (str) => (normalise ? str.match(matcher)?.map(normalise) : []);
};

export const getSearchParams = (search) => {
  const searchParams = new URLSearchParams(search);
  const searchParamsTags = searchParams.get('tags');
  const allTags = searchParamsTags ? searchParamsTags?.split(',') : [];
  return allTags;
};
