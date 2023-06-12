import JSBI from 'jsbi';

import communitiesConfig, { googleVerificationConfig } from 'communities-config';

import _get from 'lodash/get';

import { getBytes32FromIpfsHash, getFileUrl, getText, saveText } from './ipfs';
import { getCookie, setCookie } from './cookie';
import { uploadImg } from './profileManagement';

import { SINGLE_COMMUNITY_DETAILS } from './constants';
import {
  CREATE_COMMUNITY,
  CREATE_TAG,
  FOLLOW_COMMUNITY,
  UNFOLLOW_COMMUNITY,
  EDIT_COMMUNITY,
  EDIT_TAG,
  CONTRACT_COMMUNITY,
  CONTRACT_USER,
} from './ethConstants';
import { getCommunities, getCommunityById, getTags, getTagsByIds } from './theGraph';

export const isSingleCommunityWebsite = () =>
  +Object.keys(communitiesConfig).find(
    (id) => communitiesConfig[id].origin === window.location.origin,
  );

export const singleCommunityStyles = () =>
  _get(communitiesConfig, [isSingleCommunityWebsite(), 'styles'], {});

export const singleCommunityColors = () => _get(singleCommunityStyles(), 'colors', {});

export const singleCommunityFonts = () => _get(singleCommunityStyles(), 'fonts', {});

export const singleCommunityDocumentation = () =>
  _get(singleCommunityStyles(), 'documentationColors', {});

export const singleCommunityDocumentationPosition = () =>
  _get(singleCommunityStyles(), 'documentationPosition', 'bottom');

export const singleSubcommunity = () =>
  _get(communitiesConfig, [isSingleCommunityWebsite(), 'subcommunity'], []);

export const hasCommunitySingleWebsite = (commId) =>
  communitiesConfig[commId] ? communitiesConfig[commId].origin : false;

export function getFollowedCommunities(allCommunities, followedCommunities) {
  if (!allCommunities || !followedCommunities) return [];
  return allCommunities.filter((x) => followedCommunities.includes(+x.id));
}

export function getUnfollowedCommunities(allcommunities, followedcommunities) {
  if (!allcommunities || !followedcommunities) return [];

  return allcommunities.filter((x) => !followedcommunities.includes(x.id));
}

export const editCommunity = async (
  ethereumService,
  selectedAccount,
  communityId,
  communityData,
) => {
  const communityIpfsHash = await saveText(
    JSON.stringify({
      ...communityData,
    }),
  );
  const user = selectedAccount;
  const ipfsHash = getBytes32FromIpfsHash(communityIpfsHash);
  await ethereumService.sendTransaction(
    CONTRACT_COMMUNITY,
    user,
    EDIT_COMMUNITY,
    [user, communityId, ipfsHash],
    3,
  );
};

export const checkIsColorsActual = (id, mainColor, highlightColor) => {
  const singleCommDetails = getCookie(`${SINGLE_COMMUNITY_DETAILS}_${id}`);
  const communityValue = singleCommDetails ? JSON.parse(singleCommDetails) : {};
  if (
    communityValue.colors.main !== mainColor ||
    communityValue.colors.highlight !== highlightColor
  ) {
    location.reload();
  }
};

export const setSingleCommunityDetailsInCookie = (community, id) => {
  const { banner, facebook, instagram, youtube, vk } = community;

  setCookie({
    name: `${SINGLE_COMMUNITY_DETAILS}_${id}`,
    value: JSON.stringify({
      banner,
      socialNetworks: {
        facebook,
        instagram,
        youtube,
        vk,
      },
      colors: {
        main: 'var(--color-blue)',
        highlight: 'var(--color-pink)',
      },
    }),
    options: {
      defaultPath: true,
      allowSubdomains: true,
    },
  });
};

export const getSingleCommunityDetails = () => ({});

export function getTagScope(communityId) {
  const charmap = '.12345abcdefghijklmnopqrstuvwxyz';
  const mask = JSBI.BigInt('0xF800000000000000');
  const mask64 = JSBI.BigInt('0xFFFFFFFFFFFFFFFF');
  const zero = JSBI.BigInt(0);
  const five = JSBI.BigInt(5);
  let v = JSBI.add(JSBI.BigInt('3774731489195851776'), JSBI.BigInt(communityId));

  let ret = '';

  for (let i = 0; i < 13; i++) {
    v = JSBI.bitwiseAnd(v, mask64);
    if (v.toString() === zero.toString()) break;
    const indx = JSBI.signedRightShift(JSBI.bitwiseAnd(v, mask), JSBI.BigInt(i === 12 ? 60 : 59));

    ret += charmap[indx.toString()];
    v = JSBI.leftShift(v, five);
  }

  return ret;
}

