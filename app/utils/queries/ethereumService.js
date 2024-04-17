import { gql } from '@apollo/client';
import { isMeshServiceConfig } from 'communities-config';

import { dataToString, arrayToString } from 'utils/converters';
import { isUserExists } from 'utils/accountManagement';
import { metaQueryGraph } from 'utils/queries/QueriesGraph';

import { queries } from './QueryService';
import {
  postsIdsByTagsQueryMesh,
  replyId2QueryMesh,
  commentId2QueryMesh,
  voteHistoryMesh,
  postsCountByCommQueryMesh,
} from './QueriesMesh';
import {
  executeMeshQuery,
  getUserDataFromMesh,
  getReplyDataFromMesh,
  getPostDataFromMesh,
  renameRepliesToAnswers,
  getHistoryDataFromMesh,
  getPostsDataFromMesh,
} from './meshModel';
import { client } from './graphModel';
import { MESH_MODEL, GRAPH_MODEL } from './constants';

export const queryOnlyFromIndexer = async (ethereumService) => {
  const isMeshService = isMeshServiceConfig();

  if (!isMeshService) {
    const result = await executeQuery(
      isMeshService,
      {
        query: metaQueryGraph,
      },
      false,
    );
    const blockFromEthereum = await ethereumService.getBlock();
    const blockFromGraph = result._meta.block.number;
    const delay = blockFromEthereum - blockFromGraph;
    console.log('Lag of', delay, 'blocks');
    if (delay > 1) {
      return true;
    }
    return false;
  }
};

const executeQuery = async (isMeshService, { query, variables }, enableCache = true) => {
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
  orderBy = 'creationTime', // does this value change?
  sorting = 'desc',
}) => {
  const isMeshService = isMeshServiceConfig();
  const UsersOrderBy = sorting === 'desc' ? 'CREATION_TIME_DESC' : 'CREATION_TIME_ASC';

  const query = isMeshService ? queries.Users.Mesh(UsersOrderBy) : queries.Users.TheGraph;

  const result = await executeQuery(isMeshService, {
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
  const isMeshService = isMeshServiceConfig();
  const query = isMeshService
    ? queries.Moderation.Mesh(arrayToString(roles))
    : queries.Moderation.TheGraph;

  const result = await executeQuery(
    isMeshService,
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
        user: getUserDataFromMesh(user),
      }))
    : [...result.userPermissions];
};

export const getUsersByCommunity = async ({ limit = 50, skip: offset, communityId }) => {
  const isMeshService = isMeshServiceConfig();
  const modelService = isMeshService ? MESH_MODEL : GRAPH_MODEL;
  const result = await executeQuery(isMeshService, {
    query: queries.UsersByCommunity[modelService],
    variables: {
      limit,
      offset,
      communityId,
    },
  });
  return isMeshService
    ? result.usercommunityrating.map((item) => getUserDataFromMesh(item.user))
    : result.userCommunityRatings.map((item) => item.user);
};

// Default request
// export const getUser = async (id) => {
//   const result = await executeQuery({
//     query: queries.User[modelService],
//     variables: {
//       id: dataToString(id).toLowerCase(),
//     },
//   });
//   if (isMeshService ? !result.userById : !result.user) {
//     return false;
//   }
//   return isMeshService ? getUserDataFromMesh(result.userById) : { ...result.user };
// };

export const getUser = async (id, isProfilePage) => {
  const isMeshService = isMeshServiceConfig();
  const modelService = isMeshService ? MESH_MODEL : GRAPH_MODEL;

  let data;
  if (isMeshService || isProfilePage) {
    const result = await executeMeshQuery({
      query: queries.User.Mesh,
      variables: {
        id: dataToString(id).toLowerCase(),
      },
    });
    data = result?.data;
  } else {
    const result = await client.query({
      query: gql(queries.User.TheGraph),
      variables: {
        id: dataToString(id).toLowerCase(),
      },
      fetchPolicy: undefined,
    });
    data = result?.data;
  }

  if (isMeshService || isProfilePage ? !data.userById : !data.user) {
    return {};
  }
  let userPermissions = [];
  if (!isMeshService || !isProfilePage) {
    const permissionsResult = await executeQuery(isMeshService, {
      query: queries.UserPermissions[modelService],
      variables: {
        id: dataToString(id).toLowerCase(),
      },
    });
    userPermissions = permissionsResult?.userPermissions?.map(
      (userPermission) => userPermission.permission,
    );
  }
  return isMeshService || isProfilePage
    ? getUserDataFromMesh(data.userById)
    : { ...data.user, permissions: userPermissions };
};

