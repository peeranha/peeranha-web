import { takeLatest, put, call, select } from 'redux-saga/effects';

import {
  confirmTelegramAccount,
  unlinkTelegramAccount,
  getUserTelegramData,
  saveProfile,
} from 'utils/profileManagement';

import { selectEos } from '../EosioProvider/selectors';
import { AVATAR_FIELD } from '../Profile/constants';

import { CONFIRM_TELEGRAM_ACCOUNT, UNLINK_TELEGRAM_ACCOUNT } from './constants';

import {
  confirmTelegramAccountSuccess,
  confirmTelegramAccountErr,
  unlinkTelegramAccountSuccess,
  unlinkTelegramAccountErr,
} from './actions';

export function* confirmTelegramAccountWorker({ profile, userKey }) {
  try {
    const eosService = yield select(selectEos);
    yield call(
      saveProfile,
      eosService,
      userKey,
      profile[AVATAR_FIELD] || '',
      profile,
    );

    const account = yield call(eosService.getSelectedAccount);

    yield call(confirmTelegramAccount, eosService, account);

    const userTgInfo = yield call(getUserTelegramData, eosService, account);

    const data = {
      ...userTgInfo,
      confirmed: 1,
    };

    yield put(confirmTelegramAccountSuccess(data));
  } catch (err) {
    yield put(confirmTelegramAccountErr(err));
  }
}

export function* unlinkTelegramAccountWorker({ profile, userKey }) {
  try {
    const eosService = yield select(selectEos);

    const account = yield call(eosService.getSelectedAccount);

    yield call(unlinkTelegramAccount, eosService, account);

    yield call(
      saveProfile,
      eosService,
      userKey,
      profile[AVATAR_FIELD] || '',
      profile,
    );
    yield put(unlinkTelegramAccountSuccess());
  } catch (err) {
    yield put(unlinkTelegramAccountErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(CONFIRM_TELEGRAM_ACCOUNT, confirmTelegramAccountWorker);
  yield takeLatest(UNLINK_TELEGRAM_ACCOUNT, unlinkTelegramAccountWorker);
}
