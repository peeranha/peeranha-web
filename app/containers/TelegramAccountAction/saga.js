import { takeLatest, put, call, select } from 'redux-saga/effects';

import { selectEos } from '../EosioProvider/selectors';

import {
  confirmTelegramAccount,
  unlinkTelegramAccount,
  getUserTelegramData,
} from 'utils/profileManagement';

import { CONFIRM_TELEGRAM_ACCOUNT, UNLINK_TELEGRAM_ACCOUNT } from './constants';

import {
  confirmTelegramAccountSuccess,
  confirmTelegramAccountErr,
  unlinkTelegramAccountSuccess,
  unlinkTelegramAccountErr,
} from './actions';

export function* confirmTelegramAccountWorker() {
  try {
    const eosService = yield select(selectEos);
    const account = yield call(eosService.getSelectedAccount);

    yield call(confirmTelegramAccount, eosService, account);

    const userTgInfo = yield call(getUserTelegramData, eosService, account);

    const data = {
      ...userTgInfo,
      confirmed: 1,
    };

    yield put(confirmTelegramAccountSuccess(data));
  } catch (err) {
    console.log(err);
    yield put(confirmTelegramAccountErr(err));
  }
}

export function* unlinkTelegramAccountWorker() {
  try {
    const eosService = yield select(selectEos);

    const account = yield call(eosService.getSelectedAccount);

    yield call(unlinkTelegramAccount, eosService, account);

    yield put(unlinkTelegramAccountSuccess());
  } catch (err) {
    console.log(err);
    yield put(unlinkTelegramAccountErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(CONFIRM_TELEGRAM_ACCOUNT, confirmTelegramAccountWorker);
  yield takeLatest(UNLINK_TELEGRAM_ACCOUNT, unlinkTelegramAccountWorker);
}
