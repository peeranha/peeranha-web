import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';
import ReactGA from 'react-ga4';

import { isSuiBlockchain } from 'utils/constants';
import { waitForTransactionConfirmation } from 'utils/sui/sui';
import { createCommunity } from 'utils/communityManagement';

import { isAuthorized, isValid } from 'containers/EthereumProvider/saga';
import {
  transactionCompleted,
  transactionFailed,
  transactionInitialised,
  transactionInPending,
} from 'containers/EthereumProvider/actions';

import { selectIsGlobalAdmin } from 'containers/AccountProvider/selectors';
import { createSuiCommunity } from 'utils/sui/communityManagement';
import { selectSuiWallet } from 'containers/SuiProvider/selectors';
import { uploadImg } from 'utils/profileManagement';
import { getFileUrl } from 'utils/ipfs';

import {
  createCommunitySuccess,
  createCommunityErr,
  getFormProcessing,
  getFormSuccess,
  getFormError,
} from './actions';

import { CREATE_COMMUNITY, CREATE_COMMUNITY_BUTTON, GET_FORM } from './constants';
import { selectEthereum } from '../EthereumProvider/selectors';

export function* createCommunityWorker({ community, reset }) {
  try {
    ReactGA.event({
      category: 'Users',
      action: 'create_community_started',
    });
    if (isSuiBlockchain) {
      yield put(transactionInitialised());
      const { imgHash } = yield call(uploadImg, community.avatar);
      community.avatar = getFileUrl(imgHash);
      const wallet = yield select(selectSuiWallet());
      const txResult = yield call(createSuiCommunity, wallet, community);
      yield put(transactionInPending(txResult.digest));
      yield call(waitForTransactionConfirmation, txResult.digest);
      yield put(transactionCompleted());
    } else {
      const ethereumService = yield select(selectEthereum);
      const selectedAccount = yield call(ethereumService.getSelectedAccount);
      const network = community.network.id;

      yield call(createCommunity, network, ethereumService, selectedAccount, community);
    }
    yield put(createCommunitySuccess());
    ReactGA.event({
      category: 'Users',
      action: 'create_community_completed',
    });
    yield call(reset);

    if (window.location.pathname === '/communities/create') {
      yield call(createdHistory.push, routes.communitiesCreatedBanner());
    }
  } catch (err) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
    yield put(createCommunityErr(err));
  }
}

export function* checkReadinessWorker({ buttonId }) {
  yield call(isAuthorized);

  yield call(isValid, {
    buttonId: buttonId || CREATE_COMMUNITY_BUTTON,
  });
}

/* eslint no-empty: 0 */
export function* redirectToCreateCommunityWorker({ buttonId }) {
  try {
    yield call(checkReadinessWorker, { buttonId });
    yield call(createdHistory.push, routes.communitiesCreate());
  } catch (err) {}
}

export function* getFormWorker() {
  try {
    yield put(getFormProcessing());
    const isGlobalAdmin = yield select(selectIsGlobalAdmin());

    if (!isGlobalAdmin) {
      yield put(getFormSuccess(false));
    } else {
      yield put(getFormSuccess(true));
    }
  } catch (err) {
    yield put(getFormError(err));
  }
}

export default function* () {
  yield takeLatest(GET_FORM, getFormWorker);
  yield takeLatest(CREATE_COMMUNITY, createCommunityWorker);
}
