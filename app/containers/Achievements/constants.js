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
    nextId: 31,
    limit: 10000,
  },
  {
    id: 31,
    title: 'ACTIVIST',
    lowerValue: 100,
    upperValue: 499,
    nextId: 32,
    limit: process.env.ENV === 'prod' ? 700 : 5,
  },
  {
    id: 32,
    title: 'RESEARCHER',
    lowerValue: 500,
    upperValue: 999,
    nextId: 33,
    limit: process.env.ENV === 'prod' ? 500 : 5,
  },
  {
    id: 33,
    title: 'HONORABLE_RESIDENT',
    lowerValue: 1000,
    upperValue: 2499,
    nextId: 34,
    limit: process.env.ENV === 'prod' ? 300 : 5,
  },
  {
    id: 34,
    title: 'THE_WISEST',
    lowerValue: 2500,
    upperValue: 4999,
    nextId: 35,
    limit: process.env.ENV === 'prod' ? 150 : 5,
  },
  {
    id: 35,
    title: 'MODERN_HERO',
    lowerValue: 5000,
    upperValue: 9999,
    nextId: 36,
    limit: process.env.ENV === 'prod' ? 50 : 5,
  },
  {
    id: 36,
    title: 'KING_OF_THE_HILL',
    lowerValue: 10000,
    upperValue: Infinity,
    nextId: null,
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
    nextId: 41,
  },
  { id: 41, title: 'NEWBIE', lowerValue: 100, upperValue: 499, nextId: 42 },
  { id: 42, title: 'JUNIOR', lowerValue: 500, upperValue: 999, nextId: 43 },
  { id: 43, title: 'RESIDENT', lowerValue: 1000, upperValue: 2499, nextId: 44 },
  { id: 44, title: 'SENIOR', lowerValue: 2500, upperValue: 4999, nextId: 45 },
  { id: 45, title: 'HERO', lowerValue: 5000, upperValue: 9999, nextId: 46 },
  {
    id: 46,
    title: 'SUPERHERO',
    lowerValue: 10000,
    upperValue: Infinity,
    nextId: null,
  },
];

export const questionsAskedArr = [
  {
    id: 1,
    title: 'QUESTION_ASKED_BRONZE',
    lowerValue: process.env.ENV === 'prod' ? 10 : 2,
    upperValue: process.env.ENV === 'prod' ? 49 : 4,
    nextId: 2,
  },
  {
    id: 2,
    title: 'QUESTION_ASKED_SILVER',
    lowerValue: process.env.ENV === 'prod' ? 50 : 5,
    upperValue: process.env.ENV === 'prod' ? 99 : 9,
    nextId: 3,
  },
  {
    id: 3,
    title: 'QUESTION_ASKED_GOLD',
    lowerValue: process.env.ENV === 'prod' ? 100 : 10,
    upperValue: Infinity,
    nextId: null,
  },
];

export const answerGivenArr = [
  {
    id: 10,
    title: 'ANSWER_GIVEN_BRONZE',
    lowerValue: process.env.ENV === 'prod' ? 10 : 2,
    upperValue: process.env.ENV === 'prod' ? 49 : 4,
    nextId: 11,
  },
  {
    id: 11,
    title: 'ANSWER_GIVEN_SILVER',
    lowerValue: process.env.ENV === 'prod' ? 50 : 5,
    upperValue: process.env.ENV === 'prod' ? 99 : 9,
    nextId: 12,
  },
  {
    id: 12,
    title: 'ANSWER_GIVEN_GOLD',
    lowerValue: process.env.ENV === 'prod' ? 100 : 10,
    upperValue: Infinity,
    nextId: null,
  },
];

export const bestAnswerArr = [
  {
    id: 20,
    title: 'BEST_ANSWER_BRONZE',
    lowerValue: process.env.ENV === 'prod' ? 5 : 1,
    upperValue: process.env.ENV === 'prod' ? 24 : 2,
    nextId: 21,
  },
  {
    id: 21,
    title: 'BEST_ANSWER_SILVER',
    lowerValue: process.env.ENV === 'prod' ? 25 : 3,
    upperValue: process.env.ENV === 'prod' ? 49 : 4,
    nextId: 22,
  },
  {
    id: 22,
    title: 'BEST_ANSWER_GOLD',
    lowerValue: process.env.ENV === 'prod' ? 50 : 5,
    upperValue: Infinity,
    nextId: null,
  },
];

export const firstIn15Arr = [
  {
    id: 50,
    title: 'FIRST_ANSWER_IN_15_BRONZE',
    lowerValue: process.env.ENV === 'prod' ? 5 : 1,
    upperValue: process.env.ENV === 'prod' ? 24 : 2,
    nextId: 51,
  },
  {
    id: 51,
    title: 'FIRST_ANSWER_IN_15_SILVER',
    lowerValue: process.env.ENV === 'prod' ? 25 : 3,
    upperValue: process.env.ENV === 'prod' ? 49 : 4,
    nextId: 52,
  },
  {
    id: 52,
    title: 'FIRST_ANSWER_IN_15_GOLD',
    lowerValue: process.env.ENV === 'prod' ? 50 : 5,
    upperValue: Infinity,
    nextId: null,
  },
];

export const firstAnswerArr = [
  {
    id: 60,
    title: 'FIRST_ANSWER_BRONZE',
    lowerValue: process.env.ENV === 'prod' ? 5 : 1,
    upperValue: process.env.ENV === 'prod' ? 24 : 2,
    nextId: 61,
  },
  {
    id: 61,
    title: 'FIRST_ANSWER_SILVER',
    lowerValue: process.env.ENV === 'prod' ? 25 : 3,
    upperValue: process.env.ENV === 'prod' ? 49 : 4,
    nextId: 62,
  },
  {
    id: 62,
    title: 'FIRST_ANSWER_GOLD',
    lowerValue: process.env.ENV === 'prod' ? 50 : 5,
    upperValue: Infinity,
    nextId: null,
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
const RESET_USER_ACHIEVEMENTS =
  'containers/Achievements/RESET_USER_ACHIEVEMENTS';
const GET_USER_ACHIEVEMENTS_ERROR =
  'containers/Achievements/GET_USER_ACHIEVEMENTS_ERROR';
const GET_USER_ACHIEVEMENTS_SUCCESS =
  'containers/Achievements/GET_USER_ACHIEVEMENTS_SUCCESS';
const SET_VIEW_PROFILE_ACCOUNT =
  'containers/Achievements/SET_VIEW_PROFILE_ACCOUNT';
const USER_ACHIEVEMENTS_LOADING =
  'containers/Achievements/USER_ACHIEVEMENTS_LOADING';

export {
  GET_USER_ACHIEVEMENTS,
  RESET_USER_ACHIEVEMENTS,
  GET_USER_ACHIEVEMENTS_ERROR,
  GET_USER_ACHIEVEMENTS_SUCCESS,
  SET_VIEW_PROFILE_ACCOUNT,
  USER_ACHIEVEMENTS_LOADING,
};
