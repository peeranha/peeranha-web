export const possibleAchievements = [
  { id: 1, title: 'QUESTION_ASKED' },
  { id: 2, title: 'ANSWER_GIVEN' },
  { id: 3, title: 'CORRECT_ANSWER' },
  { id: 4, title: 'FIRST_10K_REGISTERED' },
  { id: 5, title: 'STRANGER' },
  { id: 6, title: 'NEWBIE' },
  { id: 7, title: 'JUNIOR' },
  { id: 8, title: 'RESIDENT' },
  { id: 9, title: 'SENIOR' },
  { id: 10, title: 'HERO' },
  { id: 11, title: 'SUPERHERO' },
];

const GET_USER_ACHIEVEMENTS =
  'containers/AchievementsList/GET_USER_ACHIEVEMENTS';
const GET_USER_ACHIEVEMENTS_ERROR =
  'containers/AchievementsList/GET_USER_ACHIEVEMENTS_ERROR';
const GET_USER_ACHIEVEMENTS_SUCCESS =
  'containers/AchievementsList/GET_USER_ACHIEVEMENTS_SUCCESS';

export {
  GET_USER_ACHIEVEMENTS,
  GET_USER_ACHIEVEMENTS_ERROR,
  GET_USER_ACHIEVEMENTS_SUCCESS,
};
