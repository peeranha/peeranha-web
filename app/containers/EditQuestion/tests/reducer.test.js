import { fromJS } from 'immutable';
import editQuestionReducer from '../reducer';

describe('editQuestionReducer', () => {
  it('returns the initial state', () => {
    expect(editQuestionReducer(undefined, {})).toEqual(fromJS({}));
  });
});
