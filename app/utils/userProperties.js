import { COMMUNITY_ADMIN_KEY } from './constants';

const findPropertyByKeys = (properties, keys) =>
  properties.find(({ value }) =>
    keys.every(key => value.toString(2)[key] === '1'),
  );

export const isUserAdmin = properties =>
  !!findPropertyByKeys(properties, [COMMUNITY_ADMIN_KEY]);
