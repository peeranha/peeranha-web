import { GLOBAL_STAT_TABLE, ALL_STAT_SCOPE } from './constants';

export async function getStat(eosService) {
  const stat = await eosService.getTableRow(GLOBAL_STAT_TABLE, ALL_STAT_SCOPE);

  return stat;
}
