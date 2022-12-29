import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { dataToString } from 'utils/converters';
import { isUserExists } from './accountManagement';
import {
  allTagsQuery,
  answeredPostsQuery,
  communitiesQuery,
  communityDocumentationQuery,
  communityQuery,
  documentationMenuQuery,
  faqByCommQuery,
  postQuery,
  postsByCommQuery,
  postsForSearchQuery,
  postsQuery,
  rewardsQuery,
  tagsQuery,
  userPermissionsQuery,
  usersAnswersQuery,
  usersPostsQuery,
  userStatsQuery,
  communityDocumentationNotIncludedQuery,
  queries,
} from './ethConstants';
import { runQuery } from './runQuery';

const client = new ApolloClient({
  uri: process.env.THE_GRAPH_QUERY_URL,
  cache: new InMemoryCache(),
});

export const getUsers = async ({
  limit = 50,
  skip,
  sortingAttribute = 'creationTime',
  sorting = 'desc',
}) => {
  if (process.env.GRAPH_SERVICE === 'Mesh') {
    const query = queries.Users.Mesh(sortingAttribute, sorting);

    const users = await runQuery({
      query,
      variables: {
        first: limit,
        skip,
      },
    });

    return users?.data.user.map((item) => {
      const ratings = item.userCommunityRating;
      const achievements = item.userAchievement.map(({ achievementId }) => ({
        id: achievementId,
      }));
      delete item.userAchievement;
      delete item.userCommunityRating;
      return {
        ...item,
        achievements,
        ratings,
      };
    });
  }

  const users = await client.query({
    query: gql(queries.Users.TheGraph),
    variables: {
      first: limit,
      skip,
      orderBy: sortingAttribute,
      orderDirection: sorting,
    },
  });
  return users?.data.users;
};

export const getModerators = async (roles) => {
  if (process.env.GRAPH_SERVICE === 'Mesh') {
    const administrators = await runQuery({
      query: queries.Moderation.Mesh(dataToString(roles)),
    });
    return [...administrators?.data.userPermission];
  }

  const administrators = await client.query({
    query: gql(queries.Moderation.TheGraph),
    variables: {
      roles: roles,
    },
    fetchPolicy: 'network-only',
  });
  return [...administrators?.data.userPermissions];
};

export const getUsersByCommunity = async ({
  limit = 50,
  skip,
  communityId,
}) => {
  if (process.env.GRAPH_SERVICE === 'Mesh') {
    const users = await runQuery({
      query: queries.UsersByCommunity.Mesh,
      variables: {
        limit,
        offset: skip,
        communityId,
      },
    });
    return users?.data.userCommunityRating.map((item) => item.user);
  }

  const users = await client.query({
    query: gql(queries.UsersByCommunity.TheGraph),
    variables: {
      first: limit,
      skip,
      communityId,
    },
  });
  return users?.data.userCommunityRatings.map((item) => item.user);
};

export const getUser = async (id) => {
  const userAddress = dataToString(id).toLowerCase();
  if (process.env.GRAPH_SERVICE === 'Mesh') {
    const user = {
      ...(
        await runQuery({
          query: queries.User.Mesh,
          variables: {
            id: userAddress,
          },
        })
      ).data?.user[0],
    };
    const ratings = user.userCommunityRating;
    const achievements = user.userAchievement.map(({ achievementId }) => ({
      id: achievementId,
    }));
    delete user.userAchievement;
    delete user.userCommunityRating;
    return {
      ...user,
      achievements,
      ratings,
    };
  }

  const user = await client.query({
    query: gql(queries.User.TheGraph),
    variables: {
      id: userAddress,
    },
  });
  return { ...user?.data?.user };
};

export const getUserPermissions = async (id) => {
  const userPermissions = await client.query({
    query: gql(userPermissionsQuery),
    variables: {
      id: dataToString(id).toLowerCase(),
    },
  });
  return userPermissions?.data?.userPermissions?.map((p) => p.permission);
};

export const getUserStats = async (id) => {
  const userStats = await client.query({
    query: gql(userStatsQuery),
    variables: {
      id: dataToString(id).toLowerCase(),
    },
    fetchPolicy: 'network-only',
  });
  return userStats?.data.user;
};

export const getUsersQuestions = async (id, limit, offset) => {
  const questions = await client.query({
    query: gql(usersPostsQuery),
    variables: {
      id,
      limit,
      offset,
    },
    fetchPolicy: 'network-only',
  });
  return questions?.data.posts.map((question) => ({ ...question }));
};

export const getUsersAnsweredQuestions = async (id, limit, offset) => {
  const { data } = await client.query({
    query: gql(usersAnswersQuery),
    variables: {
      id,
      limit,
      offset,
    },
  });
  const answeredPosts = await client.query({
    query: gql(answeredPostsQuery),
    variables: {
      ids: data.replies.map((reply) => Number(reply.postId)),
    },
  });
  return answeredPosts?.data.posts.map((question) => ({ ...question }));
};

