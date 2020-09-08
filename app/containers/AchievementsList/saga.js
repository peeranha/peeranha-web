import { call, put, takeLatest, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { selectEos } from 'containers/EosioProvider/selectors';
import { addToast } from 'containers/Toast/actions';

import { GET_USER_ACHIEVEMENTS } from './constants';
import { getUserAchievementsSuccess, getUserAchievementsErr } from './actions';
import messages from './messages';

export async function getUserAchievements(eosService, tableTitle, scope) {
  const { rows } = await eosService.getTableRows(tableTitle, scope);
  return rows;
}

export function* getUserAchievementsWorker(action) {
  try {
    const eosService = yield select(selectEos);

    const achievements = yield call(
      getUserAchievements,
      eosService,
      'accachieve',
      action.currentAccount,
    );

    yield put(getUserAchievementsSuccess(action.currentAccount, achievements));
  } catch (err) {
    const locale = yield select(makeSelectLocale());
    const text =
      translationMessages[locale][messages.achievementsNotReceived.id];
    yield put(addToast({ type: 'error', text }));
    yield put(getUserAchievementsErr(err));
  }
}

export default function* () {
  yield takeLatest(GET_USER_ACHIEVEMENTS, getUserAchievementsWorker);
}
