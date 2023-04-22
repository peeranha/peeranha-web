import {
  userQuery,
  usersQuery,
  communitiesQuery,
  tagsQuery,
  communityTagsQuery,
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
    postCount: 0,
    answersGiven: 0,
  };
};

export const getSuiCommunities = async () => {
  const data = await getDataFromIndexer(communitiesQuery);
  return data.community.map((community) => ({
    ...community,
    id: +community.id,
    value: +community.id,
    label: community.name,
    postCount: +community.postCount,
    deletedPostCount: +community.deletedPostCount,
    creationTime: +community.creationTime,
    followingUsers: +community.followingUsers,
    replyCount: +community.replyCount,
  }));
};

export const getSuiTags = async () => {
  const data = await getDataFromIndexer(tagsQuery);
  console.log('data tags', data);
  return data.tag;
};

export const getSuiCommunityTags = async (communityId: string) => {
  console.log('community Id', communityId);
  const data = await getDataFromIndexer(communityTagsQuery, { communityId });
  console.log('data community tags', data);
  return data.tag;
};
