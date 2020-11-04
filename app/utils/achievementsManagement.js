import { USER_ACHIEVEMENTS_TABLE } from './constants';

export async function getUserAchievementsCount(user, eosService) {
  const tableTitle = USER_ACHIEVEMENTS_TABLE;
  const scope = user;
  const selectFromId = 0;
  const limit = 100;

  const userAchievements = await eosService.getTableRows(
    tableTitle,
    scope,
    selectFromId,
    limit,
  );

  const achievementsCount =
    typeof userAchievements?.rows.length === 'number'
      ? userAchievements.rows.length
      : 0;

  return achievementsCount;
}
