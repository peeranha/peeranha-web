import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { POST_TYPE } from './utils/constants';
import { updateTitle } from './utils/seo';
import { getIpfsHashFromBytes32 } from 'utils/ipfs';

const userRedirect = (where) => (id) => `/users/${id}${where}`;

const singleCommId = isSingleCommunityWebsite();

export const home = () => (singleCommId ? `/about` : `/`);

export const notFound = (type) => `/404?${type}`;
export const errorPage = () => `/error-occured`;

export const profileView = userRedirect('');
export const profileEdit = (id) => `/users/edit/${id}`;

export const userQuestions = userRedirect('#discussions');
export const userCommunities = userRedirect('#communities');
export const userAnswers = userRedirect('#answers');
export const userSettings = userRedirect('#settings');
export const userNotifications = userRedirect('#notifications');
export const userNFTs = userRedirect('#nfts');
export const userModeration = userRedirect('#moderation');
export const userWallet = userRedirect('/wallet');
export const userBoost = userRedirect('/boost');
export const uniqueAnswerId = (answerId) => `ans${answerId}`;

export const questions = (communityId, paginationPage = 1) => {
  const paginationRoute = paginationPage > 1 ? `?page=${paginationPage}` : '';
  const communityRoute = communityId ? `/community/${communityId}` : '';
  return `/discussions${communityRoute}${paginationRoute}`;
};

export const expertPosts = (communityId, paginationPage = 1) => {
  const paginationRoute = paginationPage > 1 ? `?page=${paginationPage}` : '';
  const communityRoute = communityId ? `/community/${communityId}` : '';
  return `/experts${communityRoute}${paginationRoute}`;
};

export const tutorials = (communityId, paginationPage = 1) => {
  const paginationRoute = paginationPage > 1 ? `?page=${paginationPage}` : '';
  const communityRoute = communityId ? `/community/${communityId}` : '';
  return `/tutorials${communityRoute}${paginationRoute}`;
};

export const questionView = (id, title, answerId, isOldURL) => {
  const updatedTitle = updateTitle(title);

  if (isOldURL) {
    return answerId
      ? `/questions/${id}/${updatedTitle}#${uniqueAnswerId(answerId)}`
      : `/questions/${id}/${updatedTitle}`;
  }

  return answerId
    ? `/discussions/${id}/${updatedTitle}#${uniqueAnswerId(answerId)}`
    : `/discussions/${id}/${updatedTitle}`;
};

export const expertPostView = (id, title, answerId) => {
  const updatedTitle = updateTitle(title);

  return answerId
    ? `/experts/${id}/${updatedTitle}#${uniqueAnswerId(answerId)}`
    : `/experts/${id}/${updatedTitle}`;
};

export const tutorialView = (id, title, answerId) => {
  const updatedTitle = updateTitle(title);

  return answerId
    ? `/tutorials/${id}/${updatedTitle}#${uniqueAnswerId(answerId)}`
    : `/tutorials/${id}/${updatedTitle}`;
};

export const getPostRoute = ({ postType, id, answerId = null, title }) => {
  if (postType === POST_TYPE.generalPost) {
    return questionView(id, title, answerId);
  }
  if (postType === POST_TYPE.expertPost) {
    return expertPostView(id, title, answerId);
  }
  if (postType === POST_TYPE.documentation) {
    return documentation(getIpfsHashFromBytes32(id), title);
  }
  return tutorialView(id, title);
};

export const questionEdit = (postType, questionId, title) =>
  `/${postType}/${questionId}/${updateTitle(title)}/edit`;

export const answerEdit = (questionId, answerId) =>
  !singleCommId
    ? `/discussions/${questionId}/answers/${answerId}/edit`
    : `/${questionId}/answers/${answerId}/edit`;

export const questionAsk = () => '/ask';

export const documentationCreate = (parentId) =>
  parentId ? `/documentation/${parentId}/create` : `/documentation/create`;

export const documentationEdit = (id) => `/documentation/${id}/edit`;

export const noAccess = () => `/no-access`;

export const detailsHomePage = () => '/';

export const feed = (communityId, paginationPage = 1) => {
  const paginationRoute = paginationPage > 1 ? `?page=${paginationPage}` : '';
  const communityRoute = communityId ? `/${communityId}` : '';
  return `/feed${communityRoute}${paginationRoute}`;
};

export const communities = () => `/communities`;
export const subcommunities = () => `/subcommunities`;

export const users = () => '/users';

export const faq = (code) => `/faq${code ? `#${code}` : ``}`;
export const administration = () => `/administration`;
export const moderation = (code) => `#moderation${code ? `#${code}` : ``}`;
export const support = (section) => `/support/${section ? `#${section}` : ''}`;
export const search = (q) => `/search/${q || ''}`;

export const supportForm = () => '/support/#support_form';

export const privacyPolicy = (section) => `/privacy-policy/${section ? `#${section}` : ''}`;

export const termsAndConditions = (section) =>
  `/terms-and-conditions/${section ? `#${section}` : ''}`;

export const communitiesCreate = () => `/communities/create`;
export const communitiesEdit = (communityId) => `/communities/${communityId}/edit`;
export const communitiesCreatedBanner = () => `/communities/create#banner`;

export const communityTags = (communityId) =>
  !singleCommId ? `/communities/${communityId}/tags` : `/tags`;

export const tagsCreate = (communityId) =>
  !singleCommId ? `/tags/community/${communityId || 0}/create` : `/tags/create`;

export const editTag = (communityId, tagId) =>
  !singleCommId ? `/communities/${communityId}/tags/${tagId}/edit` : `/tags/${tagId}/edit`;

export const registrationStage = 'signup';

export const preloaderPage = () => '/preloader-page';

export const documentation = (sectionId, title) =>
  `/documentation/${sectionId}/${updateTitle(title)}`;
export const documentationStartPage = () => `/`;
export const redirectRoutesForSCM = [privacyPolicy(), termsAndConditions(), support(), home()];

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
};
