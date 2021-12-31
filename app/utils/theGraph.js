import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import {
  allTagsQuery,
  communitiesQuery,
  communityQuery,
  postQuery,
  postsByCommQuery,
  postsForSearchQuery,
  postsQuery,
  tagsQuery,
  userQuery,
  usersPostsQuery,
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

export const getUsersQuestions = async id => {
  const questions = await client.query({
    query: gql(usersPostsQuery),
    variables: {
      id,
    },
  });
  return questions?.data.posts.map(question => {
    return { ...question };
  });
};

export const getUsersAnsweredQuestions = async id => {
  const questions = await client.query({
    query: gql(usersPostsQuery),
    variables: {
      id,
    },
  });
  return questions?.data.posts.map(question => {
    return { ...question };
  });
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

export const getAllTags = async () => {
  const tags = await client.query({
    query: gql(allTagsQuery),
  });
  return tags?.data.tags;
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

export const getPosts = async (limit, skip) => {
  const posts = await client.query({
    query: gql(postsQuery),
    variables: {
      first: limit,
      skip,
    },
  });
  return posts?.data.posts.map(rawPost => {
    const post = { ...rawPost, answers: rawPost.replies };
    delete post.replies;
    return post;
  });
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

  return posts?.data.posts.map(rawPost => {
    const post = { ...rawPost, answers: rawPost.replies };
    delete post.replies;
    return post;
  });
};

export const getQuestionFromGraph = async postId => {
  const post = {
    ...(await client.query({
      query: gql(postQuery),
      variables: {
        postId,
      },
    })).data.post,
  };
  post.answers = post.replies.map(reply => {
    return {
      ...reply,
    };
  });
  delete post.replies;
  return post;
};
//
export const postsForSearch = async text => {
  const query = text
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .reduce((text, word) => {
      if (text.length === 0) {
        return `${word}:*`;
      } else {
        return `${text} <-> ${word}:*`;
      }
    }, '');
  const posts = await client.query({
    query: gql(postsForSearchQuery),
    variables: {
      text: query,
    },
  });
  return posts?.data?.postSearch.filter(post => !post.isDeleted);
};
