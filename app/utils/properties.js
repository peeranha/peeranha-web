import {
  COMMUNITY_ADMIN_INFINITE_IMPACT,
  COMMUNITY_ADMIN_OFFICIAL_ANSWER,
  COMMUNITY_ADMIN_QUESTION_TYPE,
  COMMUNITY_ADMIN_TOP_QUESTIONS,
  OFFICIAL_ANSWER_KEYS,
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
