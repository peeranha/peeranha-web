import { all, call, put, takeLatest, select } from 'redux-saga/effects';

import { SAVE_CRYPTO_ACCOUNTS } from './constants';
import { saveCryptoAccountsSuccess, saveCryptoAccountsErr } from './actions';
import { selectUsers } from '../../DataCacheProvider/selectors';

export function* saveCryptoAccountsWorker({ cryptoAccounts, profile }) {
  try {
    const userInfo = yield select(selectUsers(profile.user));
    debugger
    yield put(saveCryptoAccountsSuccess());
  } catch (err) {
    yield put(saveCryptoAccountsErr(err));
  }
}

export default function*() {
  yield takeLatest(SAVE_CRYPTO_ACCOUNTS, saveCryptoAccountsWorker);
}
