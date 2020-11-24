export const uniqueAchievementsArr = [
  /**
   * FOUNDING_MEMBER does not depends on rating.
   * This is mock values.
   * This approach allows to cover first rating zone
   *  and
   * to avoid unnecessary elements filtering in achievements selectors
   */

  {
    id: 30,
    title: 'FOUNDING_MEMBER',
    lowerValue: -Infinity,
    upperValue: 99,
    limit: 10000,
  },
  {
    id: 31,
    title: 'ACTIVIST',
    lowerValue: 100,
    upperValue: 499,
    limit: process.env.ENV === 'prod' ? 700 : 5,
  },
  {
    id: 32,
    title: 'RESEARCHER',
    lowerValue: 500,
    upperValue: 999,
    limit: process.env.ENV === 'prod' ? 500 : 5,
  },
  {
    id: 33,
    title: 'HONORABLE_RESIDENT',
    lowerValue: 1000,
    upperValue: 2499,
    limit: process.env.ENV === 'prod' ? 300 : 5,
  },
  {
    id: 34,
    title: 'THE_WISEST',
    lowerValue: 2500,
    upperValue: 4999,
    limit: process.env.ENV === 'prod' ? 150 : 5,
  },
  {
    id: 35,
    title: 'MODERN_HERO',
    lowerValue: 5000,
    upperValue: 9999,
    limit: process.env.ENV === 'prod' ? 50 : 5,
  },
  {
    id: 36,
    title: 'KING_OF_THE_HILL',
    lowerValue: 10000,
    upperValue: Infinity,
    limit: 10,
  },
];

export const achievementsArr = [
  /**
   * WELCOME_STRANGER does not depends on rating.
   * This is mock values.
   * This approach allows to cover first rating zone
   *  and
   * to avoid unnecessary elements filtering in achievements selectors
   */

  {
    id: 40,
    title: 'WELCOME_STRANGER',
    lowerValue: -Infinity,
    upperValue: 99,
  },
  { id: 41, title: 'NEWBIE', lowerValue: 100, upperValue: 499 },
  { id: 42, title: 'JUNIOR', lowerValue: 500, upperValue: 999 },
  { id: 43, title: 'RESIDENT', lowerValue: 1000, upperValue: 2499 },
  { id: 44, title: 'SENIOR', lowerValue: 2500, upperValue: 4999 },
  { id: 45, title: 'HERO', lowerValue: 5000, upperValue: 9999 },
  {
    id: 46,
    title: 'SUPERHERO',
    lowerValue: 10000,
    upperValue: Infinity,
  },
];

export const questionsAskedArr = [
  {
    id: 1,
    title: 'QUESTIONS_ASKED_BRONZE',
    lowerValue: process.env.ENV === 'prod' ? 10 : 2,
    upperValue: process.env.ENV === 'prod' ? 49 : 4,
    level: 'bronze',
  },
  {
    id: 2,
    title: 'QUESTIONS_ASKED_SILVER',
    lowerValue: process.env.ENV === 'prod' ? 50 : 5,
    upperValue: process.env.ENV === 'prod' ? 99 : 9,
    level: 'silver',
  },
  {
    id: 3,
    title: 'QUESTIONS_ASKED_GOLD',
    lowerValue: process.env.ENV === 'prod' ? 100 : 10,
    upperValue: Infinity,
    level: 'gold',
  },
];

export const answerGivenArr = [
  {
    id: 10,
    title: 'ANSWERS_GIVEN_BRONZE',
    lowerValue: process.env.ENV === 'prod' ? 20 : 2,
    upperValue: process.env.ENV === 'prod' ? 99 : 4,
    level: 'bronze',
  },
  {
    id: 11,
    title: 'ANSWERS_GIVEN_SILVER',
    lowerValue: process.env.ENV === 'prod' ? 100 : 5,
    upperValue: process.env.ENV === 'prod' ? 199 : 9,
    level: 'silver',
  },
  {
    id: 12,
    title: 'ANSWERS_GIVEN_GOLD',
    lowerValue: process.env.ENV === 'prod' ? 200 : 10,
    upperValue: Infinity,
    level: 'gold',
  },
];

