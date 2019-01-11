import {
  getQuestions,
  getQuestionsSuccess,
  getQuestionsError,
  setDefaultReducer,
  followHandler,
  followHandlerSuccess,
  followHandlerErr,
} from '../actions';

import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  SET_DEFAULT_REDUCER,
  FOLLOW_HANDLER,
  FOLLOW_HANDLER_SUCCESS,
  FOLLOW_HANDLER_ERROR,
} from '../constants';

describe('actions', () => {
  describe('followHandler Action', () => {
    it('FOLLOW_HANDLER', () => {
      const communityIdFilter = 'limit';
      const isFollowed = 'offset';

      const expected = {
        type: FOLLOW_HANDLER,
        communityIdFilter,
        isFollowed,
      };

      expect(followHandler(communityIdFilter, isFollowed)).toEqual(expected);
    });
  });

  describe('followHandlerSuccess Action', () => {
    it('FOLLOW_HANDLER_SUCCESS', () => {
      const followedCommunities = 'limit';

      const expected = {
        type: FOLLOW_HANDLER_SUCCESS,
        followedCommunities,
      };

      expect(followHandlerSuccess(followedCommunities)).toEqual(expected);
    });
  });

  describe('followHandlerErr Action', () => {
    it('FOLLOW_HANDLER_ERROR', () => {
      const followHandlerError = 'limit';

      const expected = {
        type: FOLLOW_HANDLER_ERROR,
        followHandlerError,
      };

      expect(followHandlerErr(followHandlerError)).toEqual(expected);
    });
  });

  describe('getQuestions Action', () => {
    it('GET_QUESTIONS', () => {
      const limit = 'limit';
      const offset = 'offset';
      const communityIdFilter = 'communityIdFilter';
      const parentPage = 'parentPage';
      const next = 'next';

      const expected = {
        type: GET_QUESTIONS,
        limit,
        offset,
        communityIdFilter,
        parentPage,
        next,
      };

      expect(
        getQuestions(limit, offset, communityIdFilter, parentPage, next),
      ).toEqual(expected);
    });
  });

  describe('getQuestionsSuccess Action', () => {
    it('GET_QUESTIONS_SUCCESS', () => {
      const questionsList = 'questionsList';
      const followedCommunities = 'followedCommunities';
      const next = 'next';

      const expected = {
        type: GET_QUESTIONS_SUCCESS,
        questionsList,
        followedCommunities,
        next,
      };

      expect(
        getQuestionsSuccess(questionsList, followedCommunities, next),
      ).toEqual(expected);
    });
  });

  describe('getQuestionsError Action', () => {
    it('GET_QUESTIONS_ERROR', () => {
      const questionsError = 'questionsError';

      const expected = {
        type: GET_QUESTIONS_ERROR,
        questionsError,
      };

      expect(getQuestionsError(questionsError)).toEqual(expected);
    });
  });

  describe('setDefaultReducer Action', () => {
    it('GET_NEXT_QUESTIONS_ERROR', () => {
      const expected = {
        type: SET_DEFAULT_REDUCER,
      };

      expect(setDefaultReducer()).toEqual(expected);
    });
  });
});
