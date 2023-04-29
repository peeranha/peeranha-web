import {
  communitiesQuery,
  communityQuery,
  communityTagsQuery,
  followCommunityQuery,
  historyIdQuery,
  postByIdQuery,
  postQuery,
  postsByCommunityIdQuery,
  postsQuery,
  tagsQuery,
  userQuery,
  usersQuery,
} from 'utils/sui/suiQuerries';
import { getFileUrl } from 'utils/ipfs';
import { delay } from 'utils/reduxUtils';
import { map } from 'react-sortable-tree';

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
  usercommunity: any;
  about: any;
  company: any;
  location: any;
  position: any;
  id: any;
  userpermission: any;
  replyCount: any;
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
    translations: community.communitytranslation,
  }))[0];
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
    translations: community.communitytranslation,
  }));
};

const userFromIndexerResponse = (user: User, communities: any[]) => {
  const ratings = user?.usercommunityrating;
  const highestRating = ratings?.length
    ? ratings.reduce((max: { rating: number }, current: { rating: number }) =>
        max.rating > current.rating ? max : current,
      )
    : 0;
  const followedCommunities = communities.filter((community: any) =>
    user?.usercommunity.find((usercommunity: any) => usercommunity.communityId === community.suiId),
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

export const getSuiUsers = async (communities: any[]) => {
  const data = await getDataFromIndexer(usersQuery);
  return data.user.map((user: User) => userFromIndexerResponse(user, communities));
};

export const getSuiUserById = async (id: string, communities: any) => {
  const data = await getDataFromIndexer(userQuery, { id });
  return userFromIndexerResponse(data.user[0], communities);
};

const commentFromIndexerReponse = (commentFromIndexer: any, communities: any) => ({
  ...commentFromIndexer,
  author: userFromIndexerResponse(commentFromIndexer.user[0], communities),
  translations: commentFromIndexer.commenttranslation,
});

const answerFromIndexerReponse = (
  answerFromIndexer: any,
  postId: string,
  comments: any,
  communities: any,
) => ({
  ...answerFromIndexer,
  author: answerFromIndexer.user
    ? userFromIndexerResponse(answerFromIndexer.user[0], communities)
    : answerFromIndexer.author,
  translations: answerFromIndexer.replytranslation || [],
  comments: comments
    ? comments
        .filter(
          (comment: any) =>
            comment.parentReplyId > 0 &&
            answerFromIndexer.id === `${postId}-${comment.parentReplyId}`,
        )
        .map((comment: any) => commentFromIndexerReponse(comment, communities))
    : [],
});

const postFromIndexerResponse = (postFromIndexer: any, communities: any) => ({
  ...postFromIndexer,
  author: userFromIndexerResponse(postFromIndexer.user[0], communities),
  answers: postFromIndexer.reply
    ? postFromIndexer.reply.map((reply: any) =>
        answerFromIndexerReponse(reply, postFromIndexer.id, postFromIndexer.comment, communities),
      )
    : [],
  comments: postFromIndexer.comment
    ? postFromIndexer.comment
        .filter((comment: any) => comment.parentReplyId === 0)
        .map((comment: any) => commentFromIndexerReponse(comment, communities))
    : [],
  community: postFromIndexer.community[0]
    ? {
        ...postFromIndexer.community[0],
        translations: postFromIndexer.community[0]?.communitytranslation,
      }
    : {},
  communityId: postFromIndexer.community[0].id,
  tags: postFromIndexer.posttag.map((tagObject: any) => tagObject.tag[0]),
  translations: postFromIndexer.posttranslation,
});

export const getSuiPosts = async (limit, offset, postTypes, communities) => {
  const data = await getDataFromIndexer(postsQuery(String(postTypes)), { limit, offset });
  return data.post.map((post) => postFromIndexerResponse(post, communities));
};

export const getSuiPost = async (id, communities) => {
  const data = await getDataFromIndexer(postQuery, { id });
  const post = data.post[0];
  const response = postFromIndexerResponse(post, communities);
  return response;
};

export const getSuiPostsByCommunityId = async (
  limit,
  offset,
  postTypes,
  communityIds,
  communities,
) => {
  const data = await getDataFromIndexer(
    postsByCommunityIdQuery(String(postTypes), String(communityIds)),
    { limit, offset },
  );
  return data.post.map((post) => postFromIndexerResponse(post, communities));
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
