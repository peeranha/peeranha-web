import { fromJS } from 'immutable';
import createTagReducer from '../reducer';

import { suggestTag, suggestTagSuccess, suggestTagErr } from '../actions';

describe('createTagReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(createTagReducer(state, {})).toEqual(state);
  });

  it('suggestTag', () => {
    const obj = state.set('suggestTagLoading', true);
    expect(createTagReducer(state, suggestTag())).toEqual(obj);
  });

  it('suggestTagSuccess', () => {
    const obj = state.set('suggestTagLoading', false);
    expect(createTagReducer(state, suggestTagSuccess())).toEqual(obj);
  });

  it('suggestTagErr', () => {
    const suggestTagError = 'suggestTagError';
    const obj = state
      .set('suggestTagLoading', false)
      .set('suggestTagError', suggestTagError);

    expect(createTagReducer(state, suggestTagErr(suggestTagError))).toEqual(
      obj,
    );
  });
});
