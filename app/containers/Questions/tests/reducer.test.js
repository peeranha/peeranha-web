import { fromJS } from 'immutable';
import questionsReducer from '../reducer';

describe('questionsReducer', () => {
  it('returns the initial state', () => {
    expect(questionsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
