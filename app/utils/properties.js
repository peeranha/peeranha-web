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
} from './constants';

const findAllPropertiesByKeys = (properties, keys, exact = false) =>
  properties.filter(({ value }) => {
    const restKeys = Array.from(new Array(_max(keys)).keys()).filter(
      x => !keys.includes(x),
    );

    const match = keys.every(
      key =>
        value
          .toString(2)
          .split('')
          .reverse()
          .join('')[key] === '1',
    );

    const restMatch =
      exact &&
      restKeys.every(
        key =>
          value
            .toString(2)
            .split('')
            .reverse()
            .join('')[key] === '0',
      );

    return exact ? match && restMatch : match;
  });

export const getModeratorPermissions = (
  communityPermissions = [],
  globalModeratorProps,
  isGlobal,
  communities,
  translations,
) => {
  const values = isGlobal
    ? [globalModeratorProps, ...communityPermissions]
    : communityPermissions;
  const permissions = {};
  permissions.blocks = values.reduce((acc, { community, value }, index) => {
    const permission = [];
    const perms = community ? communityAdminPermissions : moderatorPermissions;
    value
      .toString(2)
      .split('')
      .reverse()
      .forEach((perm, permIndex) => {
        if (perm === PERMISSION_GRANTED) permission.push(permIndex);
      });
    return [
      ...acc,
      {
        h2: community
          ? communities.find(({ id }) => id === community).name
          : translations[messages.globalModerator.id],
        sectionCode: index,
        blocks: Object.entries(perms).map(([key, permValue]) => ({
          permissionCode: perms[key].code,
          title: permValue.title,
        })),
        permission,
      },
    ];
  }, []);
  return permissions;
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

export const communityModeratorCreatePermission = properties =>
  !!findAllPropertiesByKeys(properties, [MODERATOR_CREATE_COMMUNITY]).length;

export const getPermissions = profile => profile?.permissions ?? [];

export const hasCommunityAdminPermissions = (properties = [], communityId) =>
  !!properties.filter(
    permission =>
      permission.value === COMMUNITY_ADMIN_VALUE &&
      permission.community === communityId,
  ).length;