export const getUserPermissions = async (id) => {
  const isMeshService = isMeshServiceConfig();
  const modelService = isMeshService ? MESH_MODEL : GRAPH_MODEL;

  const result = await executeQuery(isMeshService, {
    query: queries.UserPermissions[modelService],
    variables: {
      id: dataToString(id).toLowerCase(),
    },
  });
  return isMeshService
    ? result.userpermission?.map((p) => p.permission)
    : result.userPermissions?.map((p) => p.permission);
};

export const getUserStats = async (id) => {
  const isMeshService = isMeshServiceConfig();
  const modelService = isMeshService ? MESH_MODEL : GRAPH_MODEL;

  const result = await executeQuery(
    isMeshService,
    {
      query: queries.UserStats[modelService],
      variables: {
        id: dataToString(id).toLowerCase(),
      },
    },
    false,
  );
  return isMeshService ? getUserDataFromMesh(result.userById) : result.user;
};

// Default request
// export const getUsersQuestions = async (id, limit, offset) => {
//   const result = await executeQuery(
//     {
//       query: queries.UserPosts[modelService],
//       variables: {
//         id,
//         limit,
//         offset,
//       },
//     },
//     false,
//   );
//   return isMeshService
//     ? result?.post.map((post) => getPostDataFromMesh(post))
//     : result?.posts.map((post) => ({ ...post }));
// };

export const getUsersQuestions = async (id, limit, offset) => {
  const result = await executeMeshQuery({
    query: queries.UserPosts.Mesh,
    variables: {
      id,
      limit,
      offset,
    },
  });
  return result?.data?.post.map((post) => getPostDataFromMesh(post));
};

// Default request
// export const getUsersAnsweredQuestions = async (id, limit, offset) => {
//   const postIds = await executeQuery(
//     {
//       query: queries.UserAnswers[modelService],
//       variables: {
//         id,
//         limit,
//         offset,
//       },
//     },
//     false,
//   );

//   const ids = isMeshService
//     ? postIds.reply.map((reply) => reply.postId)
//     : postIds.replies.map((reply) => reply.postId);
//   const query = isMeshService
//     ? queries.AnsweredPosts.Mesh(arrayToString(ids))
//     : queries.AnsweredPosts.TheGraph;

//   const answeredPosts = await executeQuery({
//     query,
//     variables: {
//       ids,
//     },
//   });
//   return isMeshService
//     ? answeredPosts?.post.map((post) => getPostDataFromMesh(post))
//     : answeredPosts?.posts.map((post) => ({ ...post }));
// };

export const getUsersAnsweredQuestions = async (id, limit, offset) => {
  const postIdsResult = await executeMeshQuery({
    query: queries.UserAnswers.Mesh,
    variables: { id, limit, offset },
  });
  const postIds = postIdsResult?.data;

  const ids = postIds.reply.map((reply) => reply.postId);

  const answeredPostsResult = await executeMeshQuery({
    query: queries.AnsweredPosts.Mesh(arrayToString(ids)),
    variables: { ids },
  });
  const answeredPosts = answeredPostsResult?.data;

  return answeredPosts?.post.map((post) => getPostDataFromMesh(post));
};

// Default request
// export const getCommunities = async () => {
//   const communities = await executeQuery({
//     query: queries.Communities[modelService],
//   });
//   return isMeshService ? communities?.community : communities?.communities;
// };

export const getCommunities = async () => {
  const communities = await executeMeshQuery({ query: queries.Communities.Mesh });
  return communities?.data?.community;
};

export const getCommunityById = async (id) => {
  const isMeshService = isMeshServiceConfig();
  const modelService = isMeshService ? MESH_MODEL : GRAPH_MODEL;

  const community = await executeQuery(isMeshService, {
    query: queries.Community[modelService],
    variables: {
      id,
    },
  });
  return isMeshService
    ? { ...community?.communityById, translations: community?.communityById.communitytranslation }
    : community?.community;
};

