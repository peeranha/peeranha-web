import { PROFILE_INFO_LS } from 'containers/Login/constants';
import { BigNumber } from 'ethers';
import { selectEthereum } from 'containers/EthereumProvider/selectors';
import { getCookie, deleteCookie, parsePermissionsCookie } from 'utils/cookie';
import { isSuiBlockchain } from 'utils/sui/sui';
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
  BOT_ADDRESS,
} from './constants';

// todo change to "findRole"
const findAllPropertiesByKeys = (properties, keys, exact = false) => [];

export const getActualId = (idWithNetwork) => idWithNetwork.split('-')[1];
export const getNetwork = (idWithNetwork) => idWithNetwork.split('-')[0] - 1;

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
    ? `${communities.find(({ id }) => id === communityId)?.name || 'TestComm1'} ${translations(
        'moderation.community',
      )}`
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

//TODO fix
export const isMatchingBasePermission = (permission, role) =>
  isSuiBlockchain ? permission === role : BigNumber.from(permission).eq(role);

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
  isSuiBlockchain
    ? true
    : !!findAllPropertiesByKeys(properties, [COMMUNITY_ADMIN_CREATE_TAG]).filter(
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
    permissions.find((permission) =>
      BigNumber.from(permission.split('-')[1]).eq(DEFAULT_ADMIN_ROLE),
    ),
  );
};

export const getCommunityRole = (role, communityId) => {
  if (isSuiBlockchain) {
    return `${role}${String(communityId).replace('0x', '')}`;
  }
  return BigNumber.from(role).add(BigNumber.from(communityId)).toHexString();
};

export const getCommunityIdFromPermission = (permission, role) => {
  if (isSuiBlockchain) {
    return `0x${permission.substring(role.length)}`;
  }
  return BigNumber.from(permission).sub(BigNumber.from(role)).toNumber();
};

export const isBotAddress = (account) => account.id === BOT_ADDRESS;

export const getAllRoles = (userRoles = [], communitiesCount) => {
  const communityRoles = [COMMUNITY_MODERATOR_ROLE, COMMUNITY_ADMIN_ROLE];
  const defaultAdminRole = userRoles.find((role) =>
    BigNumber.from(role.split('-')[1]).eq(DEFAULT_ADMIN_ROLE),
  );
  if (defaultAdminRole) {
    return [{ role: defaultAdminRole }];
  }
  const protocolAdminRole = userRoles.find((role) =>
    BigNumber.from(role.split('-')[1]).eq(DEFAULT_ADMIN_ROLE),
  );
  if (protocolAdminRole) {
    return [{ role: protocolAdminRole }];
  }
  return userRoles.map((userRole) => {
    let communityId;
    let role;
    communityRoles.map((communityRole) => {
      const id = BigNumber.from(userRole.split('-')[1])
        .sub(BigNumber.from(communityRole))
        .toString();
      if (
        id.length <= communitiesCount.toString().length &&
        Number.parseInt(id) >= 1 &&
        Number.parseInt(id) <= communitiesCount
      ) {
        communityId = `${userRole.split('-')[0]}-${id}`;
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
    (permission) => permission === getCommunityRole(COMMUNITY_ADMIN_ROLE, getActualId(communityId)),
  ).length;
};

export const hasCommunityModeratorRole = (permissions = [], communityId) =>
  !!permissions.filter((permission) => {
    const networkFromPermission = permission.split('-')[0];
    const networkFromCommunityId = communityId.split('-')[0];
    const actualPermission = permission.split('-')[1];
    const actualCommunityId = communityId.split('-')[1];

    return (
      actualPermission === getCommunityRole(COMMUNITY_MODERATOR_ROLE, actualCommunityId) &&
      networkFromPermission === networkFromCommunityId
    );
  }).length;

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
    permissions.find((permission) =>
      BigNumber.from(permission.split('-')[1]).eq(PROTOCOL_ADMIN_ROLE),
    ),
  );
};

export const getCommunityRoles = (communityId) => {
  const moderatorRole = getCommunityRole(COMMUNITY_MODERATOR_ROLE, communityId);
  const adminRole = getCommunityRole(COMMUNITY_ADMIN_ROLE, communityId);
  return [adminRole, moderatorRole];
};
