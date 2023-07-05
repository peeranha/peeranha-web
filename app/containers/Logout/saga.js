import { setTransactionList } from 'containers/EthereumProvider/actions';
import { selectSuiWallet } from 'containers/SuiProvider/selectors';
import { takeLatest, call, put, select } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';
import { deleteCookie } from 'utils/cookie';

import { AUTOLOGIN_DATA, PROFILE_INFO_LS } from 'containers/Login/constants';
import { WEB3_TOKEN } from 'utils/constants';
import { getCurrentAccountSuccess, addLoginData } from 'containers/AccountProvider/actions';
import { TRANSACTION_LIST } from 'utils/ethereum/transactionsListManagement';
import { isSuiBlockchain } from 'utils/sui/sui';

import { LOGOUT } from './constants';

import { logoutSuccess, logoutErr } from './actions';
import { clearNotificationsData } from 'components/Notifications/actions';
import { selectEthereum } from '../EthereumProvider/selectors';
import { META_TRANSACTIONS_ALLOWED } from 'utils/constants';

export function* logoutWorker() {
  try {
    if (!isSuiBlockchain) {
      const ethereumService = yield select(selectEthereum);

      deleteCookie(AUTOLOGIN_DATA);
      deleteCookie(PROFILE_INFO_LS);
      deleteCookie(META_TRANSACTIONS_ALLOWED);
      deleteCookie(WEB3_TOKEN);

      yield call(ethereumService.resetWalletState);
    }
    const wallet = yield select(selectSuiWallet());
    yield call(wallet.disconnect);

    yield call(createdHistory.push, routes.feed());
    yield put(getCurrentAccountSuccess());
    yield put(addLoginData({}));

    yield put(clearNotificationsData());
    yield put(setTransactionList([]));
    ethereumService.transactionList = [];
    localStorage.removeItem(TRANSACTION_LIST);

    yield put(logoutSuccess());
  } catch (err) {
    yield put(logoutErr(err));
  }
}

export default function* () {
  yield takeLatest(LOGOUT, logoutWorker);
}
