import _max from 'lodash/max';

import messages from 'common-messages';

import {
  COMMUNITY_ADMIN_INFINITE_IMPACT,
  COMMUNITY_ADMIN_OFFICIAL_ANSWER,
  COMMUNITY_ADMIN_QUESTION_TYPE,
  COMMUNITY_ADMIN_TOP_QUESTIONS,
  COMMUNITY_ADMIN_CREATE_TAG,
  MODERATOR_CREATE_COMMUNITY,
  OFFICIAL_ANSWER_KEYS,
  PERMISSION_GRANTED,
  COMMUNITY_ADMIN_VALUE,
  moderatorPermissions,
  communityAdminPermissions,
  PROPERTY_ANSWER_15_MINUTES,
  PROPERTY_FIRST_ANSWER,
  MODERATOR_KEY,
  COMMUNITY_ADMIN_ROLE,
  DEFAULT_ADMIN_ROLE,
  COMMUNITY_MODERATOR_ROLE,
  globalAdminPermissions,
  communityModeratorPermissions,
} from './constants';
import { BigNumber } from 'ethers';

//todo change to "findRole"
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
          : translations[messages.globalModerator.id],
        sectionCode: index,
        communityId: communityId,
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

export const isAnswerOfficial = ({ id, properties }) =>
  !!id &&
  !!properties.filter(
    ({ key, value }) =>
      !!findAllPropertiesByKeys(
        [{ key: value, value: key }],
        OFFICIAL_ANSWER_KEYS,
        true,
      ).length,
  ).length;

export const officialAnswersCount = questionData =>
  questionData.answers.filter(answer => isAnswerOfficial(answer)).length;

export const communityAdminOfficialAnswerPermission = (
  properties = [],
  communityId,
) =>
  !!findAllPropertiesByKeys(properties, [
    COMMUNITY_ADMIN_OFFICIAL_ANSWER,
  ]).filter(({ community }) => communityId === community).length;

export const communityAdminQuestionTypePermission = (properties, communityId) =>
  !!findAllPropertiesByKeys(properties, [COMMUNITY_ADMIN_QUESTION_TYPE]).filter(
    ({ community }) => communityId === community,
  ).length;

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

export const getPermissions = profile => {
  return profile?.permissions ?? [];
};

export const hasGlobalModeratorRole = permissions => {
  return !!permissions.find(permission =>
    BigNumber.from(permission).eq(DEFAULT_ADMIN_ROLE),
  );
};

export const getCommunityRole = (role, communityId) => {
  return BigNumber.from(role)
    .add(BigNumber.from(communityId))
    .toHexString();
};

export const getAllRoles = (userRoles, communitiesCount) => {
  const communityRoles = [COMMUNITY_MODERATOR_ROLE, COMMUNITY_ADMIN_ROLE];
  return userRoles.map(userRole => {
    let communityId;
    let role;
    if (BigNumber.from(userRole).eq(DEFAULT_ADMIN_ROLE)) {
      role = userRole;
      return {
        role,
      };
    }
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

export const hasCommunityAdminRole = (permissions = [], communityId) => {
  return !!permissions.filter(
    permission =>
      permission === getCommunityRole(COMMUNITY_ADMIN_ROLE, communityId),
  ).length;
};

export const hasCommunityModeratorRole = (permissions = [], communityId) => {
  return !!permissions.filter(
    permission =>
      permission === getCommunityRole(COMMUNITY_MODERATOR_ROLE, communityId),
  ).length;
};
