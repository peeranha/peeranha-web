import { takeLatest, put, call, select } from 'redux-saga/effects';

import {
  confirmTelegramAccount,
  unlinkTelegramAccount,
  getUserTelegramData,
  saveProfile,
} from 'utils/profileManagement';

import { selectEthereum } from '../EthereumProvider/selectors';
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
    const ethereumService = yield select(selectEthereum);
    yield call(
      saveProfile,
      ethereumService,
      userKey,
      profile[AVATAR_FIELD] || '',
      profile,
    );

    const account = yield call(ethereumService.getSelectedAccount);

    yield call(confirmTelegramAccount, ethereumService, account);

    const userTgInfo = yield call(
      getUserTelegramData,
      ethereumService,
      account,
    );

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
    const ethereumService = yield select(selectEthereum());

    const account = yield call(ethereumService.getSelectedAccount);

    yield call(unlinkTelegramAccount, ethereumService, account);

    yield call(
      saveProfile,
      ethereumService,
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
