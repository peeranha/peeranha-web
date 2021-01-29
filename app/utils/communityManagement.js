import JSBI from 'jsbi';

import communitiesConfig, {
  googleVerificationConfig,
} from 'communities-config';

import _get from 'lodash/get';

import { saveText, getText, getFileUrl } from './ipfs';
import { getCookie, setCookie } from './cookie';
import { uploadImg } from './profileManagement';

import {
  EDIT_COMMUNITY,
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
  EDIT_TAG_ACTION,
  VOTE_TO_CREATE_TAG,
  VOTE_TO_DELETE_TAG,
  SINGLE_COMMUNITY_DETAILS,
} from './constants';

export const isSingleCommunityWebsite = () =>
  +Object.keys(communitiesConfig).find(
    id => communitiesConfig[id].origin === window.location.origin,
  );

export const singleCommunityStyles = () =>
  _get(communitiesConfig, [isSingleCommunityWebsite(), 'styles'], {});

export const singleCommunityColors = () =>
  _get(singleCommunityStyles(), 'colors', {});

export const singleCommunityFonts = () =>
  _get(singleCommunityStyles(), 'fonts', {});

export const hasCommunitySingleWebsite = commId =>
  communitiesConfig[commId] ? communitiesConfig[commId].origin : false;

export const getGoogleVerificationData = () =>
  googleVerificationConfig.communities?.[isSingleCommunityWebsite()] ||
  googleVerificationConfig.default;

export function getFollowedCommunities(allcommunities, followedcommunities) {
  if (!allcommunities || !followedcommunities) return [];

  return allcommunities.filter(x => followedcommunities.includes(x.id));
}

export function getUnfollowedCommunities(allcommunities, followedcommunities) {
  if (!allcommunities || !followedcommunities) return [];

  return allcommunities.filter(x => !followedcommunities.includes(x.id));
}

export const editCommunity = async (
  eosService,
  selectedAccount,
  communityId,
  communityData,
) => {
  const ipfsHash = await saveText(JSON.stringify(communityData));

  await eosService.sendTransaction(
    selectedAccount,
    EDIT_COMMUNITY,
    {
      user: selectedAccount,
      community_id: communityId,
      name: communityData.name,
      ipfs_description: ipfsHash,
      type: communityData.questionsType,
    },
    null,
    true,
  );
};

export const getCommunityById = async (eosService, communityId) => {
  const row = await eosService.getTableRow(
    COMMUNITIES_TABLE,
    ALL_COMMUNITIES_SCOPE,
    communityId,
  );

  const { questions_asked, users_subscribed } = row;

  const community = JSON.parse(await getText(row.ipfs_description));
  const {
    avatar,
    name,
    description,
    about,
    officialSite = null,
    questionsType = 2,
    isBlogger,
    banner,
    facebook,
    instagram,
    youtube,
    vk,
  } = community;

  return {
    avatar,
    name,
    description,
    about,
    officialSite,
    questionsType,
    questions_asked,
    users_subscribed,
    isBlogger,
    banner,
    facebook,
    instagram,
    youtube,
    vk,
  };
};

export const setSingleCommunityDetails = async (eosService) => {
  const id = isSingleCommunityWebsite();
  
  const row = await eosService.getTableRow(
    COMMUNITIES_TABLE,
    ALL_COMMUNITIES_SCOPE,
    id,
  );

  const community = JSON.parse(await getText(row.ipfs_description));

  const {
    isBlogger,
    banner,
    facebook,
    instagram,
    youtube,
    vk,
    main_color,
    highlight_color,
  } = community;

  if (isBlogger) {
    setCookie({
      name: `${SINGLE_COMMUNITY_DETAILS}_${id}`,
      value: JSON.stringify({
        isBlogger,
        banner,
        socialNetworks: {
          facebook,
          instagram,
          youtube,
          vk,
        },
        colors: {
          main: main_color,
          highlight: highlight_color,
        },
      }),
      options: {
        defaultPath: true,
        allowSubdomains: true,
      },
    });
  }
};

export const getSingleCommunityDetails = () => {
  const id = isSingleCommunityWebsite();
  const dataFromCookie = id ? getCookie(`${SINGLE_COMMUNITY_DETAILS}_${id}`) : "";
  const communityDetails = dataFromCookie.length ? JSON.parse(dataFromCookie) : {};

  return { ...communityDetails };
};

/* eslint-disable */
export function getTagScope(communityId) {
  const charmap = '.12345abcdefghijklmnopqrstuvwxyz';
  const mask = JSBI.BigInt('0xF800000000000000');
  const mask64 = JSBI.BigInt('0xFFFFFFFFFFFFFFFF');
  const zero = JSBI.BigInt(0);
  const five = JSBI.BigInt(5);
  let v = JSBI.add(
    JSBI.BigInt('3774731489195851776'),
    JSBI.BigInt(communityId),
  );

  let ret = '';

  for (let i = 0; i < 13; i++) {
    v = JSBI.bitwiseAnd(v, mask64);
    if (v.toString() === zero.toString()) break;
    const indx = JSBI.signedRightShift(
      JSBI.bitwiseAnd(v, mask),
      JSBI.BigInt(i === 12 ? 60 : 59),
    );

    ret += charmap[indx.toString()];
    v = JSBI.leftShift(v, five);
  }

  return ret;
}
/* eslint-enable */

