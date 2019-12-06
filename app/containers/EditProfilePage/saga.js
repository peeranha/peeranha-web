import { call, put, takeLatest, select } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { uploadImg, saveProfile } from 'utils/profileManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { HASH_CHARS_LIMIT } from 'components/FormFields/AvatarField';
import { AVATAR_FIELD, DISPLAY_NAME_FIELD } from 'containers/Profile/constants';

import { isValid, isAuthorized } from 'containers/EosioProvider/saga';
import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';

import { saveProfileSuccess, saveProfileErr } from './actions';

import {
  SAVE_PROFILE,
  EDIT_PROFILE_BUTTON_ID,
  MIN_RATING_TO_EDIT_PROFILE,
  MIN_ENERGY_TO_EDIT_PROFILE,
} from './constants';

// TODO: test
/* eslint no-param-reassign: 0 */
export function* saveProfileWorker({ profile, userKey }) {
  try {
    const eosService = yield select(selectEos);

    // check that it is not hash
    if (
      profile[AVATAR_FIELD] &&
      profile[AVATAR_FIELD].length > HASH_CHARS_LIMIT
    ) {
      const { imgHash } = yield call(uploadImg, profile[AVATAR_FIELD]);
      profile[AVATAR_FIELD] = imgHash;
    }

    yield call(
      saveProfile,
      eosService,
      userKey,
      profile[AVATAR_FIELD],
      profile,
    );

    const fullProfileInfo = yield select(makeSelectProfileInfo());

    yield put(
      getUserProfileSuccess({
        ...fullProfileInfo,
        profile,
        display_name: profile[DISPLAY_NAME_FIELD],
      }),
    );

    yield put(saveProfileSuccess());

    yield call(createdHistory.push, routes.profileView(userKey));
  } catch (err) {
    yield put(saveProfileErr(err));
  }
}

// TODO: test
export function* checkReadinessWorker({ buttonId }) {
  yield call(isAuthorized);

  yield call(isValid, {
    buttonId: buttonId || EDIT_PROFILE_BUTTON_ID,
    minRating: MIN_RATING_TO_EDIT_PROFILE,
    minEnergy: MIN_ENERGY_TO_EDIT_PROFILE,
  });
}

// TODO: test
/* eslint no-empty: 0 */
export function* redirectToEditProfilePageWorker({ buttonId, user }) {
  try {
    yield call(checkReadinessWorker, { buttonId });
    yield call(createdHistory.push, routes.profileEdit(user));
  } catch (err) {}
}

export default function*() {
  yield takeLatest(SAVE_PROFILE, saveProfileWorker);
}
