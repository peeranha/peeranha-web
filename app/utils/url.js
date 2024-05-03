import { isSingleCommunityWebsite } from 'utils/communityManagement';

const parseSearchString = (str) =>
  str
    .replace(/\?/gim, '')
    .split('&')
    .map((x) => ({ key: x.split('=')[0], value: x.split('=')[1] }));

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

export const redirectToSSR = (isSingleCommunity) => {
  if (isSingleCommunity) {
    const parts = window.location.host.split('.');
    if (parts.length < 3 || parts[1] !== 'dev1') {
      window.location = `${process.env.SSR_APP_LOCATION}/${window.location.pathname}`;
    }

    parts.splice(1, 1);
    window.location = `https://${parts.join('.')}/${window.location.pathname}`;
  } else {
    window.location = `${process.env.SSR_APP_LOCATION}/${window.location.pathname}`;
  }
};
