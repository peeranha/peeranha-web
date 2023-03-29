import { PROFILE_INFO_LS } from 'containers/Login/constants';
import { BigNumber } from 'ethers';
import { selectEthereum } from 'containers/EthereumProvider/selectors';
import { getCookie, deleteCookie, parsePermissionsCookie } from 'utils/cookie';
import {
  COMMUNITY_ADMIN_INFINITE_IMPACT,
  COMMUNITY_ADMIN_OFFICIAL_ANSWER,
  COMMUNITY_ADMIN_TOP_QUESTIONS,
  COMMUNITY_ADMIN_CREATE_TAG,
  communityAdminPermissions,
  COMMUNITY_ADMIN_ROLE,
  DEFAULT_ADMIN_ROLE,
  COMMUNITY_MODERATOR_ROLE,
  globalAdminPermissions,
  communityModeratorPermissions,
  PROTOCOL_ADMIN_ROLE,
} from './constants';

// todo change to "findRole"
const findAllPropertiesByKeys = (properties, keys, exact = false) => [];

const createPermissionsObject = ({
  role,
  translations,
  permissionsTypes,
  communityId,
  index,
  communities,
}) => ({
  blocks: permissionsTypes,
  permission: [role],
  role: !communityId
    ? role === DEFAULT_ADMIN_ROLE
      ? translations('moderation.defaultAdministrator')
      : translations('moderation.protocolAdministrator')
    : role === COMMUNITY_ADMIN_ROLE
    ? translations('moderation.communityAdministrator')
    : translations('moderation.communityModerator'),
  h2: communityId
    ? `${
        communities.find(({ id }) => Number(id) === Number(communityId))?.name || 'TestComm1'
      } ${translations('moderation.community')}`
    : role === DEFAULT_ADMIN_ROLE
    ? translations('moderation.defaultAdministrator')
    : translations('moderation.protocolAdministratorCommunities'),
  h3: !communityId
    ? role === DEFAULT_ADMIN_ROLE
      ? translations('moderation.defaultAdministrator')
      : translations('moderation.protocolAdministrator')
    : role === COMMUNITY_ADMIN_ROLE
    ? translations('moderation.communityAdministrator')
    : translations('moderation.communityModerator'),
  sectionCode: index,
  communityId,
});

export const getModeratorPermissions = (
  globalModeratorProps,
  communitiesCount,
  communities,
  translations,
) => {
  const values = getAllRoles(globalModeratorProps, communitiesCount);
  const permissions1 = {};
  values.map(({ communityId = 0, role }, index) => {
    const rawPermissionsTypes = !communityId
      ? globalAdminPermissions
      : role === COMMUNITY_ADMIN_ROLE
      ? communityAdminPermissions
      : communityModeratorPermissions;
    const permissionsTypes = Object.entries(rawPermissionsTypes).map(([key, permValue]) => ({
      permissionCode: rawPermissionsTypes[key].code,
      title: permValue.title,
    }));
    const permissionObject = createPermissionsObject({
      role,
      translations,
      permissionsTypes,
      communityId,
      communities,
      index,
    });
    if (permissions1[communityId]) {
      permissions1[communityId].push(permissionObject);
    } else {
      permissions1[communityId] = [permissionObject];
    }
  });
  return Object.values(permissions1);
};

export const isUserTopCommunityQuestionsModerator = (properties = [], communityId) =>
  !!findAllPropertiesByKeys(properties, [COMMUNITY_ADMIN_TOP_QUESTIONS]).filter(
    ({ community }) => communityId === community,
  ).length;

export const isAnswerOfficial = ({ isOfficialReply }) => !!isOfficialReply;

export const officialAnswersCount = (questionData) =>
  questionData.answers.filter((answer) => isAnswerOfficial(answer)).length;

export const communityAdminOfficialAnswerPermission = (properties = [], communityId) =>
  !!findAllPropertiesByKeys(properties, [COMMUNITY_ADMIN_OFFICIAL_ANSWER]).filter(
    ({ community }) => communityId === community,
  ).length;

export const communityAdminCreateTagPermission = (properties = [], communityId) =>
  !!findAllPropertiesByKeys(properties, [COMMUNITY_ADMIN_CREATE_TAG]).filter(
    ({ community }) => communityId === community,
  ).length;

