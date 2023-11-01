import {
  usersQueryGraph,
  userQueryGraph,
  historiesQueryGraph,
  allAchievementsQueryGraph,
  currentPeriodQueryGraph,
  moderationQueryGraph,
  usersByCommunityQueryGraph,
  rewardsQueryGraph,
  postQueryGraph,
  postsForSearchQueryGraph,
  documentationMenuQueryGraph,
  communityDocumentationQueryGraph,
  faqByCommQueryGraph,
  postsByCommQueryGraph,
  postsQueryGraph,
  tagsQueryGraph,
  communityQueryGraph,
  allTagsQueryGraph,
  answeredPostsQueryGraph,
  userPermissionsQueryGraph,
  userStatsQueryGraph,
  communitiesQueryGraph,
  usersPostsQueryGraph,
  usersAnswersQueryGraph,
  postsByCommAndTagsQueryGraph,
  tagsByIdsQueryGraph,
} from './QueriesGraph';
import {
  usersQueryMesh,
  userQueryMesh,
  historiesQueryMesh,
  allAchievementsQueryMesh,
  currentPeriodQueryMesh,
  moderationQueryMesh,
  usersByCommunityQueryMesh,
  rewardsQueryMesh,
  postQueryMesh,
  postsForSearchQueryMesh,
  documentationMenuQueryMesh,
  communityDocumentationQueryMesh,
  faqByCommQueryMesh,
  postsByCommQueryMesh,
  postsQueryMesh,
  tagsQueryMesh,
  communityQueryMesh,
  allTagsQueryMesh,
  answeredPostsQueryMesh,
  userPermissionsQueryMesh,
  userStatsQueryMesh,
  communitiesQueryMesh,
  usersPostsQueryMesh,
  usersAnswersQueryMesh,
  postsByCommAndTagsQueryMesh,
  tagsByIdsQueryMesh,
} from './QueriesMesh';

enum QueryName {
  User,
  Users,
  Moderation,
  UsersByCommunity,
  Histories,
  CurrentPeriod,
  Rewards,
  AllAchievements,
  Post,
  PostsForSearch,
  DocumentationMenu,
  CommunityDocumentation,
  FaqByComm,
  PostsByCommunity,
  Posts,
  Tags,
  Community,
  AllTags,
  AnsweredPosts,
  UserPermissions,
  UserStats,
  Communities,
  UserPosts,
  UserAnswers,
  PostsByCommAndTags,
  TagsByIds,
}

enum GraphService {
  TheGraph,
  Mesh,
}

type functionType = (...params: any[]) => string;

export const queries: {
  [queryKey in keyof typeof QueryName]: {
    [serviceKey in keyof typeof GraphService]: string | functionType;
  };
} = {
  Users: {
    TheGraph: usersQueryGraph,
    Mesh: usersQueryMesh,
  },
  User: {
    TheGraph: userQueryGraph,
    Mesh: userQueryMesh,
  },
  Histories: {
    TheGraph: historiesQueryGraph,
    Mesh: historiesQueryMesh,
  },
  AllAchievements: {
    TheGraph: allAchievementsQueryGraph,
    Mesh: allAchievementsQueryMesh,
  },
  CurrentPeriod: {
    TheGraph: currentPeriodQueryGraph,
    Mesh: currentPeriodQueryMesh,
  },
  Moderation: {
    TheGraph: moderationQueryGraph,
    Mesh: moderationQueryMesh,
  },
  UsersByCommunity: {
    TheGraph: usersByCommunityQueryGraph,
    Mesh: usersByCommunityQueryMesh,
  },
  Rewards: {
    TheGraph: rewardsQueryGraph,
    Mesh: rewardsQueryMesh,
  },
  Post: {
    TheGraph: postQueryGraph,
    Mesh: postQueryMesh,
  },
  PostsForSearch: {
    TheGraph: postsForSearchQueryGraph,
    Mesh: postsForSearchQueryMesh,
  },
  DocumentationMenu: {
    TheGraph: documentationMenuQueryGraph,
    Mesh: documentationMenuQueryMesh,
  },
  CommunityDocumentation: {
    TheGraph: communityDocumentationQueryGraph,
    Mesh: communityDocumentationQueryMesh,
  },
  FaqByComm: {
    TheGraph: faqByCommQueryGraph,
    Mesh: faqByCommQueryMesh,
  },
  PostsByCommunity: {
    TheGraph: postsByCommQueryGraph,
    Mesh: postsByCommQueryMesh,
  },
  Posts: {
    TheGraph: postsQueryGraph,
    Mesh: postsQueryMesh,
  },
  Tags: {
    TheGraph: tagsQueryGraph,
    Mesh: tagsQueryMesh,
  },
  Community: {
    TheGraph: communityQueryGraph,
    Mesh: communityQueryMesh,
  },
  AllTags: {
    TheGraph: allTagsQueryGraph,
    Mesh: allTagsQueryMesh,
  },
  AnsweredPosts: {
    TheGraph: answeredPostsQueryGraph,
    Mesh: answeredPostsQueryMesh,
  },
  UserPermissions: {
    TheGraph: userPermissionsQueryGraph,
    Mesh: userPermissionsQueryMesh,
  },
  UserStats: {
    TheGraph: userStatsQueryGraph,
    Mesh: userStatsQueryMesh,
  },
  Communities: {
    TheGraph: communitiesQueryGraph,
    Mesh: communitiesQueryMesh,
  },
  UserPosts: {
    TheGraph: usersPostsQueryGraph,
    Mesh: usersPostsQueryMesh,
  },
  UserAnswers: {
    TheGraph: usersAnswersQueryGraph,
    Mesh: usersAnswersQueryMesh,
  },
  PostsByCommAndTags: {
    TheGraph: postsByCommAndTagsQueryGraph,
    Mesh: postsByCommAndTagsQueryMesh,
  },
  TagsByIds: {
    TheGraph: tagsByIdsQueryGraph,
    Mesh: tagsByIdsQueryMesh,
  },
};
