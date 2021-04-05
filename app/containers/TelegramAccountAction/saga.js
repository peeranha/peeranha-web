import { takeLatest, put, call, select } from 'redux-saga/effects';

import { selectEos } from '../EosioProvider/selectors';

import {
  confirmTelegramAccount,
  unlinkTelegramAccount,
  getUserTelegramData,
  saveProfile,
  uploadImg,
} from 'utils/profileManagement';

import { CONFIRM_TELEGRAM_ACCOUNT, UNLINK_TELEGRAM_ACCOUNT } from './constants';

import {
  confirmTelegramAccountSuccess,
  confirmTelegramAccountErr,
  unlinkTelegramAccountSuccess,
  unlinkTelegramAccountErr,
  saveProfileSuccess,
  saveProfileErr,
} from './actions';
import { AVATAR_FIELD } from '../Profile/constants';
import { HASH_CHARS_LIMIT } from '../../components/FormFields/AvatarField';

export function* confirmTelegramAccountWorker({ profile, userKey }) {
  try {
    yield call(saveProfileWorker, profile, userKey);
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
    yield put(confirmTelegramAccountErr(err));
  }
}

export function* unlinkTelegramAccountWorker({ profile, userKey }) {
  try {
    const eosService = yield select(selectEos);

    const account = yield call(eosService.getSelectedAccount);

    yield call(unlinkTelegramAccount, eosService, account);

    yield call(saveProfileWorker, profile, userKey);
    yield put(unlinkTelegramAccountSuccess());
  } catch (err) {
    yield put(unlinkTelegramAccountErr(err));
  }
}

export function* saveProfileWorker(profile, userKey) {
  try {
    const eosService = yield select(selectEos);

    yield call(
      saveProfile,
      eosService,
      userKey,
      profile[AVATAR_FIELD] || '',
      profile,
    );

    yield put(saveProfileSuccess());
  } catch (err) {
    yield put(saveProfileErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(CONFIRM_TELEGRAM_ACCOUNT, confirmTelegramAccountWorker);
  yield takeLatest(UNLINK_TELEGRAM_ACCOUNT, unlinkTelegramAccountWorker);
}
