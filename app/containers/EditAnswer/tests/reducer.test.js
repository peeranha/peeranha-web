import { fromJS } from 'immutable';
import editAnswerReducer from '../reducer';

describe('editAnswerReducer', () => {
  it('returns the initial state', () => {
    expect(editAnswerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
