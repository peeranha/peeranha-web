import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { dataToString } from 'utils/converters';
import { isUserExists } from './accountManagement';
import {
  queries,
  postsIdsByTagsQueryMesh,
  replyId2QueryMesh,
  commentId2QueryMesh,
  replyQuery,
  voteHistory,
} from './ethConstants';
import {
  executeMeshQuery,
  getPostDataFromMesh,
  getUserDataFromMesh,
  renameRepliesToAnswers,
  getHistoryDataFromMesh,
  getReplyDataFromMesh,
} from './mesh';

const client = new ApolloClient({
  uri: process.env.THE_GRAPH_QUERY_URL,
  cache: new InMemoryCache(),
});

const graphService = process.env.GRAPH_SERVICE;
const isMeshService = graphService === 'Mesh';

const executeQuery = async ({ query, variables }, enableCache = true) => {
  const result = isMeshService
    ? await executeMeshQuery({ query, variables })
    : await client.query({
        query: gql(query),
        variables,
        fetchPolicy: !enableCache ? 'network-only' : undefined,
      });

  return result?.data;
};

export const getUsers = async ({
  limit = 50,
  skip,
  orderBy = 'creationTime',
  sorting = 'desc',
}) => {
  const query = isMeshService ? queries.Users.Mesh(orderBy, sorting) : queries.Users.TheGraph;

  const result = await executeQuery({
    query,
    variables: {
      first: limit,
      skip,
      orderBy,
      orderDirection: sorting,
    },
  });

  return isMeshService ? result.user.map((item) => getUserDataFromMesh(item)) : result.users;
};

export const getModerators = async (roles) => {
  const query = isMeshService
    ? queries.Moderation.Mesh(dataToString(roles))
    : queries.Moderation.TheGraph;

  const result = await executeQuery(
    {
      query,
      variables: {
        roles,
      },
    },
    false,
  );

  return isMeshService
    ? result.userpermission.map(({ user, ...item }) => ({
        ...item,
        user: getUserDataFromMesh(user[0]),
      }))
    : [...result.userPermissions];
};

export const getUsersByCommunity = async ({ limit = 50, skip: offset, communityId }) => {
  const result = await executeQuery({
    query: queries.UsersByCommunity[graphService],
    variables: {
      limit,
      offset,
      communityId,
    },
  });
  return isMeshService
    ? result.usercommunityrating.map((item) => getUserDataFromMesh(item.user[0]))
    : result.userCommunityRatings.map((item) => item.user);
};

export const getUser = async (id) => {
  const result = await executeQuery({
    query: queries.User[graphService],
    variables: {
      id: dataToString(id).toLowerCase(),
    },
  });
  return isMeshService && result.user.length
    ? getUserDataFromMesh(result.user[0])
    : { ...result.user };
};

export const getUserPermissions = async (id) => {
  const result = await executeQuery({
    query: queries.UserPermissions[graphService],
    variables: {
      id: dataToString(id).toLowerCase(),
    },
  });
  return isMeshService
    ? result.userpermission?.map((p) => p.permission)
    : result.userPermissions?.map((p) => p.permission);
};

export const getUserStats = async (id) => {
  const result = await executeQuery(
    {
      query: queries.UserStats[graphService],
      variables: {
        id: dataToString(id).toLowerCase(),
      },
    },
    false,
  );
  return isMeshService ? getUserDataFromMesh(result.user[0]) : result.user;
};

export const getUsersQuestions = async (id, limit, offset) => {
  const result = await executeQuery(
    {
      query: queries.UserPosts[graphService],
      variables: {
        id,
        limit,
        offset,
      },
    },
    false,
  );
  return isMeshService
    ? result?.post.map((post) => getPostDataFromMesh(post))
    : result?.posts.map((post) => ({ ...post }));
};

