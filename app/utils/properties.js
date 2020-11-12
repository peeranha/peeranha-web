import messages from 'common-messages';
import {
  COMMUNITY_ADMIN_INFINITE_IMPACT,
  COMMUNITY_ADMIN_OFFICIAL_ANSWER,
  COMMUNITY_ADMIN_QUESTION_TYPE,
  COMMUNITY_ADMIN_TOP_QUESTIONS,
  MODERATOR_CREATE_COMMUNITY,
  OFFICIAL_ANSWER_KEYS,
  PERMISSION_GRANTED,
  moderatorPermissions,
  communityAdminPermissions,
} from './constants';

const findAllPropertiesByKeys = (properties, keys) =>
  properties.filter(({ value }) =>
    keys.every(
      key =>
        value
          .toString(2)
          .split('')
          .reverse()
          .join('')[key] === '1',
    ),
  );

export const getModeratorPermissions = (
  communityPermissions = [],
  globalModeratorProps = [],
  isGlobal,
  communities,
  translations,
) => {
  const values = [globalModeratorProps, ...communityPermissions];
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

export const communityAdminInfiniteImpactPermission = (
  properties,
  communityId,
) =>
  !!findAllPropertiesByKeys(properties, [
    COMMUNITY_ADMIN_INFINITE_IMPACT,
  ]).filter(({ community }) => communityId === community).length;

export const communityModeratorCreatePermission = properties =>
  !!findAllPropertiesByKeys(properties, [MODERATOR_CREATE_COMMUNITY]).length;
