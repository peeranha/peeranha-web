import { call, put, takeEvery, select } from 'redux-saga/effects';
import { registerAccount } from 'utils/accountManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { DISPLAY_NAME_FIELD } from 'containers/Profile/constants';

import {
  closeModals,
  loginSignupWorker,
} from 'containers/AccountProvider/saga';

import { FETCH_REGISTER_ACC } from './constants';
import { registerAccSuccess, registerAccError } from './actions';

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
    yield loginSignupWorker({ methods: { type: null } });
    yield call(() => closeModals());
  } catch (err) {
    yield put(registerAccError('Such user exists'));
  }
}

export default function*() {
  yield takeEvery(FETCH_REGISTER_ACC, resistrAccWorker);
}