export const getUsersAnsweredQuestions = async (id, limit, offset) => {
  const postIds = await executeQuery(
    {
      query: queries.UserAnswers[graphService],
      variables: {
        id,
        limit,
        offset,
      },
    },
    false,
  );

  const ids = isMeshService
    ? postIds.reply.map((reply) => reply.postId)
    : postIds.replies.map((reply) => reply.postId);
  const query = isMeshService
    ? queries.AnsweredPosts.Mesh(dataToString(ids))
    : queries.AnsweredPosts.TheGraph;

  const answeredPosts = await executeQuery({
    query,
    variables: {
      ids,
    },
  });
  return isMeshService
    ? answeredPosts?.post.map((post) => getPostDataFromMesh(post))
    : answeredPosts?.posts.map((post) => ({ ...post }));
};

export const getCommunities = async () => {
  const communities = await executeQuery({
    query: queries.Communities[graphService],
  });
  return isMeshService ? communities?.community : communities?.communities;
};

export const getCommunityById = async (id) => {
  const community = await executeQuery({
    query: queries.Community[graphService],
    variables: {
      id,
    },
  });
  return isMeshService
    ? { ...community?.community[0], translations: community?.community[0].communitytranslation }
    : community?.community;
};

export const getTags = async (communityId) => {
  const result = await executeQuery({
    query: queries.Tags[graphService],
    variables: {
      communityId,
    },
  });
  return isMeshService ? result?.tag : result?.tags;
};

export const getTagsByIds = async (ids) => {
  const query = isMeshService
    ? queries.TagsByIds.Mesh(dataToString(ids))
    : queries.TagsByIds.TheGraph;

  const result = await executeQuery({
    query,
    variables: {
      ids,
    },
  });
  return isMeshService ? result?.tag : result?.tags;
};

export const getPosts = async (limit, skip, postTypes) => {
  const query = isMeshService
    ? queries.Posts.Mesh(dataToString(postTypes))
    : queries.Posts.TheGraph;

  const result = await executeQuery(
    {
      query,
      variables: {
        first: limit,
        skip,
        postTypes,
      },
    },
    false,
  );

  return isMeshService
    ? result.post.map((post) => renameRepliesToAnswers(getPostDataFromMesh(post)))
    : result?.posts.map((post) => renameRepliesToAnswers(post));
};

export const getPostsByCommunityId = async (limit, skip, postTypes, communityIds, tags) => {
  if (tags?.length) {
    let postIds;
    if (isMeshService) {
      const tagsQuery = postsIdsByTagsQueryMesh(dataToString(tags));
      const tagResponse = await executeMeshQuery({ query: tagsQuery, variables: { limit, skip } });
      postIds = tagResponse.data.posttag.map((tag) => tag.postId);
    }

    const query = isMeshService
      ? queries.PostsByCommAndTags.Mesh(dataToString(postIds), dataToString(postTypes))
      : queries.PostsByCommAndTags.TheGraph;
    const result = await executeQuery({
      query,
      variables: {
        communityIds,
        first: limit,
        skip,
        postTypes,
        tags,
      },
    });

    return isMeshService
      ? result?.post.map((rawPost) => renameRepliesToAnswers(getPostDataFromMesh(rawPost)))
      : result?.posts.map((rawPost) => renameRepliesToAnswers(rawPost));
  }

  const query = isMeshService
    ? queries.PostsByCommunity.Mesh(dataToString(postTypes), communityIds)
    : queries.PostsByCommunity.TheGraph;

  const result = await executeQuery(
    {
      query,
      variables: {
        communityIds,
        limit,
        offset: skip,
        postTypes,
      },
    },
    false,
  );

  return isMeshService
    ? result?.post.map((rawPost) => renameRepliesToAnswers(getPostDataFromMesh(rawPost)))
    : result?.posts.map((rawPost) => renameRepliesToAnswers(rawPost));
};

export const getDocumentationMenu = async (communityId) => {
  const result = await executeQuery(
    {
      query: queries.DocumentationMenu[graphService],
      variables: {
        id: communityId,
      },
    },
    false,
  );
  return isMeshService ? result?.communitydocumentation[0] : result?.communityDocumentation;
};

