export const uniqueAchievementsArr = [
  {
    id: 4,
    title: 'FIRST_10K_REGISTERED',
    minRating: 0,
    maxRating: 34,
    nextId: 5,
    limit: 10000,
  },
  {
    id: 5,
    title: 'STRANGER',
    minRating: 35,
    maxRating: 99,
    nextId: 6,
    limit: 1000,
  },
  {
    id: 6,
    title: 'NEWBIE',
    minRating: 100,
    maxRating: 949,
    nextId: 7,
    limit: process.env.ENV === 'prod' ? 700 : 5,
  },
  {
    id: 7,
    title: 'JUNIOR',
    minRating: 500,
    maxRating: 999,
    nextId: 8,
    limit: process.env.ENV === 'prod' ? 500 : 5,
  },
  {
    id: 8,
    title: 'RESIDENT',
    minRating: 1000,
    maxRating: 2499,
    nextId: 9,
    limit: process.env.ENV === 'prod' ? 300 : 5,
  },
  {
    id: 9,
    title: 'SENIOR',
    minRating: 2500,
    maxRating: 4999,
    nextId: 10,
    limit: process.env.ENV === 'prod' ? 150 : 5,
  },
  {
    id: 10,
    title: 'HERO',
    minRating: 5000,
    maxRating: 9999,
    nextId: 11,
    limit: process.env.ENV === 'prod' ? 50 : 5,
  },
  {
    id: 11,
    title: 'SUPERHERO',
    minRating: 10000,
    maxRating: Infinity,
    nextId: null,
    limit: 10,
  },
];

export const achievementsArr = [
  {
    id: 4,
    title: 'FIRST_10K_REGISTERED',
    minRating: 0,
    maxRating: 34,
    nextId: 5,
  },
  { id: 5, title: 'STRANGER', minRating: 35, maxRating: 99, nextId: 6 },
  { id: 6, title: 'NEWBIE', minRating: 100, maxRating: 949, nextId: 7 },
  { id: 7, title: 'JUNIOR', minRating: 500, maxRating: 999, nextId: 8 },
  { id: 8, title: 'RESIDENT', minRating: 1000, maxRating: 2499, nextId: 9 },
  { id: 9, title: 'SENIOR', minRating: 2500, maxRating: 4999, nextId: 10 },
  { id: 10, title: 'HERO', minRating: 5000, maxRating: 9999, nextId: 11 },
  {
    id: 11,
    title: 'SUPERHERO',
    minRating: 10000,
    maxRating: Infinity,
    nextId: null,
  },
];

export const levelAchievementsArr = [
  {
    id: 1,
    title: 'QUESTION_ASKED',
    levels:
      process.env.ENV === 'prod'
        ? { bronze: 10, silver: 50, gold: 100 }
        : { bronze: 5, silver: 10, gold: 15 },
  },
  {
    id: 2,
    title: 'ANSWER_GIVEN',
    levels:
      process.env.ENV === 'prod'
        ? { bronze: 20, silver: 100, gold: 200 }
        : { bronze: 5, silver: 10, gold: 15 },
  },
  {
    id: 3,
    title: 'CORRECT_ANSWER',
    levels:
      process.env.ENV === 'prod'
        ? { bronze: 5, silver: 25, gold: 50 }
        : { bronze: 1, silver: 3, gold: 5 },
  },
  {
    id: 12,
    title: 'ANSWER_15_MINUTES',
    levels:
      process.env.ENV === 'prod'
        ? { bronze: 5, silver: 10, gold: 20 }
        : { bronze: 1, silver: 3, gold: 5 },
  },
  {
    id: 13,
    title: 'FIRST_ANSWER',
    levels:
      process.env.ENV === 'prod'
        ? { bronze: 10, silver: 25, gold: 50 }
        : { bronze: 2, silver: 5, gold: 10 },
  },
];

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
