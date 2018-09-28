import { fromJS } from 'immutable';
import { selectAccountInitializerDomain } from '../selectors';

describe('selectAccountInitializerDomain', () => {
  const globalState = fromJS({});
  const mockedState = fromJS({
    accountInitializer: globalState,
  });
  it('should select the global state', () => {
    expect(selectAccountInitializerDomain(mockedState)).toEqual(globalState);
  });
});
