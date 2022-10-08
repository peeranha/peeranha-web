/**
 *
 * Edit routes attentively - not to crash App routing
 *
 */

/* eslint camelcase: 0, prettier/prettier: 0 */
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { POST_TYPE } from './utils/constants';

const userRedirect = where => id => `/users/${id}${where}`;

const singleCommId = isSingleCommunityWebsite();

export const home = () => (singleCommId ? `/about` : `/`);

export const notFound = type => `/404?${type}`;
export const errorPage = () => `/error-occured`;

export const profileView = userRedirect('');
export const profileEdit = id => `/users/edit/${id}`;

export const userQuestions = userRedirect('#questions');
export const userCommunities = userRedirect('#communities');
export const userAnswers = userRedirect('#answers');
export const userSettings = userRedirect('#settings');
export const userNotifications = userRedirect('#notifications');
export const userNFTs = userRedirect('#nfts');
export const userModeration = userRedirect('#moderation');
export const userWallet = userRedirect('/wallet');
export const userBoost = userRedirect('/boost');
export const uniqueAnswerId = answerId => `ans${answerId}`;

export const questions = communityId =>
  !communityId ? `/questions` : `/questions/community/${communityId}/`;

export const expertPosts = communityId =>
  !communityId ? `/experts` : `/experts/community/${communityId}/`;

export const tutorials = communityId =>
  !communityId ? `/tutorials` : `/tutorials/community/${communityId}/`;

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
  return tutorialView(id);
};

export const questionEdit = (postType, questionId) =>
  `/${postType}/${questionId}/edit`;

export const answerEdit = (questionId, answerId) =>
  !singleCommId
    ? `/questions/${questionId}/answers/${answerId}/edit`
    : `/${questionId}/answers/${answerId}/edit`;

export const questionAsk = () => (!singleCommId ? `/questions/ask` : `/ask`);

export const noAccess = () => `/no-access`;

export const detailsHomePage = () => '/';

export const feed = communityId =>
  !singleCommId
    ? `/feed${communityId ? `/${communityId}` : ''}`
    : `/${communityId ? `feed/${communityId}` : ''}`;

export const communities = () => `/communities`;

export const tags = () => `/tags`;

export const users = () => '/users';

export const faq = code => `/faq${code ? `#${code}` : ``}`;
export const moderation = code => `#moderation${code ? `#${code}` : ``}`;
export const support = section => `/support/${section ? `#${section}` : ''}`;
export const search = q => `/search/${q || ''}`;

export const supportForm = () => '/support/#support_form';

export const privacyPolicy = section =>
  `/privacy-policy/${section ? `#${section}` : ''}`;

export const termsAndConditions = section =>
  `/terms-and-conditions/${section ? `#${section}` : ''}`;

export const communitiesCreate = () => `/communities/create`;
export const communitiesEdit = communityId =>
  `/communities/${communityId}/edit`;
export const communitiesCreatedBanner = () => `/communities/create#banner`;

export const communityTags = communityId =>
  !singleCommId ? `/communities/${communityId}/tags` : `/tags`;

export const tagsCreate = communityId =>
  !singleCommId ? `/tags/community/${communityId || 0}/create` : `/tags/create`;

export const editTag = (communityId, tagId) =>
  !singleCommId
    ? `/communities/${communityId}/tags/${tagId}/edit`
    : `/tags/${tagId}/edit`;

export const preloaderPage = () => '/preloader-page';

export const redirectRoutesForSCM = [
  privacyPolicy(),
  termsAndConditions(),
  support(),
  home(),
];
