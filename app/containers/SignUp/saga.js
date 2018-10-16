import { call, put, takeEvery, select } from 'redux-saga/effects';
import { registerAccount, isUserInSystem } from 'utils/accountManagement';
import { selectEos } from 'containers/EosioProvider/selectors';
import { DISPLAY_NAME_FIELD } from 'containers/Profile/constants';

import {
  FETCH_REGISTER_ACC,
  IS_USER_IN_SYSTEM,
  SELECT_POPUP_ACCOUNT,
} from './constants';

import {
  registerAccSuccess,
  registerAccError,
  isUserInSystemSuccess,
  isUserInSystemError,
  selectPopupAccountSuccess,
  selectPopupAccountError,
} from './actions';

export function* resistrAccWorker(res) {
  try {
    const { eosAccount, displayName } = res.obj;
    const eosService = yield select(selectEos);

    yield call(() =>
      registerAccount(
        eosAccount,
        displayName,
        { [DISPLAY_NAME_FIELD]: displayName },
        eosService,
      ),
    );
    yield put(registerAccSuccess());
  } catch (err) {
    yield put(registerAccError('Such user exists'));
  }
}

export function* isUserInSystemWorker(res) {
  try {
    const eosService = yield select(selectEos);
    const userIsInSystem = yield call(() =>
      isUserInSystem(res.user, eosService),
    );

    yield put(isUserInSystemSuccess(userIsInSystem));
  } catch (err) {
    yield put(isUserInSystemError(err));
  }
}

export function* selectPopupAccountWorker() {
  try {
    const eosService = yield select(selectEos);

    yield call(() => eosService.selectAccount());
    yield put(selectPopupAccountSuccess());
  } catch (err) {
    yield put(selectPopupAccountError(err));
  }
}

export default function*() {
  yield takeEvery(FETCH_REGISTER_ACC, resistrAccWorker);
  yield takeEvery(IS_USER_IN_SYSTEM, isUserInSystemWorker);
  yield takeEvery(SELECT_POPUP_ACCOUNT, selectPopupAccountWorker);
}
