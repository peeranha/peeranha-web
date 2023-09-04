import communitiesConfig from 'communities-config';

import _get from 'lodash/get';
import { getActualId, getNetwork } from 'utils/properties';

import { getBytes32FromIpfsHash, getFileUrl, saveText } from './ipfs';
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
import { isSuiBlockchain } from 'utils/sui/sui';

export const isSingleCommunityWebsite = () =>
  Object.keys(communitiesConfig).find(
    (id) => communitiesConfig[id].origin === window.location.origin,
  );

const isSuiWebsite = () => {
  const SUI = isSuiBlockchain;
  const SUI_ID = 1;
  return SUI ? SUI_ID : undefined;
};

export const singleCommunityStyles = () =>
  _get(communitiesConfig, [isSingleCommunityWebsite() || isSuiWebsite(), 'styles'], {});

export const singleCommunityColors = () => _get(singleCommunityStyles(), 'colors', {});

export const singleCommunityFonts = () => _get(singleCommunityStyles(), 'fonts', {});

export const singleCommunityDocumentation = () =>
  _get(singleCommunityStyles(), 'documentationColors', {});

export const singleCommunityDocumentationPosition = () =>
  _get(singleCommunityStyles(), 'documentationPosition', 'bottom');

export const hasCommunitySingleWebsite = (commId) =>
  communitiesConfig[commId] ? communitiesConfig[commId].origin : false;

export function getFollowedCommunities(allCommunities, followedCommunities) {
  if (!allCommunities || !followedCommunities) return [];
  return allCommunities.filter((x) => followedCommunities.includes(String(x.id)));
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
    getNetwork(communityId),
    CONTRACT_COMMUNITY[getNetwork(communityId)],
    user,
    EDIT_COMMUNITY,
    [user, getActualId(communityId), ipfsHash],
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
export async function editTag(user, ethereumService, tag, tagId) {
  const ipfsLink = await saveText(JSON.stringify(tag));
  const ipfsHash = getBytes32FromIpfsHash(ipfsLink);
  return ethereumService.sendTransaction(
    getNetwork(tagId),
    CONTRACT_COMMUNITY[getNetwork(tagId)],
    user,
    EDIT_TAG,
    [user, tag.communityId.split('-')[1], `${tagId.split('-')[2]}`, ipfsHash],
  );
}

const formCommunityObject = (rawCommunity) => ({
  ...rawCommunity,
  avatar: getFileUrl(rawCommunity.avatar),
  id: rawCommunity.id,
  value: rawCommunity.id,
  label: rawCommunity.name,
  postCount: +rawCommunity.postCount,
  creationTime: +rawCommunity.creationTime,
  followingUsers: +rawCommunity.followingUsers,
  replyCount: +rawCommunity.replyCount,
});

const formattedTags = (tags, commuityId) => {
  const formattedTags = {};

  for (let i = 0; i < tags.length; i++) {
    if (!formattedTags[commuityId]) {
      formattedTags[commuityId] = [tags[i]];
      continue;
    }
    formattedTags[commuityId] = [...formattedTags[commuityId], tags[i]];
  }
  return formattedTags;
};

/* eslint no-param-reassign: 0 */
export const getAllCommunities = async () => {
  const communities = await getCommunities();
  return communities.map((community) => formCommunityObject(community));
};

export const getCommunityWithTags = async (id) => {
  const community = await getCommunityById(id);
  const tags = (await getTags(community.id)).map((tag) => ({ ...tag, label: tag.name }));

  return [formCommunityObject(community), formattedTags(tags)];
};

export const getCommunityTags = async (commuityId) => {
  const tags = (await getTags(commuityId)).map((tag) => ({ ...tag, label: tag.name }));

  return formattedTags(tags, commuityId);
};

export const getTagsNameByIds = async (ids) => {
  const tags = await getTagsByIds(ids);
  const TagsNameByIds = {};
  tags.forEach((tag) => (TagsNameByIds[tag.id] = tag.name));
  return TagsNameByIds;
};

export async function unfollowCommunity(ethereumService, communityIdFilter, account) {
  await ethereumService.sendTransaction(
    getNetwork(communityIdFilter),
    CONTRACT_USER[getNetwork(communityIdFilter)],
    account,
    UNFOLLOW_COMMUNITY,
    [account, getActualId(communityIdFilter)],
  );
}

export async function followCommunity(ethereumService, communityIdFilter, account) {
  await ethereumService.sendTransaction(
    getNetwork(communityIdFilter),
    CONTRACT_USER[getNetwork(communityIdFilter)],
    account,
    FOLLOW_COMMUNITY,
    [account, getActualId(communityIdFilter)],
  );
}

/* eslint camelcase: 0 */
export async function createCommunity(network, ethereumService, selectedAccount, community) {
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
  await ethereumService.sendTransaction(
    network - 1,
    CONTRACT_COMMUNITY[network - 1],
    user,
    CREATE_COMMUNITY,
    [user, ipfsHash, tags],
  );
}

export async function createTag(ethereumService, selectedAccount, communityId, tag) {
  const ipfsHash = getBytes32FromIpfsHash(await saveText(JSON.stringify(tag)));
  const user = selectedAccount;
  await ethereumService.sendTransaction(
    getNetwork(communityId),
    CONTRACT_COMMUNITY[getNetwork(communityId)],
    user,
    CREATE_TAG,
    [user, getActualId(communityId), ipfsHash],
  );
}
