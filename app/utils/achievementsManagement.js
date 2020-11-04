import { USER_ACHIEVEMENTS_TABLE } from './constants';

export async function getUserAchievementsCount(user, eosService) {
  const userAchievements = await eosService.getTableRows(
    USER_ACHIEVEMENTS_TABLE,
    user,
  );

  const achievementsCount =
    typeof userAchievements?.rows.length === 'number'
      ? userAchievements?.rows.length
      : 0;

  return achievementsCount;
}