export async function suggestTag(eosService, selectedAccount, tag) {
  const tagIpfsHash = await saveText(JSON.stringify(tag));

  await eosService.sendTransaction(
    selectedAccount,
    CREATE_TAG,
    {
      user: selectedAccount,
      community_id: +tag.communityId,
      name: tag.name,
      ipfs_description: tagIpfsHash,
    },
    null,
    true,
  );
}

export async function getSuggestedTags(
  eosService,
  communityId,
  lowerBound,
  limit,
) {
  const { rows } = await eosService.getTableRows(
    CREATED_TAGS_TABLE,
    getTagScope(communityId),
    lowerBound,
    limit,
  );

  await Promise.all(
    rows.map(async x => {
      const ipfsDescription = JSON.parse(await getText(x.ipfs_description));
      x.description = ipfsDescription.description;
    }),
  );

  return rows;
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

export async function editTagCM(eosService, selectedAccount, tag, tagIpfsHash) {
  await eosService.sendTransaction(
    selectedAccount,
    EDIT_TAG_ACTION,
    {
      user: selectedAccount,
      community_id: +tag.communityId,
      tag_id: tag.tagId,
      name: tag.name,
      ipfs_description: tagIpfsHash,
    },
    null,
    true,
  );
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
export const getAllCommunities = async (eosService, count) => {
  let limit = count;
  let rows = [];
  let more = true;
  let lowerBound = 0;

  while (rows.length < count && more && limit > 0) {
    // eslint-disable-next-line no-await-in-loop
    const { rows: newRows, more: hasMore } = await eosService.getTableRows(
      COMMUNITIES_TABLE,
      ALL_COMMUNITIES_SCOPE,
      lowerBound,
      limit,
    );

    rows = [...rows, ...newRows];
    more = hasMore;
    lowerBound = rows[rows.length - 1].id;
    limit -= newRows.length;
  }

  const updatedRows = await Promise.all(
    rows.map(async x => {
      const {
        description,
        about,
        main_description,
        language,
        avatar,
        officialSite,
      } = JSON.parse(await getText(x.ipfs_description));
      const { rows: tagRows } = await eosService.getTableRows(
        TAGS_TABLE,
        getTagScope(x.id),
        0,
        -1,
      );

      return {
        ...x,
        label: x.name,
        value: x.id,
        avatar: getFileUrl(avatar),
        description,
        about,
        main_description,
        language,
        officialSite: officialSite || null,
        tags: tagRows.map(tag => ({ ...tag, label: tag.name, value: tag.id })),
      };
    }),
  );

  return updatedRows;
};

export const getCommunityWithTags = async (eosService, id) => {
  const row = await eosService.getTableRow(
    COMMUNITIES_TABLE,
    ALL_COMMUNITIES_SCOPE,
    id,
  );

  const community = JSON.parse(await getText(row.ipfs_description));
  const {
    avatar,
    name,
    description,
    about,
    main_description,
    language,
    officialSite = null,
  } = community;
  
  const { rows: tagRows } = await eosService.getTableRows(
    TAGS_TABLE,
    getTagScope(id),
    0,
    -1,
  );

  return {
    ...row,
    label: name,
    value: id,
    avatar: getFileUrl(avatar),
    description,
    about,
    main_description,
    language,
    officialSite: officialSite || null,
    tags: tagRows.map(tag => ({ ...tag, label: tag.name, value: tag.id })),
  };
};

export async function getSuggestedCommunities(eosService, lowerBound, limit) {
  const { rows } = await eosService.getTableRows(
    CREATED_COMMUNITIES_TABLE,
    ALL_COMMUNITIES_SCOPE,
    lowerBound,
    limit,
  );

  await Promise.all(
    rows.map(async x => {
      const {
        avatar,
        description,
        about,
        main_description,
        language,
        officialSite,
      } = JSON.parse(await getText(x.ipfs_description));

      x.avatar = getFileUrl(avatar);
      x.description = description;
      x.about = about;
      x.main_description = main_description;
      x.language = language;
      x.officialSite = officialSite || null;
    }),
  );

  return rows;
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
  const { imgHash: avatarField } = await uploadImg(community.avatar);
  const { imgHash: bannerField } = await uploadImg(community.banner);

  const communityIpfsHash = await saveText(
    JSON.stringify({
      ...community,
      avatar: avatarField,
      banner: bannerField,
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

  await eosService.sendTransaction(
    selectedAccount,
    CREATE_COMMUNITY,
    {
      user: selectedAccount,
      name: community.name,
      type: community.questionsType,
      ipfs_description: communityIpfsHash,
      suggested_tags,
    },
    null,
    true,
  );
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
