import { COMMUNITY_ADMIN_KEY, OFFICIAL_ANSWER_KEYS } from './constants';

const findAllPropertiesByKeys = (properties, keys) =>
  properties.filter(({ value }) =>
    keys.every(
      key => value.toString(2)[value.toString(2).length - key] === '1',
    ),
  );

export const isUserTopCommunityQuestionsModerator = (
  properties = [],
  communityId,
) =>
  !!findAllPropertiesByKeys(properties, [COMMUNITY_ADMIN_KEY]).filter(
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

export const isUserOfficialCommunityRepresentative = (
  properties = [],
  communityId,
) =>
  !!findAllPropertiesByKeys(properties, OFFICIAL_ANSWER_KEYS).filter(
    ({ community }) => communityId === community,
  ).length;
