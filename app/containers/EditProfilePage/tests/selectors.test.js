import { fromJS } from 'immutable';

import {
  selectEditProfileDomain,
  selectSaveProfileError,
  selectIsProfileSaving,
} from '../selectors';

describe('selectEditProfileDomain', () => {
  const saveProfileError = null;
  const isProfileSaving = false;

  const globalState = fromJS({
    saveProfileError,
    isProfileSaving,
  });

  const mockedState = fromJS({
    editProfileReducer: globalState,
  });

  it('should select the global state', () => {
    expect(selectEditProfileDomain(mockedState)).toEqual(globalState);
  });

  it('selectIsProfileSaving', () => {
    const isSelectIsProfileSaving = selectIsProfileSaving();
    expect(isSelectIsProfileSaving(mockedState)).toEqual(isProfileSaving);
  });

  it('selectSaveProfileError', () => {
    const isSelectSaveProfileError = selectSaveProfileError();
    expect(isSelectSaveProfileError(mockedState)).toEqual(saveProfileError);
  });
});