export const communityAdminInfiniteImpactPermission = (properties, communityId) =>
  !!findAllPropertiesByKeys(properties, [COMMUNITY_ADMIN_INFINITE_IMPACT]).filter(
    ({ community }) => communityId === community,
  ).length;

export const getPermissions = (profile) => profile?.permissions ?? [];

export const isValidJsonFromCookie = (data, cookieName) => {
  try {
    JSON.parse(data, cookieName);
    return true;
  } catch (error) {
    deleteCookie(cookieName);
    return false;
  }
};

export const hasGlobalModeratorRole = (permissionsFromState) => {
  let permissions = permissionsFromState;

  if (!permissions) {
    permissions = parsePermissionsCookie(
      JSON.parse(
        isValidJsonFromCookie(getCookie(PROFILE_INFO_LS), PROFILE_INFO_LS)
          ? getCookie(PROFILE_INFO_LS)
          : '""',
      ) || [],
    );
  }

  return Boolean(
    permissions.find((permission) => BigNumber.from(permission).eq(DEFAULT_ADMIN_ROLE)),
  );
};

export const getCommunityRole = (role, communityId) =>
  BigNumber.from(role).add(BigNumber.from(communityId)).toHexString();

export const isTemporaryAccount = async (account) => {
  const ethereumService = await selectEthereum();
  return ethereumService.getSelectedAccount() === account;
};

export const getAllRoles = (userRoles = [], communitiesCount) => {
  const communityRoles = [COMMUNITY_MODERATOR_ROLE, COMMUNITY_ADMIN_ROLE];
  if (userRoles.find((role) => BigNumber.from(role).eq(DEFAULT_ADMIN_ROLE))) {
    return [{ role: DEFAULT_ADMIN_ROLE }];
  }
  if (userRoles.find((role) => BigNumber.from(role).eq(PROTOCOL_ADMIN_ROLE))) {
    return [{ role: PROTOCOL_ADMIN_ROLE }];
  }
  return userRoles.map((userRole) => {
    let communityId;
    let role;
    communityRoles.map((communityRole) => {
      const id = BigNumber.from(userRole).sub(BigNumber.from(communityRole)).toString();
      if (
        id.length <= communitiesCount.toString().length &&
        Number.parseInt(id) >= 1 &&
        Number.parseInt(id) <= communitiesCount
      ) {
        communityId = id;
        role = communityRole;
      }
    });
    return {
      communityId,
      role,
    };
  });
};

export const hasCommunityAdminRole = (permissionsFromState, communityId) => {
  let permissions = permissionsFromState;

  if (!permissions) {
    permissions = parsePermissionsCookie(
      JSON.parse(
        isValidJsonFromCookie(getCookie(PROFILE_INFO_LS), PROFILE_INFO_LS)
          ? getCookie(PROFILE_INFO_LS)
          : '""',
      ) || [],
    );
  }

  return !!permissions.filter(
    (permission) => permission === getCommunityRole(COMMUNITY_ADMIN_ROLE, communityId),
  ).length;
};

export const hasCommunityModeratorRole = (permissions = [], communityId) =>
  !!permissions.filter(
    (permission) => permission === getCommunityRole(COMMUNITY_MODERATOR_ROLE, communityId),
  ).length;

export const hasProtocolAdminRole = (permissionsFromState) => {
  let permissions = permissionsFromState;

  if (!permissions) {
    permissions = parsePermissionsCookie(
      JSON.parse(
        isValidJsonFromCookie(getCookie(PROFILE_INFO_LS), PROFILE_INFO_LS)
          ? getCookie(PROFILE_INFO_LS)
          : '""',
      ) || [],
    );
  }

  return Boolean(
    permissions.find((permission) => BigNumber.from(permission).eq(PROTOCOL_ADMIN_ROLE)),
  );
};

export const getCommunityRoles = (communityId) => {
  const moderatorRole = getCommunityRole(COMMUNITY_MODERATOR_ROLE, communityId);
  const adminRole = getCommunityRole(COMMUNITY_ADMIN_ROLE, communityId);
  return [adminRole, moderatorRole];
};