export const getPost = async (postId) => {
  const result = await executeQuery(
    {
      query: queries.Post[graphService],
      variables: {
        postId,
      },
    },
    false,
  );
  return isMeshService
    ? renameRepliesToAnswers(getPostDataFromMesh(result.post[0]))
    : renameRepliesToAnswers(result.post);
};

export const getVoteHistory = async (postId, userId) => {
  const result = await executeQuery(
    {
      query: voteHistory,
      variables: {
        postId,
        userId,
      },
    },
    false,
  );
  return result.postvotehistory[0]?.direction;
};

export const getReply = async (replyId) => {
  const result = await executeQuery(
    {
      query: replyQuery,
      variables: {
        replyId,
      },
    },
    false,
  );
  return getReplyDataFromMesh(result.reply[0], []);
};

export const getReplyId2 = async (answerId) => {
  const result = await executeQuery(
    {
      query: replyId2QueryMesh,
      variables: {
        replyId: answerId,
      },
    },
    false,
  );
  return result.reply[0].id2;
};

export const getCommentId2 = async (commentId) => {
  const result = await executeQuery(
    {
      query: commentId2QueryMesh,
      variables: {
        commentId,
      },
    },
    false,
  );

  return result.comment[0].id2;
};

export const postsForSearch = async (text, single) => {
  const cleanedText = text.replace(/\s+/g, ' ').trim();
  const query = isMeshService
    ? cleanedText
    : cleanedText.split(' ').reduce((textChar, word) => {
        if (textChar.length === 0) {
          return `${word}:*`;
        }
        return `${textChar} & ${word}:*`;
      }, '');

  const gqlQuery = isMeshService
    ? queries.PostsForSearch.Mesh(query)
    : queries.PostsForSearch.TheGraph;

  const result = await executeQuery({
    query: gqlQuery,
    variables: {
      text: query,
      first: 100,
    },
  });

  const posts = isMeshService
    ? result?.post.map((item) => {
        const { user, posttag, ...post } = item;
        const tags = posttag.map((postTag) => postTag.tag[0]);
        return {
          ...post,
          tags,
          author: getUserDataFromMesh(user[0]),
        };
      })
    : result?.postSearch;
  return posts.filter((post) => !post.isDeleted && (single ? post.communityId === single : true));
};

export const getAllAchievements = async (userId) => {
  const response = await executeQuery({
    query: queries.AllAchievements[graphService],
    variables: {
      userId: userId.toLowerCase(),
    },
  });

  return isMeshService
    ? {
        allAchievements: response?.achievement,
        userAchievements:
          response?.user[0].userachievement.map(({ achievementId }) => ({
            id: achievementId,
          })) || [],
      }
    : {
        allAchievements: response?.achievements
          .map((achievement) => ({
            ...achievement,
            id: Number(achievement.id),
          }))
          .sort((x, y) => x.id - y.id),
        userAchievements: response?.user?.achievements || [],
      };
};

export const getRewardStat = async (userId, ethereumService) => {
  const isOldUser = await isUserExists(userId, ethereumService);
  const periodsCount = isOldUser ? 2 : 1;

  const query = isMeshService ? queries.Rewards.Mesh(periodsCount) : queries.Rewards.TheGraph;

  const response = await executeQuery(
    {
      query,
      variables: {
        userId,
        periodsCount,
      },
    },
    false,
  );

  const rewards = isMeshService ? response?.userreward : response?.userRewards;
  const periods = isMeshService ? response?.period : response?.periods;
  const user = isMeshService ? getUserDataFromMesh(response?.user[0]) : response?.user;
  return [rewards, periods, user];
};

export const getCurrentPeriod = async () => {
  const response = await executeQuery({
    query: queries.CurrentPeriod[graphService],
  });
  return isMeshService ? response?.period[0] : response?.periods[0];
};

export const historiesForPost = async (postId) => {
  const response = await executeQuery({
    query: queries.Histories[graphService],
    variables: {
      postId,
    },
  });
  return isMeshService
    ? response?.history.map((history) => getHistoryDataFromMesh(history))
    : response?.histories;
};
