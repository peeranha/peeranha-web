import { fromJS } from 'immutable';
import orderBy from 'lodash/orderBy';

import questionsReducer from '../reducer';

import {
  getQuestions,
  getQuestionsSuccess,
  getQuestionsError,
  getUniqQuestions,
} from '../actions';

describe('questionsReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      questionsList: [{ id: 1 }, { id: 2 }],
      topQuestionIds: [],
    });
  });

  it('returns the initial state', () => {
    const questionsList = [{ id: 1 }, { id: 2 }];
    // state = fromJS({}).set('questionsList', [{ id: 1 }, { id: 2 }]);
    expect(questionsReducer(state, questionsList)).toEqual(state);
  });

  it('getQuestions', () => {
    const obj = state.set('questionsLoading', true);

    expect(questionsReducer(state, getQuestions())).toEqual(obj);
  });

  it('getQuestionsSuccess', () => {
    const questionsList = [{ id: 1 }, { id: 2 }];

    const mappedQuestionsList = questionsList.map(
      ({ id: questionId }) => questionId,
    );

    const obj = state
      .set('questionsLoading', false)
      .set(
        'questionsList',
        fromJS([...new Set(questionsList.concat(mappedQuestionsList))]),
      )
      .set(
        'loadedItems',
        Object.keys(questionsList).length + questionsList.length,
      )
      .set(
        'questions',
        fromJS({
          ...questionsList.reduce((acc, cur) => {
            acc[cur.id] = cur;
            return acc;
          }, {}),
        }),
      )
      .set('promotedQuestions', {})
      .set('isLastFetch', questionsList.length === 0);

    expect(questionsReducer(state, getQuestionsSuccess(questionsList))).toEqual(
      obj,
    );
  });

  it('getUniqQuestions', () => {
    const questionsList = [{ id: 1 }, { id: 2 }];

    const mappedQuestionsList = questionsList.map(
      ({ id: questionId }) => questionId,
    );

    const obj = state
      .set(
        'questionsList',
        orderBy(
          [
            ...new Set(
              mappedQuestionsList.concat(questionsList.map(x => x.id)),
            ),
          ].filter(questionId => !questionsList[questionId]?.isDeleted),
          ['id'],
          ['asc'],
        ),
      )
      .set(
        'questions',
        fromJS({
          ...questionsList,
          ...questionsList.reduce((acc, cur) => {
            acc[cur.id] = cur;
            return acc;
          }, {}),
        }),
      );

    expect(
      questionsReducer(
        state.set('questions', questionsList),
        getUniqQuestions(questionsList),
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
});
