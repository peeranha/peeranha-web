import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import {
  commentsQuery,
  communitiesQuery,
  communityQuery,
  postQuery,
  postsByCommQuery,
  postsForSearchQuery,
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

export const getCommunityById = async id => {
  const community = await client.query({
    query: gql(communityQuery),
    variables: {
      id,
    },
  });
  return community?.data.community;
};

export const getTags = async communityId => {
  const tags = await client.query({
    query: gql(tagsQuery),
    variables: {
      communityId,
    },
  });
  return tags?.data.tags;
};

const getComments = async (postId, parentReplyId) => {
  const comments = await client.query({
    query: gql(commentsQuery),
    variables: {
      postId: +postId,
      parentReplyId: +parentReplyId,
    },
  });
  return comments?.data.comments;
};

const getQuestionAnswers = async postId => {
  const answers = await client.query({
    query: gql(repliesQuery),
    variables: {
      postId: +postId,
    },
  });

  return answers?.data.replies?.map(answer => {
    return { ...answer, comments: getComments(postId, answer.id) };
  });
};
//
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
        answers: await getQuestionAnswers(post.id),
        comments: await getComments(post.id, 0),
      };
    }),
  );
};
//
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
        answers: await getQuestionAnswers(post.id),
        comments: await getComments(post.id, 0),
      };
    }),
  );
};
//
export const getQuestionFromGraph = async postId => {
  const post = await client.query({
    query: gql(postQuery),
    variables: {
      postId,
    },
  });

  return {
    ...post.data.post,
    answers: [
      ...(await Promise.all(
        post.data.replies.map(async (reply, index) => {
          return {
            ...reply,
            comments: (await client.query({
              query: gql(commentsQuery),
              variables: {
                postId: +postId,
                parentReplyId: +reply.id.split('-')[1],
              },
            })).data.comments.map(comment => {
              return {
                ...comment,
              };
            }),
          };
        }),
      )),
    ],
    comments: post.data.comments.map(comment => {
      return {
        ...comment,
      };
    }),
  };
};
//
export const postsForSearch = async text => {
  const posts = await client.query({
    query: gql(postsForSearchQuery),
    variables: {
      text: `${text}:*`,
    },
  });
  return posts?.data?.postSearch.filter(post => !post.isDeleted);
};
