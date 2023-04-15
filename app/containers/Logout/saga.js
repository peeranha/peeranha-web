import { takeLatest, call, put, select } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';
import { deleteCookie } from 'utils/cookie';

import { AUTOLOGIN_DATA, PROFILE_INFO_LS } from 'containers/Login/constants';
import { WEB3_TOKEN } from 'utils/constants';
import { getCurrentAccountSuccess, addLoginData } from 'containers/AccountProvider/actions';

import { LOGOUT } from './constants';

import { logoutSuccess, logoutErr } from './actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { clearNotificationsData } from '../../components/Notifications/actions';
import { selectEthereum } from '../EthereumProvider/selectors';
import { META_TRANSACTIONS_ALLOWED } from '../../utils/constants';

export function* logoutWorker() {
  try {
    const ethereumService = yield select(selectEthereum);
    const locale = yield select(makeSelectLocale());

    const baseUrl = locale === 'en' ? '' : `/${locale}`;

    deleteCookie(AUTOLOGIN_DATA);
    deleteCookie(PROFILE_INFO_LS);
    deleteCookie(META_TRANSACTIONS_ALLOWED);
    deleteCookie(WEB3_TOKEN);

    yield call(ethereumService.resetWalletState);

    yield call(createdHistory.push, baseUrl + routes.feed());
    yield put(getCurrentAccountSuccess());
    yield put(addLoginData({}));

    yield put(clearNotificationsData());

    yield put(logoutSuccess());
  } catch (err) {
    yield put(logoutErr(err));
  }
}

export default function* () {
  yield takeLatest(LOGOUT, logoutWorker);
}
