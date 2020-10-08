export const achievementsArr = [
  { id: 4, title: 'FIRST_10K_REGISTERED' },
  { id: 5, title: 'STRANGER' },
  { id: 6, title: 'NEWBIE' },
  { id: 7, title: 'JUNIOR' },
  { id: 8, title: 'RESIDENT' },
  { id: 9, title: 'SENIOR' },
  { id: 10, title: 'HERO' },
  { id: 11, title: 'SUPERHERO' },
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
const GET_USER_ACHIEVEMENTS_ERROR =
  'containers/Achievements/GET_USER_ACHIEVEMENTS_ERROR';
const GET_USER_ACHIEVEMENTS_SUCCESS =
  'containers/Achievements/GET_USER_ACHIEVEMENTS_SUCCESS';
const SET_CURRENT_ACCOUNT = 'containers/Achievements/SET_CURRENT_ACCOUNT';
const USER_ACHIEVEMENTS_LOADING =
  'containers/Achievements/USER_ACHIEVEMENTS_LOADING';

export {
  GET_USER_ACHIEVEMENTS,
  GET_USER_ACHIEVEMENTS_ERROR,
  GET_USER_ACHIEVEMENTS_SUCCESS,
  SET_CURRENT_ACCOUNT,
  USER_ACHIEVEMENTS_LOADING,
};
