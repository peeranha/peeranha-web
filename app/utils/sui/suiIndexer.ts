import {
  userQuery,
  usersQuery,
  communitiesQuery,
  tagsQuery,
  communityTagsQuery,
  postsQuery,
} from 'utils/sui/suiQuerries';
import { SUI_INDEXER_URL } from 'utils/sui/sui';

const getDataFromIndexer = async (query: string, variables: object = {}) => {
  const response = await fetch(SUI_INDEXER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  return (await response.json()).data;
};

export const getSuiUsers = async () => {
  const data = await getDataFromIndexer(usersQuery);
  return data.user;
};

export const getSuiUserById = async (id: string) => {
  const data = await getDataFromIndexer(userQuery, { id });
  const user = data.user[0];
  return {
    ...user,
    profile: {
      about: user.about,
      company: user.company,
      location: user.location,
      position: user.position,
    },
    user: id,
    ratings: user.usercommunityrating,
    permissions: user.userpermission,
    highestRating: 0,
    answersGiven: user.replyCount,
  };
};

export const getSuiCommunities = async () => {
  const data = await getDataFromIndexer(communitiesQuery);
  return data.community.map((community, index) => ({
    ...community,
    id: index + 1,
    value: index + 1,
    label: community.name,
    postCount: +community.postCount,
    deletedPostCount: +community.deletedPostCount,
    creationTime: +community.creationTime,
    followingUsers: +community.followingUsers,
    replyCount: +community.replyCount,
    suiId: community.id,
  }));
};

export const getSuiPosts = async () => {
  const data = await getDataFromIndexer(postsQuery);
  return data.post.map((post) => ({
    ...post,
    answers: post.reply || [],
    community: post.community[0] || {},
    author: post.user[0] || {},
    communityId: post.community[0].id,
    tags: post.posttag.map((tagObject) => tagObject.tag[0]),
  }));
};

export const getSuiTags = async () => {
  const data = await getDataFromIndexer(tagsQuery);
  return data.tag;
};

export const getSuiCommunityTags = async (communityId: string) => {
  const data = await getDataFromIndexer(communityTagsQuery, { communityId });
  return data.tag;
};
