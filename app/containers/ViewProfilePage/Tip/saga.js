import { call, put, takeLatest, select } from 'redux-saga/effects';

import { SAVE_CRYPTO_ACCOUNTS } from './constants';
import { saveCryptoAccountsSuccess, saveCryptoAccountsErr } from './actions';
import { saveProfile } from '../../../utils/profileManagement';
import { AVATAR_FIELD } from '../../Profile/constants';
import { selectEos } from '../../EosioProvider/selectors';
import { getUserProfileSuccess } from '../../DataCacheProvider/actions';

export function* saveCryptoAccountsWorker({
  cryptoAccounts,
  profile,
  resetForm,
}) {
  try {
    const eosService = yield select(selectEos);
    const updateProfileInfo = {
      ...profile.profile,
      cryptoAccounts,
    };

    yield call(
      saveProfile,
      eosService,
      profile.user,
      profile.profile[AVATAR_FIELD],
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

export default function*() {
  yield takeLatest(SAVE_CRYPTO_ACCOUNTS, saveCryptoAccountsWorker);
}
