import { BigNumber } from 'ethers';
import {
  COMMUNITY_ADMIN_ROLE,
  COMMUNITY_MODERATOR_ROLE,
  DEFAULT_ADMIN_ROLE,
  PROTOCOL_ADMIN_ROLE,
} from 'utils/constants';
import { getActualId, getCommunityRole, getNetwork } from 'utils/properties';
import { isSuiBlockchain } from './sui/sui';

export const NEVER_EXPIRES = 'Tue, 19 Jan 2038 01:14:07 GMT';
export const DEFAULT_PATH = '/';
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

export const formPermissionsCookie = (permissions) => {
  if (!permissions) {
    return {};
  }
  const basePermissions = permissions.filter((permission) =>
    isSuiBlockchain
      ? permission.split('-')[1] === PROTOCOL_ADMIN_ROLE
      : BigNumber.from(permission.split('-')[1]).eq(PROTOCOL_ADMIN_ROLE) ||
        BigNumber.from(permission.split('-')[1]).eq(DEFAULT_ADMIN_ROLE),
  );
  const permissionsObject = {
    base: basePermissions,
  };

  const communitiesWhereAdmin = permissions.reduce((ids, permission) => {
    const chainId = permission.split('-')[0];
    const actualPermission = permission.split('-')[1];
    if (isSuiBlockchain) {
      if (actualPermission.substring(0, 2) === COMMUNITY_ADMIN_ROLE) {
        const communityId = actualPermission.substring(2);
        return [...ids, `${chainId}-${communityId}`];
      }
    } else if (permission.includes(COMMUNITY_ADMIN_ROLE.slice(0, 63))) {
      const communityId = BigNumber.from(actualPermission)
        .sub(BigNumber.from(COMMUNITY_ADMIN_ROLE))
        .toNumber();
      return [...ids, `${chainId}-${communityId}`];
    }
    return ids;
  }, []);

  const communitiesWhereModerator = permissions.reduce((ids, permission) => {
    const chainId = permission.split('-')[0];
    const actualPermission = permission.split('-')[1];
    if (isSuiBlockchain) {
      if (actualPermission.substring(0, 2) === COMMUNITY_MODERATOR_ROLE) {
        const communityId = actualPermission.substring(2);
        return [...ids, `${chainId}-0x${communityId}`];
      }
    } else if (actualPermission.includes(COMMUNITY_MODERATOR_ROLE.slice(0, 63))) {
      const communityId = BigNumber.from(actualPermission)
        .sub(BigNumber.from(COMMUNITY_MODERATOR_ROLE))
        .toNumber();
      return [...ids, `${chainId}-${communityId}`];
    }

    return ids;
  }, []);

  if (communitiesWhereAdmin?.length) {
    permissionsObject['0a7c'] = communitiesWhereAdmin;
  }

  if (communitiesWhereModerator?.length) {
    permissionsObject.ca6 = communitiesWhereModerator;
  }

  return permissionsObject;
};

export const parsePermissionsCookie = (permissionsObject) => {
  const permissions = permissionsObject.base || [];
  const adminPermissions =
    permissionsObject['0a7c']?.map((communityId) =>
      getCommunityRole(COMMUNITY_ADMIN_ROLE, getActualId(communityId), getNetwork(communityId)),
    ) || [];
  const moderatorPermissions =
    permissionsObject.ca6?.map((communityId) =>
      getCommunityRole(COMMUNITY_MODERATOR_ROLE, getActualId(communityId), getNetwork(communityId)),
    ) || [];
  return [...permissions, ...adminPermissions, ...moderatorPermissions];
};
