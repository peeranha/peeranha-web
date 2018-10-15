import { fromJS } from 'immutable';
import { selectProfileDomain } from '../selectors';

describe('selectProfileDomain', () => {
  const globalState = fromJS({});
  const mockedState = fromJS({
    profile: globalState,
  });
  it('should select the global state', () => {
    expect(selectProfileDomain(mockedState)).toEqual(globalState);
  });
});
