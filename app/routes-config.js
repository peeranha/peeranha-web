/* eslint camelcase: 0 */
export const home = () => `/`;
export const profile_view = id => `/users/${id || ':id'}`;
export const profile_edit = id => `/users/edit/${id || ':id'}`;
export const questions = () => `/questions`;
export const question_view = id => `/questions/${id || ':id'}`;
export const question_ask = () => `/questions/ask`;
export const no_access = () => `/no-access`;
