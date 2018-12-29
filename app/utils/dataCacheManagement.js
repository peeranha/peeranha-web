import { TAGS_COMMUNITIES_TABLE, ALL_COMMUNITIES_SCOPE } from './constants';

/* eslint-disable */
export function getTagScope(communityId) {
  const charmap = '.12345abcdefghijklmnopqrstuvwxyz';
  const mask = BigInt('0xF800000000000000');
  const mask64 = BigInt('0xFFFFFFFFFFFFFFFF');

  const zero = BigInt(0);
  const five = BigInt(5);

  let v = BigInt('3774731489195851776') + BigInt(communityId);
  let ret = '';

  for (let i = 0; i < 13; i++) {
    v &= mask64;
    if (v == zero) break;
    const indx = (v & mask) >> BigInt(i == 12 ? 60 : 59);
    ret += charmap[indx];
    v <<= five;
  }

  return ret;
}
/* eslint-enable */

/* eslint no-param-reassign: 0 */
export async function getAllCommunities(eosService) {
  const communities = await eosService.getTableRows(
    TAGS_COMMUNITIES_TABLE,
    ALL_COMMUNITIES_SCOPE,
    0,
  );

  await Promise.all(
    communities.map(async x => {
      x.label = x.name;
      x.value = x.id;

      x.tags = await eosService.getTableRows(
        TAGS_COMMUNITIES_TABLE,
        getTagScope(x.id),
        0,
      );

      x.tags.forEach(y => {
        y.label = y.name;
        y.value = y.id;
      });
    }),
  );

  return communities;
}
