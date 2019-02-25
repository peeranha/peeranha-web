/* eslint camelcase: 0 */
export const home = () => `/`;
export const faq = () => `/faq`;

export const profile_view = id => `/users/${id}`;
export const profile_view_activity_questions = id =>
  `/users/${id}#activity#questions`;
export const profile_view_activity_answers = id =>
  `/users/${id}#activity#answers`;

export const profile_edit = id => `/users/edit/${id}`;

export const user_questions = id => `/users/${id}#questions`;
export const user_answers = id => `/users/${id}#answers`;
export const user_settings = id => `/users/${id}/settings`;

export const questions = () => `/questions`;

export const uniqAnswerId = answerId => `ans${answerId}`;

export const question_view = (id, answerId) =>
  answerId ? `/questions/${id}#${uniqAnswerId(answerId)}` : `/questions/${id}`;

export const question_edit = questionid => `/questions/${questionid}/edit`;

export const answer_edit = (questionid, answerid) =>
  `/questions/${questionid}/answers/${answerid}/edit`;

export const question_ask = () => `/questions/ask`;

export const no_access = () => `/no-access`;
export const feed = () => `/feed`;
export const communities = () => `/communities`;
export const tags = () => `/tags`;
export const users = () => `/users`;

export const communities_create = () => `/communities/create`;
export const suggestedCommunities = () => `/communities/suggested`;
export const communityTags = communityid => `/communities/${communityid}/tags`;
export const suggestedTags = communityid =>
  `/communities/${communityid}/tags/suggested`;
export const tags_create = communityid =>
  `/communities/${communityid}/tags/create`;
