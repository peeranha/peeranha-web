import {
  userQuery,
  usersQuery,
  communitiesQuery,
  tagsQuery,
  communityTagsQuery,
  postsQuery,
  postByIdQuery,
  communityQuery,
  postQuery,
  followCommunityQuery,
  postsByCommunityIdQuery,
  historyIdQuery,
} from 'utils/sui/suiQuerries';
import { getFileUrl } from 'utils/ipfs';
import { delay } from 'utils/reduxUtils';

const getDataFromIndexer = async (query: string, variables: object = {}) => {
  const response = await fetch(process.env.QUERY_INDEX_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  return (await response.json()).data;
};

type User = {
  usercommunityrating: any;
  about: any;
  company: any;
  location: any;
  position: any;
  id: any;
  userpermission: any;
  replyCount: any;
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

const formUserObject = async (user: User) => {
  const ratings = user?.usercommunityrating;
  const highestRating = ratings?.length
    ? ratings.reduce((max: { rating: number }, current: { rating: number }) =>
        max.rating > current.rating ? max : current,
      )
    : 0;
  const communities = await getSuiCommunities();
  const followedCommunities = communities.filter((community: any) =>
    community?.usercommunity.find((usercommunity: any) => usercommunity.user[0].id === user.id),
  );
  return {
    ...user,
    profile: {
      about: user.about,
      company: user.company,
      location: user.location,
      position: user.position,
    },
    followedCommunities: followedCommunities.map((community: any) => community.id),
    user: user.id,
    ratings,
    permissions: user.userpermission.map((usrPerm: any) => usrPerm.permission),
    highestRating,
    answersGiven: user.replyCount,
  };
};

export const getSuiUsers = async () => {
  const data = await getDataFromIndexer(usersQuery);
  return data.user.map((user: User) => formUserObject(user));
};

export const getSuiUserById = async (id: string) => {
  const data = await getDataFromIndexer(userQuery, { id });
  const user = await formUserObject(data.user[0]);
  return user;
};

export const getSuiPosts = async (limit, offset, postTypes) => {
  const data = await getDataFromIndexer(postsQuery(String(postTypes)), { limit, offset });
  return data.post.map((post) => ({
    ...post,
    author: formUserObject(post.user[0]),
    answers: post.reply || [],
    community: post.community[0] || {},
    communityId: post.community[0].id,
    tags: post.posttag.map((tagObject) => tagObject.tag[0]),
  }));
};

export const getSuiPost = async (id) => {
  const data = await getDataFromIndexer(postQuery, { id });
  const post = data.post[0];
  return {
    ...post,
    answers: post.reply || [],
    community: post.community[0] || {},
    author: formUserObject(post.user[0]),
    communityId: post.community[0].id,
    tags: post.posttag.map((tagObject) => tagObject.tag[0]),
    comments: post.comment,
  };
};

export const isPostTransactionIndexed = async (id) => {
  const data = await getDataFromIndexer(historyIdQuery, { id });
  return data.history && data.history.length > 0;
};

export const waitForPostTransactionToIndex = async (transaction) => {
  let indexed = false;
  /* eslint-disable no-await-in-loop */
  do {
    await delay(500);
    indexed = await isPostTransactionIndexed(transaction);
  } while (!indexed);
  /* eslint-enable no-await-in-loop */
};

export const getSuiPostById = async (id: string) => {
  const data = await getDataFromIndexer(postByIdQuery, { id });
  return {
    ...data,
    answers: data.reply || [],
    community: data.community[0] || {},
    author: data.user[0] || {},
    communityId: data.community[0].id,
    tags: data.posttag.map((tagObject) => tagObject.tag[0]),
  };
};

export const getSuiCommunity = async (id: string) => {
  const data = await getDataFromIndexer(communityQuery, { id });
  return data.community.map((community) => ({
    ...community,
    avatar: getFileUrl(community.avatar),
    label: community.name,
    postCount: +community.postCount,
    deletedPostCount: +community.deletedPostCount,
    creationTime: +community.creationTime,
    followingUsers: +community.followingUsers,
    replyCount: +community.replyCount,
    suiId: community.id,
  }))[0];
};

export const getSuiTags = async () => {
  const data = await getDataFromIndexer(tagsQuery);
  return data.tag;
};

export const getSuiCommunityTags = async (communityId: string) => {
  const data = await getDataFromIndexer(communityTagsQuery, { communityId });
  return data.tag;
};

export const getFollowCommunitySuiIds = async (userId: string) => {
  const data = await getDataFromIndexer(followCommunityQuery, { userId });
  return data.usercommunity.map((usercommunity: any) => usercommunity.community[0].id);
};

export const getSuiPostsByCommunityId = async (limit, offset, postTypes, communityIds) => {
  const data = await getDataFromIndexer(
    postsByCommunityIdQuery(String(postTypes), String(communityIds)),
    { limit, offset },
  );
  return data.post.map((post) => ({
    ...post,
    answers: post.reply || [],
    community: post.community[0] || {},
    author: post.user[0] || {},
    communityId: post.community[0].id,
    tags: post.posttag.map((tagObject) => tagObject.tag[0]),
  }));
};
