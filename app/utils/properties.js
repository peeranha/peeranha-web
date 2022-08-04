import { BigNumber } from 'ethers';
import { selectEthereum } from 'containers/EthereumProvider/selectors';
import { getCookie } from 'utils/cookie';
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
} from './constants';

// todo change to "findRole"
const findAllPropertiesByKeys = (properties, keys, exact = false) => [];

export const getModeratorPermissions = (
  globalModeratorProps,
  communitiesCount,
  communities,
  translations,
) => {
  const values = getAllRoles(globalModeratorProps, communitiesCount);
  const permissions1 = [];
  values.map(({ communityId = 0, role }, index) => {
    const rawPermissionsTypes = !communityId
      ? globalAdminPermissions
      : role === COMMUNITY_ADMIN_ROLE
        ? communityAdminPermissions
        : communityModeratorPermissions;
    const permissionsTypes = Object.entries(rawPermissionsTypes).map(
      ([key, permValue]) => ({
        permissionCode: rawPermissionsTypes[key].code,
        title: permValue.title,
      }),
    );
    if (permissions1[communityId]) {
      permissions1[communityId].blocks = permissions1[
        communityId
      ].blocks.concat(permissionsTypes);
      permissions1[communityId].permission.push(role);
    } else {
      permissions1[communityId] = {
        blocks: permissionsTypes,
        permission: [role],
        h2: communityId
          ? communities.find(({ id }) => Number(id) === Number(communityId))
              ?.name || 'TestComm1'
          : translations('common.globalModerator'),
        sectionCode: index,
        communityId,
      };
    }
  });
  return permissions1;
};

export const isUserTopCommunityQuestionsModerator = (
  properties = [],
  communityId,
) =>
  !!findAllPropertiesByKeys(properties, [COMMUNITY_ADMIN_TOP_QUESTIONS]).filter(
    ({ community }) => communityId === community,
  ).length;

export const isAnswerOfficial = ({ isOfficialReply }) => !!isOfficialReply;

export const officialAnswersCount = questionData =>
  questionData.answers.filter(answer => isAnswerOfficial(answer)).length;

export const communityAdminOfficialAnswerPermission = (
  properties = [],
  communityId,
) =>
  !!findAllPropertiesByKeys(properties, [
    COMMUNITY_ADMIN_OFFICIAL_ANSWER,
  ]).filter(({ community }) => communityId === community).length;

export const communityAdminCreateTagPermission = (
  properties = [],
  communityId,
) =>
  !!findAllPropertiesByKeys(properties, [COMMUNITY_ADMIN_CREATE_TAG]).filter(
    ({ community }) => communityId === community,
  ).length;

export const communityAdminInfiniteImpactPermission = (
  properties,
  communityId,
) =>
  !!findAllPropertiesByKeys(properties, [
    COMMUNITY_ADMIN_INFINITE_IMPACT,
  ]).filter(({ community }) => communityId === community).length;

export const getPermissions = profile => profile?.permissions ?? [];

export const hasGlobalModeratorRole = permissionsFromState => {
  let permissions = permissionsFromState;

  if (!permissions) {
    permissions =
      JSON.parse(getCookie('profileinfols') || '""')?.permissions || [];
  }

  return Boolean(
    permissions.find(permission =>
      BigNumber.from(permission).eq(DEFAULT_ADMIN_ROLE),
    ),
  );
};

export const getCommunityRole = (role, communityId) =>
  BigNumber.from(role)
    .add(BigNumber.from(communityId))
    .toHexString();

export const isTemporaryAccount = async account => {
  const ethereumService = await selectEthereum();
  return ethereumService.getSelectedAccount() === account;
};

export const getAllRoles = (userRoles = [], communitiesCount) => {
  const communityRoles = [COMMUNITY_MODERATOR_ROLE, COMMUNITY_ADMIN_ROLE];
  if (userRoles.find(role => BigNumber.from(role).eq(DEFAULT_ADMIN_ROLE))) {
    return [{ DEFAULT_ADMIN_ROLE }];
  }
  return userRoles.map(userRole => {
    let communityId;
    let role;
    communityRoles.map(communityRole => {
      const id = BigNumber.from(userRole)
        .sub(BigNumber.from(communityRole))
        .toString();
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

export const hasCommunityAdminRole = (permissions = [], communityId) =>
  !!permissions.filter(
    permission =>
      permission === getCommunityRole(COMMUNITY_ADMIN_ROLE, communityId),
  ).length;

export const hasCommunityModeratorRole = (permissions = [], communityId) =>
  !!permissions.filter(
    permission =>
      permission === getCommunityRole(COMMUNITY_MODERATOR_ROLE, communityId),
  ).length;
