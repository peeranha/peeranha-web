import { fromJS } from 'immutable';
import askQuestionReducer from '../reducer';

describe('askQuestionReducer', () => {
  it('returns the initial state', () => {
    expect(askQuestionReducer(undefined, {})).toEqual(fromJS({}));
  });
});
