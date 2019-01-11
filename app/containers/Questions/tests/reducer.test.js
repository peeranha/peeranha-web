import { fromJS } from 'immutable';

import questionsReducer, { initialState } from '../reducer';

import {
  getQuestions,
  getQuestionsSuccess,
  getQuestionsError,
  setDefaultReducer,
  followHandler,
  followHandlerSuccess,
  followHandlerErr,
} from '../actions';

describe('questionsReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      questionsList: [{}],
    });
  });

  it('returns the initial state', () => {
    expect(questionsReducer(state, {})).toEqual(state);
  });

  it('followHandlerErr', () => {
    const followHandlerError = 'followHandlerError';
    const obj = state
      .set('followHandlerLoading', false)
      .set('followHandlerError', followHandlerError);

    expect(
      questionsReducer(state, followHandlerErr(followHandlerError)),
    ).toEqual(obj);
  });

  it('followHandlerSuccess', () => {
    const followedCommunities = 'followedCommunities';
    const obj = state
      .set('followHandlerLoading', false)
      .set('followedCommunities', followedCommunities);

    expect(
      questionsReducer(state, followHandlerSuccess(followedCommunities)),
    ).toEqual(obj);
  });

  it('followHandler', () => {
    const obj = state.set('followHandlerLoading', true);

    expect(questionsReducer(state, followHandler())).toEqual(obj);
  });

  it('getQuestions', () => {
    const communityIdFilter = 10;
    const obj = state
      .set('questionsLoading', true)
      .set('communityIdFilter', communityIdFilter);

    expect(
      questionsReducer(state, getQuestions(0, 0, communityIdFilter)),
    ).toEqual(obj);
  });

  it('getQuestionsSuccess, next is true', () => {
    const questionsList = [{}];
    const next = true;
    const followedCommunities = 'followedCommunities';

    const obj = state
      .set('questionsLoading', false)
      .set('followedCommunities', followedCommunities)
      .set('questionsList', state.get('questionsList').concat(questionsList))
      .set('isLastFetch', true);

    expect(
      questionsReducer(
        state,
        getQuestionsSuccess(questionsList, followedCommunities, next),
      ),
    ).toEqual(obj);
  });

  it('getQuestionsSuccess, next is false', () => {
    const questionsList = [{}];
    const next = false;
    const followedCommunities = 'followedCommunities';

    const obj = state
      .set('questionsLoading', false)
      .set('followedCommunities', followedCommunities)
      .set('questionsList', questionsList)
      .set('isLastFetch', true);

    expect(
      questionsReducer(
        state,
        getQuestionsSuccess(questionsList, followedCommunities, next),
      ),
    ).toEqual(obj);
  });

  it('getQuestionsError', () => {
    const questionsError = 'questionsError';
    const obj = state
      .set('questionsLoading', false)
      .set('questionsError', questionsError);

    expect(questionsReducer(state, getQuestionsError(questionsError))).toEqual(
      obj,
    );
  });

  it('setDefaultReducer', () => {
    const obj = initialState;
    expect(questionsReducer(state, setDefaultReducer())).toEqual(obj);
  });
});
