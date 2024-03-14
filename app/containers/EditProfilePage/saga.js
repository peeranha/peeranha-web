import { selectSuiWallet } from 'containers/SuiProvider/selectors';
import { delay } from 'redux-saga';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import ReactGA from 'react-ga4';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';
import { isSuiBlockchain } from 'utils/constants';

import { uploadImg, saveProfile } from 'utils/profileManagement';

import { HASH_CHARS_LIMIT } from 'components/FormFields/AvatarField';
import { AVATAR_FIELD, DISPLAY_NAME_FIELD } from 'containers/Profile/constants';

import { isValid, isAuthorized } from 'containers/EthereumProvider/saga';
import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { saveSuiProfile } from 'utils/sui/profileManagement';
import {
  transactionCompleted,
  transactionFailed,
  transactionInitialised,
  transactionInPending,
} from 'containers/EthereumProvider/actions';
import { getSuiUserObject } from 'utils/sui/accountManagement';

import { waitForTransactionConfirmation } from 'utils/sui/sui';

import { saveProfileSuccess, saveProfileErr } from './actions';

import { SAVE_PROFILE, EDIT_PROFILE_BUTTON_ID, MIN_RATING_TO_EDIT_PROFILE } from './constants';
import { selectEthereum } from '../EthereumProvider/selectors';

// TODO: test
/* eslint no-param-reassign: 0 */
export function* saveProfileWorker({ profile, userKey }, isNavigateToProfile = true) {
  try {
    ReactGA.event({
      category: 'Users',
      action: 'update_profile_started',
    });
    if (profile[AVATAR_FIELD] && profile[AVATAR_FIELD].length > HASH_CHARS_LIMIT) {
      const { imgHash } = yield call(uploadImg, profile[AVATAR_FIELD]);
      profile[AVATAR_FIELD] = imgHash;
    }
    if (isSuiBlockchain) {
      yield put(transactionInitialised());
      const wallet = yield select(selectSuiWallet());
      const txResult = yield call(saveSuiProfile, wallet, profile);
      yield put(transactionInPending(txResult.digest));
      yield call(delay, 2000);
      yield call(waitForTransactionConfirmation, txResult.digest);
      yield put(transactionCompleted());

      const fullProfileInfo = yield select(makeSelectProfileInfo());
      const suiUserObject = yield call(getSuiUserObject, wallet.address);
      const updatedProfileInfo = {
        ...fullProfileInfo,
        profile,
        displayName: profile[DISPLAY_NAME_FIELD],
        id: suiUserObject.id.id,
      };

      yield put(getUserProfileSuccess(updatedProfileInfo));
    } else {
      const ethereumService = yield select(selectEthereum);

      yield call(saveProfile, ethereumService, userKey, profile);
      const fullProfileInfo = yield select(makeSelectProfileInfo());
      const updatedProfileInfo = {
        ...fullProfileInfo,
        profile,
        displayName: profile[DISPLAY_NAME_FIELD],
      };

      yield put(getUserProfileSuccess(updatedProfileInfo));
    }

    yield put(saveProfileSuccess());

    ReactGA.event({
      category: 'Users',
      action: 'update_profile_completed',
    });
    if (isSuiBlockchain && window.location.pathname.slice(0, 12) === `/users/edit/`) {
      yield call(createdHistory.push, routes.profileView(userKey));
    }

    if (
      !isSuiBlockchain &&
      isNavigateToProfile &&
      window.location.pathname.slice(0, 12) === `/users/edit/`
    ) {
      yield call(createdHistory.push, routes.profileView(userKey));
    }
  } catch (err) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
    yield put(saveProfileErr(err));
  }
}

// TODO: test
export function* checkReadinessWorker({ buttonId }) {
  yield call(isAuthorized);

  yield call(isValid, {
    buttonId: buttonId || EDIT_PROFILE_BUTTON_ID,
    minRating: MIN_RATING_TO_EDIT_PROFILE,
  });
}

export function* redirectToEditProfilePageWorker({ buttonId, user }) {
  try {
    yield call(checkReadinessWorker, { buttonId });
    yield call(createdHistory.push, routes.profileEdit(user));
  } catch (err) {}
}

export default function* () {
  yield takeLatest(SAVE_PROFILE, saveProfileWorker);
}
