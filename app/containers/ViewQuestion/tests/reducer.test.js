import { fromJS } from 'immutable';
import viewQuestionReducer from '../reducer';

describe('viewQuestionReducer', () => {
  it('returns the initial state', () => {
    expect(viewQuestionReducer(undefined, {})).toEqual(fromJS({}));
  });
});
