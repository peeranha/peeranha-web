import { fromJS } from 'immutable';
import { selectAccountProviderDomain } from '../selectors';

describe('selectAccountProviderDomain', () => {
  const globalState = fromJS({});
  const mockedState = fromJS({
    accountProvider: globalState,
  });
  it('should select the global state', () => {
    expect(selectAccountProviderDomain(mockedState)).toEqual(globalState);
  });
});
