import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';
import { isSuiBlockchain } from 'utils/sui/sui';

import { createCommunity } from 'utils/communityManagement';

import { isAuthorized, isValid } from 'containers/EthereumProvider/saga';

import { selectIsGlobalAdmin } from 'containers/AccountProvider/selectors';
import { createSuiCommunity } from 'utils/sui/communityManagement';
import { selectSuiWallet } from 'containers/SuiProvider/selectors';

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
    if (isSuiBlockchain) {
      const wallet = yield select(selectSuiWallet());
      yield call(createSuiCommunity, wallet, community);
    } else {
      const ethereumService = yield select(selectEthereum);
      const selectedAccount = yield call(ethereumService.getSelectedAccount);

      yield call(createCommunity, ethereumService, selectedAccount, community);
    }

    yield put(createCommunitySuccess());

    yield call(reset);

    yield call(createdHistory.push, routes.communitiesCreatedBanner());
  } catch (err) {
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
