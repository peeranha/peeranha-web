import { call, put, select, takeEvery } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';
import { COMPLETE_LOGIN } from 'containers/Login/constants';
import { showSignUpModal, hideSignUpModal } from 'containers/SignUp/actions';
import { showLoginModal, hideLoginModal } from 'containers/Login/actions';
import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';

import { getProfileInfo } from 'utils/profileManagement';

import {
  NO_SCATTER,
  NO_SELECTED_SCATTER_ACCOUNTS,
  USER_IS_ABSENT_IN_SYSTEM_AND_LOGIN,
  USER_IS_ABSENT_IN_SYSTEM_AND_SIGNUP,
  USER_IS_IN_SYSTEM_AND_SIGNUP,
  COMPLETE_SIGNUP,
} from 'containers/SignUp/constants';

import {
  getCurrentAccountSuccess,
  getCurrentAccountError,
  loginSignupSuccess,
  loginSignupErr,
  forgetIdentitySuccess,
  forgetIdentityErr,
} from './actions';

import {
  GET_CURRENT_ACCOUNT,
  LOGIN_SIGNUP,
  FORGET_IDENTITY,
} from './constants';

export function* getCurrentAccountWorker() {
  try {
    const eosService = yield select(selectEos);

    if (!eosService || !eosService.initialized)
      throw new Error('EOS is not initialized.');

    const selectedScatterAccount = yield eosService.scatterInstalled
      ? call(() => eosService.getSelectedAccount())
      : null;

    const profileInfo = yield call(() =>
      getProfileInfo(selectedScatterAccount, eosService),
    );

    yield put(getCurrentAccountSuccess(selectedScatterAccount, profileInfo));
  } catch (err) {
    yield put(getCurrentAccountError(err));
  }
}

export function* setLoginSignupModalState(type, message) {
  switch (type) {
    case COMPLETE_SIGNUP:
      yield put(hideLoginModal());
      yield put(showSignUpModal(message));
      break;

    case COMPLETE_LOGIN:
      yield put(hideSignUpModal());
      yield put(showLoginModal(message));
      break;

    default:
  }
}

export function* closeModals() {
  yield put(hideSignUpModal());
  yield put(hideLoginModal());
}

export function* loginSignupWorker(res) {
  try {
    let account;
    const eosService = yield select(selectEos);

    if (!eosService.scatterInstalled) {
      yield setLoginSignupModalState(res.methods.type, NO_SCATTER);
      return;
    }

    if (!eosService.selectedScatterAccount) {
      account = yield call(() => eosService.selectAccount());
      if (!account) {
        yield setLoginSignupModalState(
          res.methods.type,
          NO_SELECTED_SCATTER_ACCOUNTS,
        );
        return;
      }
    }

    yield put(loginSignupSuccess(account));

    const profileInfo = yield call(() =>
      getUserProfileWorker({ user: account }),
    );

    if (!profileInfo && res.methods.type === COMPLETE_LOGIN) {
      yield setLoginSignupModalState(
        res.methods.type,
        USER_IS_ABSENT_IN_SYSTEM_AND_LOGIN,
      );
      return;
    }

    if (!profileInfo && res.methods.type === COMPLETE_SIGNUP) {
      yield setLoginSignupModalState(
        res.methods.type,
        USER_IS_ABSENT_IN_SYSTEM_AND_SIGNUP,
      );
      return;
    }

    if (profileInfo && res.methods.type === COMPLETE_SIGNUP) {
      yield setLoginSignupModalState(
        res.methods.type,
        USER_IS_IN_SYSTEM_AND_SIGNUP,
      );
      return;
    }

    yield closeModals();

    yield put(loginSignupSuccess(account, profileInfo));
  } catch (err) {
    yield put(loginSignupErr(err));
  }
}

export function* forgetIdentityWorker() {
  try {
    const eosService = yield select(selectEos);

    yield eosService.forgetIdentity();
    yield loginSignupWorker();
    yield put(forgetIdentitySuccess());
  } catch (err) {
    yield put(forgetIdentityErr(err));
  }
}

export default function* defaultSaga() {
  yield takeEvery(GET_CURRENT_ACCOUNT, getCurrentAccountWorker);
  yield takeEvery(LOGIN_SIGNUP, loginSignupWorker);
  yield takeEvery(FORGET_IDENTITY, forgetIdentityWorker);
}
