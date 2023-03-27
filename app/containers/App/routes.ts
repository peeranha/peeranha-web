import {
  EditCommunity,
  HomePage,
  Faq,
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
  SuggestedTags,
  EditTag,
  NoAccess,
  Home,
  Feed,
  Communities,
  SuggestedCommunities,
  EmailEnteringForm,
  EmailVerificationForm,
  WalletsSignUpForm,
  SignUpViaEmail,
  RegistrationAlmostDoneWithAccount,
  RegistrationAlmostDoneNoAccount,
  Wallet,
  Boost,
  Search,
  Support,
  PrivacyPolicy,
  FullWidthPreloader,
  TermsOfService,
} from './imports';
import * as routes from 'routes-config';
import {
  isSingleCommunityWebsite,
  getSingleCommunityDetails,
} from 'utils/communityManagement';
import {
  hasCommunityAdminRole,
  hasGlobalModeratorRole,
  hasProtocolAdminRole,
} from 'utils/properties';
import { POST_TYPE, REWARD_CLAIMING_ENABLED } from 'utils/constants';
import Loader from 'components/LoadingIndicator/HeightWidthCentered';
import Documentation from 'pages/Documentation';
import { languagesEnum } from 'app/i18n';

const single = isSingleCommunityWebsite();
const isBloggerMode = getSingleCommunityDetails()?.isBlogger || false;
const hasCommunityOrProtocolAdminRole =
  single &&
  (hasGlobalModeratorRole() ||
    hasProtocolAdminRole() ||
    hasCommunityAdminRole(null, single));

export const removeLanguage = (path: string) => {
  for (let i = 0; i < Object.keys(languagesEnum).length; i++) {
    if (path.indexOf('/' + Object.keys(languagesEnum)[i] + '/') === 0) {
      return path.replace('/' + Object.keys(languagesEnum)[i], '');
    }
  }
  return path;
};

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
    isRender: !!isBloggerMode,
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
    path: routes.suggestedCommunities(),
    Component: SuggestedCommunities,
    isRender: !single,
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
    path: routes.suggestedTags(':communityid'),
    Component: SuggestedTags,
  },
  {
    path: routes.faq(),
    exact: true,
    Component: Faq,
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
    path: routes.signup.email.name,
    fallback: Loader,
    Component: EmailEnteringForm,
  },
  {
    path: routes.signup.emailVerification.name,
    fallback: true,
    Component: EmailVerificationForm,
  },
  {
    path: routes.signup.displayName.name,
    fallback: true,
    Component: WalletsSignUpForm,
  },
  {
    path: routes.signup.accountSetup.name,
    fallback: true,
    Component: SignUpViaEmail,
  },
  {
    path: routes.signup.almostDoneWithAccount.name,
    fallback: true,
    Component: RegistrationAlmostDoneWithAccount,
  },
  {
    path: routes.signup.almostDoneNoAccount.name,
    fallback: true,
    Component: RegistrationAlmostDoneNoAccount,
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