export async function getExistingTags(tags) {
  await Promise.all(
    tags.map(async (x) => {
      const ipfsDescription = JSON.parse(await getText(x.ipfs_description));
      x.description = ipfsDescription.description;
    }),
  );

  return tags;
}

export async function editTag(user, ethereumService, tag, tagId) {
  const ipfsLink = await saveText(JSON.stringify(tag));
  const ipfsHash = getBytes32FromIpfsHash(ipfsLink);
  return await ethereumService.sendTransaction(CONTRACT_COMMUNITY, user, EDIT_TAG, [
    user,
    tag.communityId,
    tagId,
    ipfsHash,
  ]);
}

const formCommunityObject = (rawCommunity) => {
  return {
    ...rawCommunity,
    avatar: getFileUrl(rawCommunity.avatar),
    id: +rawCommunity.id,
    value: +rawCommunity.id,
    label: rawCommunity.name,
    postCount: +rawCommunity.postCount,
    deletedPostCount: +rawCommunity.deletedPostCount,
    creationTime: +rawCommunity.creationTime,
    followingUsers: +rawCommunity.followingUsers,
    replyCount: +rawCommunity.replyCount,
  };
};

const formattedTags = (tags) => {
  const formattedTags = {};

  for (let i = 0; i < tags.length; i++) {
    if (!formattedTags[tags[i].id.split('-')[0]]) {
      formattedTags[tags[i].id.split('-')[0]] = [tags[i]];
      continue;
    }
    formattedTags[tags[i].id.split('-')[0]] = [...formattedTags[tags[i].id.split('-')[0]], tags[i]];
  }
  return formattedTags;
};

/* eslint no-param-reassign: 0 */
export const getAllCommunities = async (ethereumService, count) => {
  const communities = await getCommunities(count);

  return communities.map((community) => {
    return formCommunityObject(community);
  });
};

export const getCommunityWithTags = async (id) => {
  const community = await getCommunityById(id);
  const tags = (await getTags(community.id)).map((tag) => {
    return { ...tag, label: tag.name };
  });

  return [formCommunityObject(community), formattedTags(tags)];
};

export const getCommunityTags = async (id) => {
  const tags = (await getTags(id)).map((tag) => {
    return { ...tag, label: tag.name };
  });

  return formattedTags(tags);
};

export const getTagsNameByIds = async (ids) => {
  const tags = await getTagsByIds(ids);
  let TagsNameByIds = {};
  tags.forEach((tag) => (TagsNameByIds[tag.id] = tag.name));
  return TagsNameByIds;
};

export const getCommunityFromContract = async (ethereumService, id) => {
  return await ethereumService.getCommunityFromContract(id);
};

export async function unfollowCommunity(ethereumService, communityIdFilter, account) {
  await ethereumService.sendTransaction(CONTRACT_USER, account, UNFOLLOW_COMMUNITY, [
    account,
    communityIdFilter,
  ]);
}

export async function followCommunity(ethereumService, communityIdFilter, account) {
  await ethereumService.sendTransaction(CONTRACT_USER, account, FOLLOW_COMMUNITY, [
    account,
    communityIdFilter,
  ]);
}

/* eslint camelcase: 0 */
export async function createCommunity(ethereumService, selectedAccount, community) {
  const { imgHash } = await uploadImg(community.avatar);
  const communityIpfsHash = await saveText(
    JSON.stringify({
      ...community,
      avatar: imgHash,
    }),
  );

  const tags = await Promise.all(
    community.tags.map(async (x) => {
      const hash = getBytes32FromIpfsHash(await saveText(JSON.stringify(x)));

      return {
        ipfsDoc: {
          hash,
          hash2: hash,
        },
      };
    }),
  );
  const ipfsHash = getBytes32FromIpfsHash(communityIpfsHash);
  const user = selectedAccount;
  await ethereumService.sendTransaction(CONTRACT_COMMUNITY, user, CREATE_COMMUNITY, [
    user,
    ipfsHash,
    tags,
  ]);
}

export async function createTag(ethereumService, selectedAccount, communityId, tag) {
  const ipfsHash = getBytes32FromIpfsHash(await saveText(JSON.stringify(tag)));
  const user = selectedAccount;
  await ethereumService.sendTransaction(CONTRACT_COMMUNITY, user, CREATE_TAG, [
    user,
    communityId,
    ipfsHash,
  ]);
}
