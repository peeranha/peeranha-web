import { isMeshServiceConfig } from 'communities-config';
import {
  communityTagsQuery,
  historyIdQuery,
  postQuery,
  postsByCommunityIdQuery,
  postsQuery,
  userQuery,
  usersByCommunityQuery,
  usersQuery,
} from 'utils/sui/suiQuerries';
import { delay } from 'utils/reduxUtils';
import { historyIdQueryGraph } from 'utils/queries/QueriesGraph';

const getDataFromIndexer = async (
  query: string,
  variables: object = {},
  isMeshService: boolean | undefined,
) => {
  const isMesh = isMeshService ? true : isMeshServiceConfig();
  const url = isMesh ? process.env.QUERY_INDEX_URL : process.env.THE_GRAPH_QUERY_URL;
  const response = await fetch(new URL(url), {
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
  walletAddress: string;
  customName: string;
};

type UsersByCommunityId = {
  user: User[];
};

const userFromIndexerResponse = (user: User, communities: any[]) => {
  const ratings = user?.usercommunityrating;
  const highestRating = ratings?.length
    ? ratings.reduce((max: { rating: number }, current: { rating: number }) =>
        max.rating > current.rating ? max : current,
      )
    : 0;
  const followedCommunities = communities.filter((community: any) =>
    user?.usercommunity.find((usercommunity: any) => usercommunity.communityId === community.id),
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

export const getSuiUsersByCommunityId = async (communityId: string, communities: any) => {
  const data = await getDataFromIndexer(usersByCommunityQuery, { communityId });
  return data.usercommunityrating.map((users: UsersByCommunityId) =>
    userFromIndexerResponse(users.user, communities),
  );
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
  return postFromIndexerResponse(post, communities);
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

export const getSuiCommunityTags = async (communityId: string) => {
  const data = await getDataFromIndexer(communityTagsQuery, { communityId });
  return data.tag;
};

export const isPostTransactionIndexed = async (id: any, indexerOnly: boolean | undefined) => {
  const isMeshService = indexerOnly ? true : isMeshServiceConfig();
  const historyQuery = isMeshService ? historyIdQuery : historyIdQueryGraph;
  const data = await getDataFromIndexer(historyQuery, { id }, isMeshService);
  return isMeshService
    ? data.history && data.history.length > 0
    : data.history?.id && data.history?.id.length > 0;
};

export const waitForPostTransactionToIndex = async (
  transaction: any,
  indexerOnly: boolean | undefined,
) => {
  let indexed = false;
  /* eslint-disable no-await-in-loop */
  do {
    await delay(500);
    indexed = await isPostTransactionIndexed(transaction, indexerOnly);
  } while (!indexed);
  /* eslint-enable no-await-in-loop */
};