export const getTags = async (communityId) => {
  const isMeshService = isMeshServiceConfig();
  const modelService = isMeshService ? MESH_MODEL : GRAPH_MODEL;

  const result = await executeQuery(isMeshService, {
    query: queries.Tags[modelService],
    variables: {
      communityId,
    },
  });
  return isMeshService ? result?.tag : result?.tags;
};

export const getTagsByIds = async (ids) => {
  const isMeshService = isMeshServiceConfig();

  const query = isMeshService
    ? queries.TagsByIds.Mesh(arrayToString(ids))
    : queries.TagsByIds.TheGraph;

  const result = await executeQuery(isMeshService, {
    query,
    variables: {
      ids,
    },
  });
  return isMeshService ? result?.tag : result?.tags;
};

export const getPosts = async (limit, offset, postTypes, indexerOnly) => {
  const isMeshService = indexerOnly ? true : isMeshServiceConfig();

  const query = isMeshService
    ? queries.Posts.Mesh(arrayToString(postTypes))
    : queries.Posts.TheGraph;

  const result = await executeQuery(
    isMeshService,
    {
      query,
      variables: {
        limit,
        offset,
        postTypes,
      },
    },
    false,
  );

  return isMeshService
    ? getPostsDataFromMesh(result)
    : result?.posts.map((post) => renameRepliesToAnswers(post));
};