export const bestAnswerArr = [
  {
    id: 20,
    title: 'BEST_ANSWERS_BRONZE',
    lowerValue: process.env.ENV === 'prod' ? 5 : 1,
    upperValue: process.env.ENV === 'prod' ? 24 : 2,
    level: 'bronze',
  },
  {
    id: 21,
    title: 'BEST_ANSWERS_SILVER',
    lowerValue: process.env.ENV === 'prod' ? 25 : 3,
    upperValue: process.env.ENV === 'prod' ? 49 : 4,
    level: 'silver',
  },
  {
    id: 22,
    title: 'BEST_ANSWERS_GOLD',
    lowerValue: process.env.ENV === 'prod' ? 50 : 5,
    upperValue: Infinity,
    level: 'gold',
  },
];

export const firstIn15Arr = [
  {
    id: 50,
    title: 'ANSWERS_IN_15_BRONZE',
    lowerValue: process.env.ENV === 'prod' ? 5 : 1,
    upperValue: process.env.ENV === 'prod' ? 9 : 2,
    level: 'bronze',
  },
  {
    id: 51,
    title: 'ANSWERS_IN_15_SILVER',
    lowerValue: process.env.ENV === 'prod' ? 10 : 3,
    upperValue: process.env.ENV === 'prod' ? 19 : 4,
    level: 'silver',
  },
  {
    id: 52,
    title: 'ANSWERS_IN_15_GOLD',
    lowerValue: process.env.ENV === 'prod' ? 20 : 5,
    upperValue: Infinity,
    level: 'gold',
  },
];

export const firstAnswerArr = [
  {
    id: 60,
    title: 'FIRST_ANSWERS_BRONZE',
    lowerValue: process.env.ENV === 'prod' ? 10 : 1,
    upperValue: process.env.ENV === 'prod' ? 24 : 2,
    level: 'bronze',
  },
  {
    id: 61,
    title: 'FIRST_ANSWERS_SILVER',
    lowerValue: process.env.ENV === 'prod' ? 25 : 3,
    upperValue: process.env.ENV === 'prod' ? 49 : 4,
    level: 'silver',
  },
  {
    id: 62,
    title: 'FIRST_ANSWERS_GOLD',
    lowerValue: process.env.ENV === 'prod' ? 50 : 5,
    upperValue: Infinity,
    level: 'gold',
  },
];

// achievements groups

export const ratingRelated = 'ratingRelated';
export const uniqueRatingRelated = 'uniqueRatingRelated';
export const questionAskedRelated = 'questionAskedRelated';
export const answerGivenRelated = 'answerGivenRelated';
export const bestAnswerRelated = 'bestAnswerRelated';
export const firstAnswerIn15Related = 'firstAnswerIn15Related';
export const firstAnswerRelated = 'firstAnswerRelated';

// action types

const GET_USER_ACHIEVEMENTS = 'containers/Achievements/GET_USER_ACHIEVEMENTS';
const GET_USER_ACHIEVEMENTS_ERROR =
  'containers/Achievements/GET_USER_ACHIEVEMENTS_ERROR';
const GET_USER_ACHIEVEMENTS_SUCCESS =
  'containers/Achievements/GET_USER_ACHIEVEMENTS_SUCCESS';
const SET_VIEW_PROFILE_ACCOUNT =
  'containers/Achievements/SET_VIEW_PROFILE_ACCOUNT';
const RESET_VIEW_PROFILE_ACCOUNT =
  'containers/Achievements/RESET_VIEW_PROFILE_ACCOUNT';
const USER_ACHIEVEMENTS_LOADING =
  'containers/Achievements/USER_ACHIEVEMENTS_LOADING';
const SET_MEMORIZED_ACHIEV_DATA =
  'containers/Achievements/SET_MEMORIZED_ACHIEV_DATA';
const SET_MAX_GROUPS_LOWER_VALUES =
  'containers/Achievements/SET_MAX_GROUPS_LOWER_VALUES';

export {
  GET_USER_ACHIEVEMENTS,
  GET_USER_ACHIEVEMENTS_ERROR,
  GET_USER_ACHIEVEMENTS_SUCCESS,
  SET_VIEW_PROFILE_ACCOUNT,
  RESET_VIEW_PROFILE_ACCOUNT,
  USER_ACHIEVEMENTS_LOADING,
  SET_MEMORIZED_ACHIEV_DATA,
  SET_MAX_GROUPS_LOWER_VALUES,
};
