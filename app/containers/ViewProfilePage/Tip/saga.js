import { call, put, takeLatest, select } from 'redux-saga/effects';

import _get from 'lodash/get';
import { NO_AVATAR } from 'utils/constants';
import { saveProfile } from 'utils/profileManagement';

import { SAVE_CRYPTO_ACCOUNTS } from './constants';
import { AVATAR_FIELD, DISPLAY_NAME_FIELD } from '../../Profile/constants';

import { selectEos } from '../../EosioProvider/selectors';

import { getUserProfileSuccess } from '../../DataCacheProvider/actions';
import { saveCryptoAccountsSuccess, saveCryptoAccountsErr } from './actions';

export function* saveCryptoAccountsWorker({
  cryptoAccounts,
  profile,
  resetForm,
}) {
  try {
    const eosService = yield select(selectEos);
    const updateProfileInfo = {
      ...profile.profile,
      [DISPLAY_NAME_FIELD]: _get(
        profile,
        ['profile', DISPLAY_NAME_FIELD],
        profile.profile.displayName,
      ),
      cryptoAccounts,
    };

    yield call(
      saveProfile,
      eosService,
      profile.user,
      profile.profile[AVATAR_FIELD] || NO_AVATAR,
      updateProfileInfo,
    );

    yield put(
      getUserProfileSuccess({ ...profile, profile: updateProfileInfo }),
    );
    yield put(saveCryptoAccountsSuccess(cryptoAccounts));
    yield call(resetForm);
  } catch (err) {
    yield put(saveCryptoAccountsErr(err));
  }
}

export default function* tipSaga() {
  yield takeLatest(SAVE_CRYPTO_ACCOUNTS, saveCryptoAccountsWorker);
}
