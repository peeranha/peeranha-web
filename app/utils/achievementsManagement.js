import { USER_ACHIEVEMENTS_TABLE } from './constants';

export async function getUserAchievementsCount(user, eosService) {
  const userAchievements = await eosService.getTableRows(
    USER_ACHIEVEMENTS_TABLE,
    user,
  );
  return userAchievements?.rows.filter(el => el.value > 0).length;
}
