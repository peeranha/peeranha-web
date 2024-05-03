import { setTransactionList } from 'containers/EthereumProvider/actions';
import { setTransactionList as setSuiTransactionList } from 'containers/SuiProvider/actions';
import { takeLatest, call, put, select } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';
import { deleteCookie } from 'utils/cookie';

import { AUTOLOGIN_DATA, EMAIL_LOGIN_DATA, PROFILE_INFO_LS } from 'containers/Login/constants';
import { WEB3_TOKEN, META_TRANSACTIONS_ALLOWED, isSuiBlockchain } from 'utils/constants';
import { getCurrentAccountSuccess, addLoginData } from 'containers/AccountProvider/actions';
import { TRANSACTION_LIST } from 'utils/transactionsListManagement';
import { clearNotificationsData } from 'components/Notifications/actions';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { redirectToSSR } from 'utils/url';

import { LOGOUT } from './constants';

import { logoutSuccess, logoutErr } from './actions';
import { selectEthereum } from '../EthereumProvider/selectors';

export function* logoutWorker() {
  try {
    if (!isSuiBlockchain) {
      const ethereumService = yield select(selectEthereum);

      deleteCookie(AUTOLOGIN_DATA);
      deleteCookie(PROFILE_INFO_LS);
      deleteCookie(META_TRANSACTIONS_ALLOWED);
      deleteCookie(WEB3_TOKEN);
      ethereumService.transactionList = [];

      yield call(ethereumService.resetWalletState);
    } else {
      deleteCookie(EMAIL_LOGIN_DATA);
      yield put(setSuiTransactionList([]));
    }

    yield call(createdHistory.push, routes.feed());
    yield put(getCurrentAccountSuccess());
    yield put(addLoginData({}));
    localStorage.removeItem(TRANSACTION_LIST);
    yield put(clearNotificationsData());
    yield put(setTransactionList([]));

    yield put(logoutSuccess());
    redirectToSSR(isSingleCommunityWebsite());
  } catch (err) {
    yield put(logoutErr(err));
  }
}

export default function* () {
  yield takeLatest(LOGOUT, logoutWorker);
}
