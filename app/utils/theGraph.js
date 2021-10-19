import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import {
  communitiesQuery,
  postsByCommQuery,
  postsQuery,
  repliesQuery,
  tagsQuery,
  userQuery,
  usersQuery,
} from './ethConstants';

const client = new ApolloClient({
  uri: process.env.THE_GRAPH_QUERY_URL,
  cache: new InMemoryCache(),
});

export const getUsers = async ({
  limit = 50,
  skip,
  sorting = 'creationTime',
}) => {
  const users = await client.query({
    query: gql(usersQuery),
    variables: {
      first: limit,
      skip,
      orderBy: sorting,
    },
  });
  return users?.data.users;
};

export const getUser = async id => {
  const user = await client.query({
    query: gql(userQuery),
    variables: {
      id,
    },
  });
  return user?.data.user;
};

export const getCommunities = async count => {
  const communities = await client.query({
    query: gql(communitiesQuery),
    variables: {
      first: count,
    },
  });
  return communities?.data.communities;
};

export const getTags = async (count, communityId) => {
  const tags = await client.query({
    query: gql(tagsQuery),
    variables: {
      first: count,
      communityId,
    },
  });
  return tags?.data.tags;
};

const getQuestionAnswers = async postId => {
  const answers = await client.query({
    query: gql(repliesQuery),
    variables: {
      postId: +postId,
    },
  });

  return answers?.data.replies?.map(answer => {
    return { ...answer, comments: [] };
  });
};

export const getPosts = async (limit, skip) => {
  const posts = await client.query({
    query: gql(postsQuery),
    variables: {
      first: limit,
      skip,
    },
  });
  return Promise.all(
    posts?.data.posts.map(async post => {
      return {
        ...post,
        answers: post.replyCount > 0 ? await getQuestionAnswers(post.id) : [],
        comments: [],
      };
    }),
  );
};

export const getPostsByCommunityId = async (limit, skip, communityIds) => {
  const posts = await client.query({
    query: gql(postsByCommQuery),
    variables: {
      communityIds,
      first: limit,
      skip,
    },
  });

  return Promise.all(
    posts?.data.posts.map(async post => {
      return {
        ...post,
        answers: post.replyCount > 0 ? await getQuestionAnswers(post.id) : [],
      };
    }),
  );
};
