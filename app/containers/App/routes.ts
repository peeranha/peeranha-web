import {
  EditCommunity,
  HomePage,
  Administration,
  Users,
  EditQuestion,
  EditProfilePage,
  ViewProfilePage,
  ErrorPage,
  Questions,
  AskQuestion,
  ViewQuestion,
  EditAnswer,
  CreateCommunity,
  TagsOfCommunity,
  CreateTag,
  EditTag,
  NoAccess,
  Home,
  Feed,
  Communities,
  Wallet,
  Boost,
  Search,
  Support,
  PrivacyPolicy,
  FullWidthPreloader,
  TermsOfService,
} from './imports';
import * as routes from 'routes-config';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import {
  hasCommunityAdminRole,
  hasGlobalModeratorRole,
  hasProtocolAdminRole,
} from 'utils/properties';
import { POST_TYPE, REWARD_CLAIMING_ENABLED } from 'utils/constants';
import Loader from 'components/LoadingIndicator/HeightWidthCentered';
import Documentation from 'app/pages/Documentation';

const single = isSingleCommunityWebsite();
const hasCommunityOrProtocolAdminRole =
  single &&
  (hasGlobalModeratorRole() || hasProtocolAdminRole() || hasCommunityAdminRole(null, single));

const routesConfig = [
  {
    path: routes.home(),
    exact: true,
    fallback: Loader,
    Component: HomePage,
  },
  {
    path: routes.preloaderPage(),
    exact: true,
    Component: FullWidthPreloader,
  },
  {
    path: routes.detailsHomePage(),
    exact: true,
    Component: Home,
  },
  {
    path: routes.feed(),
    exact: true,
    Component: Feed,
  },
  {
    path: routes.feed(':communityid'),
    Component: Feed,
    isRender: !single,
  },
  {
    path: routes.profileView(':id'),
    Component: ViewProfilePage,
  },
  {
    path: routes.profileEdit(':id'),
    Component: EditProfilePage,
  },
  {
    path: routes.communities(),
    exact: true,
    Component: Communities,
    isRender: !single,
  },
  {
    path: routes.communitiesCreate(),
    Component: CreateCommunity,
    isRender: !single,
  },
  {
    path: routes.communitiesEdit(':communityId'),
    Component: EditCommunity,
  },
  {
    path: routes.communityTags(':communityid'),
    exact: true,
    Component: TagsOfCommunity,
  },
  {
    path: routes.tagsCreate(':communityid'),
    Component: CreateTag,
  },
  {
    path: routes.editTag(':communityId', ':tagid'),
    Component: EditTag,
  },
  {
    path: routes.termsAndConditions(),
    exact: true,
    Component: TermsOfService,
  },
  {
    path: routes.userWallet(':id'),
    Component: Wallet,
  },
  {
    path: routes.userBoost(':id'),
    Component: Boost,
    isRender: REWARD_CLAIMING_ENABLED,
  },
  {
    path: routes.support(),
    Component: Support,
  },
  {
    path: routes.privacyPolicy(),
    Component: PrivacyPolicy,
  },
  {
    path: routes.questionAsk(),
    Component: AskQuestion,
  },
  {
    path: routes.documentationCreate(':parentId'),
    Component: AskQuestion,
  },
  {
    path: routes.documentationCreate(),
    Component: AskQuestion,
  },
  {
    path: routes.questionView(':id', ':title'),
    exact: true,
    Component: ViewQuestion,
  },
  {
    path: '/questions/:id',
    exact: true,
    Component: ViewQuestion,
  },
  {
    path: '/discussions/:id',
    exact: true,
    Component: ViewQuestion,
  },
  {
    path: routes.expertPostView(':id', ':title'),
    exact: true,
    Component: ViewQuestion,
  },
  {
    path: '/experts/:id',
    exact: true,
    Component: ViewQuestion,
  },
  {
    path: routes.tutorialView(':id', ':title'),
    exact: true,
    Component: ViewQuestion,
  },
  {
    path: '/tutorials/:id',
    exact: true,
    Component: ViewQuestion,
  },
  {
    path: routes.questionEdit(':postType', ':questionid', ':title'),
    Component: EditQuestion,
  },
  {
    path: routes.documentation(':sectionId', ':title'),
    Component: Documentation,
  },
  {
    path: routes.answerEdit(':questionid', ':answerid'),
    Component: EditAnswer,
  },
  {
    path: routes.users(),
    exact: true,
    Component: Users,
    isRender: hasGlobalModeratorRole() || hasProtocolAdminRole() || single,
  },
  {
    path: routes.administration(),
    exact: true,
    Component: Administration,
    isRender: single && hasCommunityOrProtocolAdminRole,
  },
  {
    path: routes.noAccess(),
    Component: NoAccess,
  },
  {
    path: routes.search(),
    exact: true,
    Component: Search,
  },
  {
    path: routes.errorPage(),
    Component: ErrorPage,
  },
  {
    path: routes.questions(),
    exact: true,
    Component: Questions,
    props: {
      postsTypes: [POST_TYPE.generalPost],
    },
  },
  {
    path: routes.expertPosts(),
    exact: true,
    Component: Questions,
    props: {
      postsTypes: [POST_TYPE.expertPost],
    },
  },
  {
    path: routes.questions(':communityid'),
    Component: Questions,
    props: {
      postsTypes: [POST_TYPE.generalPost],
    },
  },
  {
    path: routes.expertPosts(':communityid'),
    Component: Questions,
    props: {
      postsTypes: [POST_TYPE.expertPost],
    },
  },
  {
    path: routes.tutorials(),
    exact: true,
    Component: Questions,
    props: {
      postsTypes: [POST_TYPE.tutorial],
    },
  },
  {
    path: routes.tutorials(':communityid'),
    Component: Questions,
    props: {
      postsTypes: [POST_TYPE.tutorial],
    },
  },
];

export default routesConfig;
