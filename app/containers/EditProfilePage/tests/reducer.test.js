import { fromJS } from 'immutable';

import editProfileReducer from '../reducer';

import { saveProfile, saveProfileSuccess, saveProfileErr } from '../actions';

describe('editProfileReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: '',
    });
  });

  it('returns the initial state', () => {
    expect(editProfileReducer(state, {})).toEqual(state);
  });

  it('saveProfileAction: returns @loading true', () => {
    const obj = state.set('isProfileSaving', true);
    expect(editProfileReducer(state, saveProfile({}))).toEqual(obj);
  });

  it('saveProfileActionSuccess: returns @loading false', () => {
    const obj = state.set('isProfileSaving', false);
    expect(editProfileReducer(state, saveProfileSuccess())).toEqual(obj);
  });

  it('saveProfileActionError: returns saveProfileError', () => {
    const saveProfileError = 'error';
    const obj = state
      .set('isProfileSaving', false)
      .set('saveProfileError', saveProfileError);

    expect(editProfileReducer(state, saveProfileErr(saveProfileError))).toEqual(
      obj,
    );
  });
});
