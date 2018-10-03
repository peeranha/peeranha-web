import { fromJS } from 'immutable';
import { selectSignUpDomain } from '../selectors';

describe('selectSignUpDomain', () => {
  const globalState = fromJS({});
  const mockedState = fromJS({
    signUp: globalState,
  });
  it('should select the global state', () => {
    expect(selectSignUpDomain(mockedState)).toEqual(globalState);
  });
});