export const getPostsByCommunityId = async (
  limit,
  skip,
  postTypes,
  communityIds,
  tags,
  indexerOnly,
) => {
  const isMeshService = indexerOnly ? true : isMeshServiceConfig();
  if (tags?.length) {
    let postIds;
    if (isMeshService) {
      const tagResponse = await executeMeshQuery({
        query: postsIdsByTagsQueryMesh,
        variables: { tagIds: tags, postTypes, first: limit, offset: skip },
      });
      postIds = tagResponse.data.filterposttagbytagids;
    }

    const query = isMeshService
      ? queries.PostsByCommAndTags.Mesh
      : queries.PostsByCommAndTags.TheGraph;
    const result = await executeQuery(isMeshService, {
      query,
      variables: {
        communityIds,
        first: limit,
        skip,
        postTypes,
        tags,
        ids: postIds,
      },
    });

    return isMeshService
      ? getPostsDataFromMesh(result)
      : {
          postCount: result?.posts.length,
          updatedPosts: result?.posts.map((rawPost) => renameRepliesToAnswers(rawPost)),
        };
  }

  const query = isMeshService
    ? queries.PostsByCommunity.Mesh(arrayToString(postTypes), arrayToString(communityIds))
    : queries.PostsByCommunity.TheGraph;

  const result = await executeQuery(
    isMeshService,
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
  let count = 0;
  let posts = [];
  if (!isMeshService) {
    const postCountResult = await executeMeshQuery({
      query: postsCountByCommQueryMesh(arrayToString(postTypes), arrayToString(communityIds)),
      variables: {
        communityIds,
        postTypes,
      },
    });
    count = postCountResult?.data?.postsConnection.totalCount;
    posts = result?.posts.map((rawPost) => renameRepliesToAnswers(rawPost));
  }
  return isMeshService
    ? getPostsDataFromMesh(result)
    : {
        postCount: count,
        updatedPosts: posts,
      };
};

export const getDocumentationMenu = async (communityId) => {
  const isMeshService = isMeshServiceConfig();
  const modelService = isMeshService ? MESH_MODEL : GRAPH_MODEL;

  const result = await executeQuery(
    isMeshService,
    {
      query: queries.DocumentationMenu[modelService],
      variables: {
        id: communityId,
      },
    },
    false,
  );
  return isMeshService ? result?.communitydocumentationById : result?.communityDocumentation;
};

export const getPost = async (postId, indexerOnly) => {
  const isMeshService = indexerOnly ? true : isMeshServiceConfig();
  const modelService = isMeshService ? MESH_MODEL : GRAPH_MODEL;

  const result = await executeQuery(
    isMeshService,
    {
      query: queries.Post[modelService],
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

export const getVoteHistory = async (postId, userId, indexerOnly) => {
  const isMeshService = indexerOnly ? true : isMeshServiceConfig();

  const result = await executeQuery(
    isMeshService,
    {
      query: voteHistoryMesh,
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
  const isMeshService = isMeshServiceConfig();
  const modelService = isMeshService ? MESH_MODEL : GRAPH_MODEL;

  const result = await executeQuery(isMeshService, {
    query: queries.Reply[modelService],
    variables: {
      replyId,
    },
  });
  return isMeshService ? getReplyDataFromMesh(result.reply[0], []) : result.reply;
};

export const getReplyId2 = async (answerId) => {
  const isMeshService = isMeshServiceConfig();

  const result = await executeQuery(
    isMeshService,
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
  const isMeshService = isMeshServiceConfig();

  const result = await executeQuery(
    isMeshService,
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
  const isMeshService = isMeshServiceConfig();

  const cleanedText = text.replace(/\s+/g, ' ').trim();
  const query = isMeshService
    ? cleanedText
    : cleanedText.split(' ').reduce((textChar, word) => {
        if (textChar.length === 0) {
          return `${word}:*`;
        }
        return `${textChar} & ${word}:*`;
      }, '');

  const gqlQuery = isMeshService ? queries.PostsForSearch.Mesh : queries.PostsForSearch.TheGraph;

  const result = await executeQuery(isMeshService, {
    query: gqlQuery,
    variables: {
      text: query,
      first: 100,
    },
  });

  const posts = isMeshService
    ? result?.post.map((item) => {
        const { user, posttag, ...post } = item;
        const tags = posttag.map((postTag) => postTag.tag);
        return {
          ...post,
          tags,
          author: getUserDataFromMesh(user),
        };
      })
    : result?.postSearch;
  return posts.filter((post) => !post.isDeleted && (single ? post.communityId === single : true));
};

// Default request
// export const getAllAchievements = async (userId) => {
//   console.log(getAllAchievements,'getAllAchievements<---');
//   const response = await executeQuery({
//     query: queries.AllAchievements[modelService],
//     variables: {
//       userId: userId.toLowerCase(),
//     },
//   });

//   return isMeshService
//     ? {
//         allAchievements: response?.achievement,
//         userAchievements:
//           response?.user[0]?.userachievement.map(({ achievementId, ...achievement }) => ({
//             ...achievement,
//             id: achievementId,
//           })) || [],
//       }
//     : {
//         allAchievements: response?.achievements
//           .map((achievement) => ({
//             ...achievement,
//             id: achievement.id,
//           }))
//           .sort((x, y) => Number(x.id.split('-')[1]) - Number(y.id.split('-')[1])),
//         userAchievements: response?.user?.achievements || [],
//       };
// };

export const getAllAchievements = async (userId) => {
  const achievementResponse = await executeMeshQuery({
    query: queries.AllAchievements.Mesh,
    variables: { userId: userId.toLowerCase() },
  });

  const response = achievementResponse?.data;
  return {
    allAchievements: response?.achievement,
    userAchievements:
      response?.user[0]?.userachievement.map(({ achievementId, ...achievement }) => ({
        ...achievement,
        id: achievementId,
      })) || [],
  };
};

export const getRewardStat = async (userId, ethereumService) => {
  const isMeshService = isMeshServiceConfig();

  const isOldUser = await isUserExists(userId, ethereumService);
  const periodsCount = isOldUser ? 2 : 1;

  const query = isMeshService ? queries.Rewards.Mesh(periodsCount) : queries.Rewards.TheGraph;

  const response = await executeQuery(
    isMeshService,
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
  const isMeshService = isMeshServiceConfig();
  const modelService = isMeshService ? MESH_MODEL : GRAPH_MODEL;

  const response = await executeQuery(isMeshService, {
    query: queries.CurrentPeriod[modelService],
  });
  return isMeshService ? response?.period[0] : response?.periods[0];
};

export const historiesForPost = async (postId) => {
  const isMeshService = isMeshServiceConfig();
  const modelService = isMeshService ? MESH_MODEL : GRAPH_MODEL;

  const response = await executeQuery(isMeshService, {
    query: queries.Histories[modelService],
    variables: {
      postId,
    },
  });
  return isMeshService
    ? response?.history.map((history) => getHistoryDataFromMesh(history))
    : response?.histories;
};
