import { saveText, getText, getFileUrl } from './ipfs';

import {
  TAGS_TABLE,
  COMMUNITIES_TABLE,
  CREATED_TAGS_TABLE,
  CREATED_COMMUNITIES_TABLE,
  ALL_COMMUNITIES_SCOPE,
  UNFOLLOW_COMM,
  FOLLOW_COMM,
  CREATE_COMMUNITY,
  VOTE_TO_CREATE_COMMUNITY,
  VOTE_TO_DELETE_COMMUNITY,
  CREATE_TAG,
  VOTE_TO_CREATE_TAG,
  VOTE_TO_DELETE_TAG,
} from './constants';
import { uploadImg } from './profileManagement';

export function getFollowedCommunities(allcommunities, followedcommunities) {
  if (!allcommunities || !followedcommunities) return [];

  return allcommunities.filter(x => followedcommunities.includes(x.id));
}

export function getUnfollowedCommunities(allcommunities, followedcommunities) {
  if (!allcommunities || !followedcommunities) return [];

  return allcommunities.filter(x => !followedcommunities.includes(x.id));
}

/* eslint-disable */
export function getTagScope(communityId) /* istanbul ignore next */ {
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

export async function suggestTag(eosService, selectedAccount, tag) {
  const tagIpfsHash = await saveText(JSON.stringify(tag));

  await eosService.sendTransaction(selectedAccount, CREATE_TAG, {
    user: selectedAccount,
    community_id: +tag.communityId,
    name: tag.name,
    ipfs_description: tagIpfsHash,
  });
}

export async function getSuggestedTags(
  eosService,
  communityId,
  lowerBound,
  limit,
) {
  const tags = await eosService.getTableRows(
    CREATED_TAGS_TABLE,
    getTagScope(communityId),
    lowerBound,
    limit,
  );

  await Promise.all(
    tags.map(async x => {
      const ipfsDescription = JSON.parse(await getText(x.ipfs_description));
      x.description = ipfsDescription.description;
    }),
  );

  return tags;
}

export async function getExistingTags(tags) {
  await Promise.all(
    tags.map(async x => {
      const ipfsDescription = JSON.parse(await getText(x.ipfs_description));
      x.description = ipfsDescription.description;
    }),
  );

  return tags;
}

export async function upVoteToCreateTag(
  eosService,
  selectedAccount,
  communityId,
  tagid,
) {
  await eosService.sendTransaction(selectedAccount, VOTE_TO_CREATE_TAG, {
    user: selectedAccount,
    community_id: +communityId,
    tag_id: +tagid,
  });
}

export async function downVoteToCreateTag(
  eosService,
  selectedAccount,
  communityId,
  tagid,
) {
  await eosService.sendTransaction(selectedAccount, VOTE_TO_DELETE_TAG, {
    user: selectedAccount,
    community_id: +communityId,
    tag_id: +tagid,
  });
}

/* eslint no-param-reassign: 0 */
export async function getAllCommunities(eosService) {
  const lowerBound = 0;
  const communities = await eosService.getTableRows(
    COMMUNITIES_TABLE,
    ALL_COMMUNITIES_SCOPE,
    lowerBound,
  );

  await Promise.all(
    communities.map(async x => {
      x.label = x.name;
      x.value = x.id;

      const promise1 = async () => {
        const { description, main_description, language, avatar } = JSON.parse(
          await getText(x.ipfs_description),
        );

        x.avatar = getFileUrl(avatar);
        x.description = description;
        x.main_description = main_description;
        x.language = language;
      };

      // Tags for community
      const promise2 = async () => {
        x.tags = await eosService.getTableRows(
          TAGS_TABLE,
          getTagScope(x.id),
          lowerBound,
        );

        x.tags.forEach(y => {
          y.label = y.name;
          y.value = y.id;
        });
      };

      await Promise.all([promise1(), promise2()]);
    }),
  );

  return communities;
}

export async function getSuggestedCommunities(eosService, lowerBound, limit) {
  const communities = await eosService.getTableRows(
    CREATED_COMMUNITIES_TABLE,
    ALL_COMMUNITIES_SCOPE,
    lowerBound,
    limit,
  );

  await Promise.all(
    communities.map(async x => {
      const { avatar, description, main_description, language } = JSON.parse(
        await getText(x.ipfs_description),
      );

      x.avatar = getFileUrl(avatar);
      x.description = description;
      x.main_description = main_description;
      x.language = language;
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

/* eslint camelcase: 0 */
export async function createCommunity(eosService, selectedAccount, community) {
  const { imgHash } = await uploadImg(community.avatar);

  const communityIpfsHash = await saveText(
    JSON.stringify({
      ...community,
      avatar: imgHash,
    }),
  );

  const suggested_tags = await Promise.all(
    community.tags.map(async x => {
      const ipfs_description = await saveText(JSON.stringify(x));

      return {
        name: x.name,
        ipfs_description,
      };
    }),
  );

  await eosService.sendTransaction(selectedAccount, CREATE_COMMUNITY, {
    user: selectedAccount,
    name: community.name,
    ipfs_description: communityIpfsHash,
    suggested_tags,
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
