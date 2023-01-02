/**
 *
 * Edit routes attentively - not to crash App routing
 *
 */

/* eslint camelcase: 0, prettier/prettier: 0 */
import {
  isSingleCommunityWebsite,
  getSingleCommunityDetails,
} from 'utils/communityManagement';
import { getIpfsHashFromBytes32 } from 'utils/ipfs';
import { REFERRAL_CODE_URI } from './containers/App/constants';
import { POST_TYPE } from './utils/constants';

const userRedirect = (where) => (id) => `/users/${id}${where}`;

const singleCommId = isSingleCommunityWebsite();
const isBloggerMode = getSingleCommunityDetails()?.isBlogger || false;

export const home = () => (singleCommId ? `/about` : `/`);

export const notFound = (type) => `/404?${type}`;
export const errorPage = () => `/error-occured`;

export const profileView = userRedirect('');
export const profileEdit = (id) => `/users/edit/${id}`;

export const userQuestions = userRedirect('#questions');
export const userCommunities = userRedirect('#communities');
export const userAnswers = userRedirect('#answers');
export const userSettings = userRedirect('#settings');
export const userNotifications = userRedirect('#notifications');
export const userNFTs = userRedirect('#nfts');
export const userModeration = userRedirect('#moderation');
export const userWallet = userRedirect('/wallet');
export const userBoost = userRedirect('/boost');
export const uniqueAnswerId = (answerId) => `ans${answerId}`;

export const questions = (communityId) =>
  !communityId
    ? `${!isBloggerMode ? '/questions' : '/questions'}`
    : `/questions/community/${communityId}/`;

export const expertPosts = (communityId) =>
  !communityId
    ? `${!isBloggerMode ? '/experts' : '/experts'}`
    : `/experts/community/${communityId}/`;

export const tutorials = (communityId) =>
  !communityId
    ? `${!isBloggerMode ? '/tutorials' : '/experts'}`
    : `/tutorials/community/${communityId}/`;

export const questionView = (id, answerId) =>
  answerId
    ? `/questions/${id}#${uniqueAnswerId(answerId)}`
    : `/questions/${id}`;

export const expertPostView = (id, answerId) =>
  answerId ? `/experts/${id}#${uniqueAnswerId(answerId)}` : `/experts/${id}`;

export const tutorialView = (id, answerId) =>
  answerId
    ? `/tutorials/${id}#${uniqueAnswerId(answerId)}`
    : `/tutorials/${id}`;

export const getPostRoute = (postType, id, answerId = null) => {
  if (postType === POST_TYPE.generalPost) {
    return questionView(id, answerId);
  }
  if (postType === POST_TYPE.expertPost) {
    return expertPostView(id, answerId);
  }
  if (postType === POST_TYPE.documentation) {
    return documentation(getIpfsHashFromBytes32(id));
  }
  return tutorialView(id);
};

export const questionEdit = (postType, questionId) =>
  `/${postType}/${questionId}/edit`;

export const answerEdit = (questionId, answerId) =>
  !singleCommId
    ? `/questions/${questionId}/answers/${answerId}/edit`
    : `/${questionId}/answers/${answerId}/edit`;

export const questionAsk = () => (!singleCommId ? `/questions/ask` : `/ask`);

export const documentationCreate = (parentId) =>
  parentId ? `/documentation/${parentId}/create` : `/documentation/create`;

export const documentationEdit = (id) => `/documentation/${id}/edit`;

export const noAccess = () => `/no-access`;

export const detailsHomePage = () => '/';

export const feed = (communityId) =>
  !singleCommId
    ? `/feed${communityId ? `/${communityId}` : ''}`
    : `/${communityId ? `feed/${communityId}` : 'feed'}`;

export const communities = () => (!isBloggerMode ? `/communities` : `/`);

export const tags = () => `/tags`;

export const users = () => '/users';

export const faq = (code) => `/faq${code ? `#${code}` : ``}`;
export const administration = () => `/administration`;
export const moderation = (code) => `#moderation${code ? `#${code}` : ``}`;
export const support = (section) => `/support/${section ? `#${section}` : ''}`;
export const search = (q) => `/search/${q || ''}`;

export const supportForm = () => '/support/#support_form';

export const privacyPolicy = (section) =>
  `/privacy-policy/${section ? `#${section}` : ''}`;

export const termsAndConditions = (section) =>
  `/terms-and-conditions/${section ? `#${section}` : ''}`;

export const communitiesCreate = () => `/communities/create`;
export const communitiesEdit = (communityId) =>
  !isBloggerMode ? `/communities/${communityId}/edit` : `/${communityId}/edit`;
export const communitiesCreatedBanner = () => `/communities/create#banner`;
export const suggestedCommunities = () => `/communities/suggested`;

export const communityTags = (communityId) =>
  !singleCommId ? `/communities/${communityId}/tags` : `/tags`;

export const suggestedTags = (communityId) =>
  !singleCommId
    ? `/communities/${communityId}/tags/suggested`
    : `/tags/suggested`;

export const tagsCreate = (communityId) =>
  !singleCommId ? `/tags/community/${communityId || 0}/create` : `/tags/create`;

export const editTag = (communityId, tagId) =>
  !singleCommId
    ? `/communities/${communityId}/tags/${tagId}/edit`
    : `/tags/${tagId}/edit`;

export const registrationStage = 'signup';

export const preloaderPage = () => '/preloader-page';

export const referralPage = (user) => `/?${REFERRAL_CODE_URI}=${user}`;

export const facebookDataDeletion = () => '/facebook-data-deletion';

export const documentation = (sectionId) => `/documentation/${sectionId}`;
export const documentationStartPage = () => `/`;
export const redirectRoutesForSCM = [
  privacyPolicy(),
  termsAndConditions(),
  support(),
  home(),
];

export const signup = {
  email: {
    step: 1,
    name: `/${registrationStage}/email`,
    scatter: false,
  },
  displayName: {
    step: 1,
    name: `/${registrationStage}/with-wallet/display-name`,
    scatter: true,
  },
  emailVerification: {
    step: 2,
    name: `/${registrationStage}/email-verification`,
    scatter: false,
  },
  accountSetup: {
    step: 3,
    name: `/${registrationStage}/account-setup`,
    scatter: false,
  },
  almostDoneWithAccount: {
    step: 4,
    name: `/${registrationStage}/account/almost-done`,
    scatter: false,
  },
  almostDoneNoAccount: {
    step: 4,
    name: `/${registrationStage}/almost-done`,
    scatter: false,
  },
};
