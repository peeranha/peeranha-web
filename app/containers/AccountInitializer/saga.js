import { call, put, select, takeEvery } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';
import { COMPLETE_LOGIN } from 'containers/Login/constants';
import { showSignUpModal, hideSignUpModal } from 'containers/SignUp/actions';
import { showLoginModal, hideLoginModal } from 'containers/Login/actions';
import { isUserInSystem } from 'utils/accountManagement';

import {
  NO_SCATTER,
  NO_SELECTED_SCATTER_ACCOUNTS,
  USER_IS_ABSENT_IN_SYSTEM_AND_LOGIN,
  USER_IS_ABSENT_IN_SYSTEM_AND_SIGNUP,
  COMPLETE_SIGNUP,
} from 'containers/SignUp/constants';

import {
  getCurrentAccountSuccess,
  getCurrentAccountError,
  selectAccountSuccess,
  selectAccError,
  forgetIdentitySuccess,
  forgetIdentityErr,
} from './actions';

import {
  GET_CURRENT_ACCOUNT,
  SELECT_ACCOUNT,
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

    const userIsInSystem = yield call(() =>
      isUserInSystem(selectedScatterAccount, eosService),
    );

    const eosInit = {
      userIsInSystem,
      selectedScatterAccount,
      initialized: eosService.initialized,
      eosInstance: eosService.eosInstance,
      scatterInstance: eosService.scatterInstance,
      scatterInstalled: eosService.scatterInstalled,
    };

    yield put(getCurrentAccountSuccess(selectedScatterAccount, eosInit));
  } catch (err) {
    yield put(getCurrentAccountError(err));
  }
}

function* returnComponent(type, message) {
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

/* eslint-disable-next-line */
export function* selectAccountWorker(res) {
  try {
    let account;
    const eosService = yield select(selectEos);

    if (!eosService.scatterInstalled) {
      return yield returnComponent(res.methods.type, NO_SCATTER);
    }

    if (!eosService.selectedScatterAccount) {
      account = yield call(() => eosService.selectAccount());
      if (!account) {
        return yield returnComponent(
          res.methods.type,
          NO_SELECTED_SCATTER_ACCOUNTS,
        );
      }
    }

    const obj = {
      selectedScatterAccount: account,
      scatterInstalled: true,
    };

    yield put(selectAccountSuccess(obj, account));

    const userIsInSystem = yield call(() =>
      isUserInSystem(account, eosService),
    );

    if (!userIsInSystem && res.methods.type === COMPLETE_LOGIN) {
      return yield returnComponent(
        res.methods.type,
        USER_IS_ABSENT_IN_SYSTEM_AND_LOGIN,
      );
    }

    if (!userIsInSystem && res.methods.type === COMPLETE_SIGNUP) {
      return yield returnComponent(
        res.methods.type,
        USER_IS_ABSENT_IN_SYSTEM_AND_SIGNUP,
      );
    }

    yield closeModals();
    yield put(selectAccountSuccess({ ...obj, userIsInSystem }, account));
  } catch (err) {
    yield put(selectAccError(err));
  }
}

export function* forgetIdentityWorker() {
  try {
    const eosService = yield select(selectEos);

    yield eosService.forgetIdentity();
    yield selectAccountWorker();
    yield put(forgetIdentitySuccess());
  } catch (err) {
    yield put(forgetIdentityErr(err));
  }
}

export default function*() {
  yield takeEvery(GET_CURRENT_ACCOUNT, getCurrentAccountWorker);
  yield takeEvery(SELECT_ACCOUNT, selectAccountWorker);
  yield takeEvery(FORGET_IDENTITY, forgetIdentityWorker);
}
