import { fromJS } from 'immutable';
import { selectEditProfileDomain } from '../selectors';

describe('selectEditProfileDomain', () => {
  const globalState = fromJS({});
  const mockedState = fromJS({
    editProfileReducer: globalState,
  });
  it('should select the global state', () => {
    expect(selectEditProfileDomain(mockedState)).toEqual(globalState);
  });
});
