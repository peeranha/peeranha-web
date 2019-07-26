/* eslint camelcase: 0 */
export const home = () => `/`;
export const faq = () => `/faq`;

export const profileView = id => `/users/${id}`;

export const profileViewActivityQuestions = id =>
  `/users/${id}#activity#questions`;

export const profileViewActivityAnswers = id => `/users/${id}#activity#answers`;

export const profileEdit = id => `/users/edit/${id}`;

export const userQuestions = id => `/users/${id}#questions`;
export const userAnswers = id => `/users/${id}#answers`;
export const userSettings = id => `/users/${id}/settings`;

export const questions = () => `/questions`;

export const uniqueAnswerId = answerId => `ans${answerId}`;

export const questionView = /* istanbul ignore next */ (id, answerId) =>
  answerId
    ? `/questions/${id}#${uniqueAnswerId(answerId)}`
    : `/questions/${id}`;

export const questionEdit = questionid => `/questions/${questionid}/edit`;

export const answerEdit = (questionid, answerid) =>
  `/questions/${questionid}/answers/${answerid}/edit`;

export const questionAsk = () => `/questions/ask`;

export const noAccess = () => `/no-access`;
export const feed = () => `/feed`;
export const communities = () => `/communities`;
export const tags = () => `/tags`;
export const users = () => `/users`;
export const appFaq = () => `/app/faq`;
export const support = () => `/support`;

export const communitiesCreate = () => `/communities/create`;
export const suggestedCommunities = () => `/communities/suggested`;
export const communityTags = communityid => `/communities/${communityid}/tags`;

export const suggestedTags = communityid =>
  `/communities/${communityid}/tags/suggested`;

export const tagsCreate = communityid =>
  `/communities/${communityid || 0}/tags/create`;

export const registrationStage = 'signup';

export const signup = {
  email: {
    step: 1,
    name: `/${registrationStage}/email`,
    scatter: false,
  },
  displayName: {
    step: 1,
    name: `/${registrationStage}/with-scatter/display-name`,
    scatter: true,
  },
  emailVerification: {
    step: 2,
    name: `/${registrationStage}/email-verification`,
    scatter: false,
  },
  haveEosAccount: {
    step: 3,
    name: `/${registrationStage}/i-have-eos-account`,
    scatter: false,
  },
  dontHaveEosAccount: {
    step: 3,
    name: `/${registrationStage}/i-dont-have-eos-account`,
    scatter: false,
  },
  almostDone: {
    step: 4,
    name: `/${registrationStage}/almost-done`,
    scatter: false,
  },
};

export const privacyPolicy = () => `/privacy-policy`;
