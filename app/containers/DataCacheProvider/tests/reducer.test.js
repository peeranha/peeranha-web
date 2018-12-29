import { fromJS } from 'immutable';
import dataCacheProviderReducer from '../reducer';

describe('dataCacheProviderReducer', () => {
  it('returns the initial state', () => {
    expect(dataCacheProviderReducer(undefined, {})).toEqual(fromJS({}));
  });
});
