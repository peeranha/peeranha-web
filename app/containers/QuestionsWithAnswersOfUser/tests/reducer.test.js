import { fromJS } from 'immutable';
import questionsOfUserReducer from '../reducer';

describe('questionsOfUserReducer', () => {
  it('returns the initial state', () => {
    expect(questionsOfUserReducer(undefined, {})).toEqual(fromJS({}));
  });
});
