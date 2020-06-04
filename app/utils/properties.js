import {
  COMMUNITY_ADMIN_KEY,
  COMMUNITY_OFFICIAL_REPRESENTATIVE_KEY,
} from './constants';

const findPropertyByKeys = (properties, keys) =>
  properties.find(({ value }) =>
    keys.every(
      key => value.toString(2)[value.toString(2).length - key] === '1',
    ),
  );

export const isUserAdmin = properties =>
  !!findPropertyByKeys(properties, [COMMUNITY_ADMIN_KEY]);

export const findOfficialRepresentativeProperty = properties =>
  findPropertyByKeys(properties, COMMUNITY_OFFICIAL_REPRESENTATIVE_KEY);

export const isOfficialRepresentative = properties =>
  !!findOfficialRepresentativeProperty(properties);

export const isAnswerOfficial = ({ id, properties }) =>
  !!id &&
  !!properties
    .map(({ key, value }) =>
      isOfficialRepresentative([{ key: value, value: key }]),
    )
    .filter(x => x).length;

export const officialAnswersCount = questionData =>
  questionData.answers.filter(answer => isAnswerOfficial(answer)).length;
