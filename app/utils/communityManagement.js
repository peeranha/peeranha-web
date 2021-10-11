import JSBI from 'jsbi';

import communitiesConfig, {
  googleVerificationConfig,
} from 'communities-config';

import _get from 'lodash/get';

import { getFileUrl, getText, saveText } from './ipfs';
import { getCookie, setCookie } from './cookie';
import { uploadImg } from './profileManagement';

import {
  ALL_COMMUNITIES_SCOPE,
  COMMUNITIES_TABLE,
  CREATED_TAGS_TABLE,
  EDIT_COMMUNITY,
  EDIT_TAG_ACTION,
  FOLLOW_COMM,
  SINGLE_COMMUNITY_DETAILS,
  TAGS_TABLE,
  UNFOLLOW_COMM,
  VOTE_TO_CREATE_COMMUNITY,
  VOTE_TO_CREATE_TAG,
  VOTE_TO_DELETE_COMMUNITY,
  VOTE_TO_DELETE_TAG,
} from './constants';
import { CREATE_COMMUNITY, CREATE_TAG } from './ethConstants';
import { getCommunities, getTags } from './theGraph';

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
  return allcommunities.filter(x => followedcommunities.includes(+x.id));
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

  const { questionsAsked, users_subscribed } = row;

  const community = JSON.parse(await getText(row.ipfs_description));
  const {
    avatar,
    name,
    description,
    about,
    website = null,
    questionsType = 2,
    isBlogger,
    banner,
    facebook,
    instagram,
    youtube,
    vk,
    main_color,
    highlight_color,
  } = community;

  return {
    avatar,
    name,
    description,
    about,
    website,
    questionsType,
    questionsAsked,
    users_subscribed,
    isBlogger,
    banner,
    socialLinks: {
      facebook,
      instagram,
      youtube,
      vk,
    },
    colors: {
      main: main_color,
      highlight: highlight_color,
    },
  };
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
        main: isBlogger ? main_color : '#576fed',
        highlight: isBlogger ? highlight_color : '#fc6655',
      },
    }),
    options: {
      defaultPath: true,
      allowSubdomains: true,
    },
  });
};

export const setSingleCommunityDetails = async eosService => {
  const id = isSingleCommunityWebsite();

  const row = await eosService.getTableRow(
    COMMUNITIES_TABLE,
    ALL_COMMUNITIES_SCOPE,
    id,
  );

  const community = JSON.parse(await getText(row.ipfs_description));

  // get previous isBloger field value

  let prevIsBlogger = null;
  const prevSingleCommDetails = getCookie(`${SINGLE_COMMUNITY_DETAILS}_${id}`);
  if (prevSingleCommDetails && prevSingleCommDetails.length) {
    prevIsBlogger = JSON.parse(prevSingleCommDetails).isBlogger;
  }

  if (
    community.isBlogger ||
    (typeof prevIsBlogger === 'boolean' &&
      community.isBlogger !== prevIsBlogger)
  ) {
    setSingleCommunityDetailsInCookie(community, id);
  }

  if (prevSingleCommDetails && prevSingleCommDetails.length) {
    const prevValue = JSON.parse(prevSingleCommDetails);
    if (
      (community.isBlogger &&
        (prevValue.colors.main !== community.main_color ||
          prevValue.colors.highlight !== community.highlight_color)) ||
      prevValue.isBlogger !== community.isBlogger
    ) {
      location.reload();
    }
  }

  if (!prevSingleCommDetails && community.isBlogger) {
    location.reload();
  }

  const communityDetails = getSingleCommunityDetails();
};

export const getSingleCommunityDetails = () => {
  const id = isSingleCommunityWebsite();
  const dataFromCookie = id
    ? getCookie(`${SINGLE_COMMUNITY_DETAILS}_${id}`)
    : '';
  const communityDetails = dataFromCookie.length
    ? JSON.parse(dataFromCookie)
    : {};
  return communityDetails.isBlogger ? { ...communityDetails } : {};
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
export const getAllCommunities = async (ethereumService, count) => {
  const communities = await getCommunities(count);
  // return await ethereumService.getCommunities(count);
  return await Promise.all(
    communities.map(async community => {
      return {
        ...community,
        id: +community.id,
        value: +community.id,
        postCount: +community.postCount,
        creationTime: +community.creationTime,
        //todo amount of questions in community and tag
        tags: (await getTags(10, community.id)).map(tag => {
          return { ...tag, questionsAsked: 0 };
        }),
      };
    }),
  );
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
    website = null,
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
    website: website || null,
    tags: tagRows.map(tag => ({ ...tag, label: tag.name, value: tag.id })),
  };
};

export async function getSuggestedCommunities(eosService, lowerBound, limit) {
  return [];
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
export async function createCommunity(
  ethereumService,
  selectedAccount,
  community,
) {
  const { imgHash } = await uploadImg(community.avatar);
  const communityIpfsHash = await saveText(
    JSON.stringify({
      ...community,
      avatar: imgHash,
    }),
  );

  const tags = await Promise.all(
    community.tags.map(async x => {
      const hash = ethereumService.getBytes32FromIpfsHash(
        await saveText(JSON.stringify(x)),
      );

      return {
        ipfsDoc: {
          hash,
          hash2: hash,
        },
      };
    }),
  );
  const ipfsHash = ethereumService.getBytes32FromIpfsHash(communityIpfsHash);
  await ethereumService.sendTransactionWithSigner(
    selectedAccount,
    CREATE_COMMUNITY,
    [ipfsHash, tags],
  );
}

export async function createTag(
  ethereumService,
  selectedAccount,
  communityId,
  tag,
) {
  const ipfsHash = ethereumService.getBytes32FromIpfsHash(
    await saveText(JSON.stringify(tag)),
  );

  await ethereumService.sendTransactionWithSigner(selectedAccount, CREATE_TAG, [
    communityId,
    ipfsHash,
  ]);
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