export const getCommunities = async (count) => {
  const communities = await client.query({
    query: gql(communitiesQuery),
    variables: {
      first: count,
    },
  });
  return communities?.data.communities;
};

export const getAllTags = async (skip) => {
  const tags = await client.query({
    query: gql(allTagsQuery),
    variables: {
      skip,
    },
  });
  return tags?.data.tags;
};

export const getCommunityById = async (id) => {
  const community = await client.query({
    query: gql(communityQuery),
    variables: {
      id,
    },
  });
  return community?.data.community;
};

export const getTags = async (communityId) => {
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
    fetchPolicy: 'network-only',
  });
  return posts?.data.posts.map(({ replies, ...rawPost }) => ({
    ...rawPost,
    answers: replies,
  }));
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
    fetchPolicy: 'network-only',
  });

  return posts?.data.posts.map((rawPost) => {
    const post = { ...rawPost, answers: rawPost.replies };
    delete post.replies;
    return post;
  });
};

export const getFaqByCommunityId = async (communityId) => {
  const posts = await client.query({
    query: gql(faqByCommQuery),
    variables: {
      communityId,
    },
  });

  return posts?.data.posts.map((rawPost) => {
    const { replies, ...propsWithoutReplies } = rawPost;
    return { answers: replies, ...propsWithoutReplies };
  });
};

export const getCommunityDocumentation = async (id) => {
  const post = await client.query({
    query: gql(communityDocumentationQuery),
    variables: {
      id,
    },
  });

  return post?.data.post;
};

export const getCommunityDocumentationNotIncluded = async (
  communityId,
  includedIds,
) => {
  const post = await client.query({
    query: gql(communityDocumentationNotIncludedQuery),
    variables: {
      communityId,
      includedIds,
    },
  });
  return post?.data.posts;
};

export const getDocumentationMenu = async (communityId) => {
  const documentation = await client.query({
    query: gql(documentationMenuQuery),
    variables: {
      id: communityId,
    },
    fetchPolicy: 'network-only',
  });
  return documentation?.data.communityDocumentation;
};

export const getQuestionFromGraph = async (postId) => {
  const post = {
    ...(
      await client.query({
        query: gql(postQuery),
        variables: {
          postId,
        },
      })
    ).data.post,
  };
  post.answers = post.replies.map((reply) => ({
    ...reply,
  }));
  delete post.replies;
  return post;
};
//
export const postsForSearch = async (text, single) => {
  const query = text
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .reduce((textChar, word) => {
      if (textChar.length === 0) {
        return `${word}:*`;
      }
      return `${textChar} & ${word}:*`;
    }, '');
  const posts = await client.query({
    query: gql(postsForSearchQuery),
    variables: {
      text: query,
      first: 100,
    },
  });
  return posts?.data?.postSearch.filter(
    (post) =>
      !post.isDeleted &&
      (single ? Number(post.communityId) === Number(single) : true),
  );
};

export const getAllAchievements = async (userId) => {
  if (process.env.GRAPH_SERVICE === 'Mesh') {
    const response = await runQuery({
      query: queries.AllAchievements.Mesh,
      variables: {
        userId: userId.toLowerCase(),
      },
    });
    return {
      allAchievements: response?.data.achievement,
      userAchievements:
        response?.data.user[0].userAchievement.map(({ achievementId }) => ({
          id: achievementId,
        })) || [],
    };
  }

  const response = await client.query({
    query: gql(queries.allAchievements.TheGraph),
    variables: {
      userId: userId.toLowerCase(),
    },
  });
  return {
    allAchievements: response?.data.achievements
      .map((achievement) => ({ ...achievement, id: Number(achievement.id) }))
      .sort((x, y) => x.id - y.id),
    userAchievements: response?.data.user?.achievements || [],
  };
};

export const getRewardStat = async (userId, ethereumService) => {
  const isOldUser = await isUserExists(userId, ethereumService);
  const response = await client.query({
    query: gql(rewardsQuery),
    variables: {
      userId,
      periodsCount: isOldUser ? 2 : 1,
    },
    fetchPolicy: 'network-only',
  });
  return [
    response?.data?.userRewards,
    response?.data?.periods,
    response?.data?.user,
  ];
};

export const getCurrentPeriod = async () => {
  if (process.env.GRAPH_SERVICE === 'Mesh') {
    const response = await runQuery({
      query: queries.CurrentPeriod.Mesh,
    });
    return response?.data.period[0];
  }

  const response = await client.query({
    query: gql(queries.CurrentPeriod.TheGraph),
  });
  return response?.data?.periods?.[0];
};

export const historiesForPost = async (postId) => {
  if (process.env.GRAPH_SERVICE === 'Mesh') {
    const response = await runQuery({
      query: queries.Histories.Mesh,
      variables: {
        postId,
      },
    });
    return response?.data.history;
  }

  const response = await client.query({
    query: gql(queries.Histories.TheGraph),
    variables: {
      postId,
    },
  });
  return response?.data?.histories;
};
