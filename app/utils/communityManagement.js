import { saveText, getText, getFileUrl } from './ipfs';

import {
  TAGS_COMMUNITIES_TABLE,
  ALL_COMMUNITIES_SCOPE,
  UNFOLLOW_COMM,
  FOLLOW_COMM,
  CREATE_COMMUNITY,
  CREATED_TAGS_COMMUNITIES_TABLE,
  VOTE_TO_CREATE_COMMUNITY,
  VOTE_TO_DELETE_COMMUNITY,
} from './constants';

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

export async function getSuggestedCommunities(eosService) {
  const communities = await eosService.getTableRows(
    CREATED_TAGS_COMMUNITIES_TABLE,
    ALL_COMMUNITIES_SCOPE,
    0,
  );

  await Promise.all(
    communities.map(async x => {
      const ipfsDescription = JSON.parse(await getText(x.ipfs_description));
      const avatar = await getFileUrl(ipfsDescription.avatar);

      x.avatar = avatar;
      x.description = ipfsDescription.description;
    }),
  );

  return communities;
}

export async function unfollowCommunity(
  eosService,
  communityIdFilter,
  selectedAccount,
) {
  await eosService.sendTransaction(selectedAccount, UNFOLLOW_COMM, {
    user: selectedAccount,
    community_id: +communityIdFilter,
  });
}

export async function followCommunity(
  eosService,
  communityIdFilter,
  selectedAccount,
) {
  await eosService.sendTransaction(selectedAccount, FOLLOW_COMM, {
    user: selectedAccount,
    community_id: +communityIdFilter,
  });
}

export async function createCommunity(eosService, selectedAccount, community) {
  const communityIpfsHash = await saveText(JSON.stringify(community));

  await eosService.sendTransaction(selectedAccount, CREATE_COMMUNITY, {
    user: selectedAccount,
    name: community.name,
    ipfs_description: communityIpfsHash,
  });
}

export async function upVoteToCreateCommunity(
  eosService,
  selectedAccount,
  communityId,
) {
  await eosService.sendTransaction(selectedAccount, VOTE_TO_CREATE_COMMUNITY, {
    user: selectedAccount,
    community_id: +communityId,
  });
}

export async function downVoteToCreateCommunity(
  eosService,
  selectedAccount,
  communityId,
) {
  await eosService.sendTransaction(selectedAccount, VOTE_TO_DELETE_COMMUNITY, {
    user: selectedAccount,
    community_id: +communityId,
  });
}
