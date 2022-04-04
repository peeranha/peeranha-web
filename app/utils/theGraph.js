import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import {
  allAchievementsQuery,
  allTagsQuery,
  answeredPostsQuery,
  communitiesQuery,
  communityQuery,
  postQuery,
  postsByCommQuery,
  postsForSearchQuery,
  postsQuery, rewardsQuery,
  tagsQuery,
  userQuery,
  usersAnswersQuery,
  usersPostsQuery,
  usersQuery,
  userStatsQuery,
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
  return { ...user?.data?.user };
};

export const getUserStats = async id => {
  const userStats = await client.query({
    query: gql(userStatsQuery),
    variables: {
      id,
    },
  });
  return userStats?.data.user;
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
  const { data } = await client.query({
    query: gql(usersAnswersQuery),
    variables: {
      id,
    },
  });
  const answeredPosts = await client.query({
    query: gql(answeredPostsQuery),
    variables: {
      ids: data.replies.map(reply => Number(reply.postId)),
    },
  });
  return answeredPosts?.data.posts.map(question => {
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

export const getPosts = async (limit, skip, postTypes) => {
  const posts = await client.query({
    query: gql(postsQuery),
    variables: {
      first: limit,
      skip,
      postTypes,
    },
  });
  return posts?.data.posts.map(rawPost => {
    const post = { ...rawPost, answers: rawPost.replies };
    delete post.replies;
    return post;
  });
};
//
export const getPostsByCommunityId = async (
  limit,
  skip,
  postTypes,
  communityIds,
) => {
  const posts = await client.query({
    query: gql(postsByCommQuery),
    variables: {
      communityIds,
      first: limit,
      skip,
      postTypes,
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

export const getAllAchievements = async userId => {
  const response = await client.query({
    query: gql(allAchievementsQuery),
    variables: {
      userId,
    },
  });
  return {
    allAchievements: response?.data.achievements,
    userAchievements: response?.data.user.achievements,
  };
};

export const getRewardStat = async (userId) => {
  const response = await client.query({
    query: gql(rewardsQuery),
    variables: {
      userId,
    },
  });
  return [response?.data?.userRewards, response?.data?.periods];
}
