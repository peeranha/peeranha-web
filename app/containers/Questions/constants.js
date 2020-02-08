/*
 *
 * Questions constants
 *
 */

export const GET_QUESTIONS = 'app/Questions/GET_INIT_QUESTIONS';
export const GET_QUESTIONS_SUCCESS = 'app/Questions/GET_INIT_QUESTIONS_SUCCESS';
export const GET_QUESTIONS_ERROR = 'app/Questions/GET_INIT_QUESTIONS_ERROR';

export const GET_UNIQ_QUESTIONS = 'app/Questions/GET_UNIQ_QUESTIONS';
export const SET_TYPE_FILTER = 'app/Questions/SET_TYPE_FILTER';
export const SET_CREATED_FILTER = 'app/Questions/SET_CREATED_FILTER';

export const TOP_COMMUNITY_DISPLAY_MIN_RATING = !process.env.IS_TEST_ENV ? 10 : 3;
