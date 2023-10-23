import { call, put, takeLatest, select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { createTag } from 'utils/communityManagement';

import { isAuthorized, isValid } from 'containers/EthereumProvider/saga';

import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { isSuiBlockchain } from 'utils/constants';
import { getSuiCommunityTags } from 'utils/sui/suiIndexer';
import { getTagsSuccess } from 'containers/DataCacheProvider/actions';
import { waitForTransactionConfirmation } from 'utils/sui/sui';
import { selectSuiWallet } from 'containers/SuiProvider/selectors';
import { createSuiTag } from 'utils/sui/communityManagement';
import {
  transactionCompleted,
  transactionFailed,
  transactionInitialised,
  transactionInPending,
} from 'containers/EthereumProvider/actions';

import {
  suggestTagErr,
  getFormProcessing,
  getFormSuccess,
  getFormError,
  suggestTagSuccess,
} from './actions';

import { SUGGEST_TAG, TAGFORM_SUBMIT_BUTTON, GET_FORM } from './constants';
import { selectEthereum } from '../EthereumProvider/selectors';
import { getActualId, getPermissions } from 'utils/properties';

export function* suggestTagWorker({ communityId, tag, reset }) {
  try {
    if (isSuiBlockchain) {
      yield put(transactionInitialised());
      const wallet = yield select(selectSuiWallet());
      const txResult = yield call(createSuiTag, wallet, getActualId(communityId), tag);
      yield put(transactionInPending(txResult.digest));
      yield call(waitForTransactionConfirmation, txResult.digest);
      yield put(transactionCompleted());
      const tags = (yield call(getSuiCommunityTags, communityId)).map((tag) => ({
        ...tag,
        label: tag.name,
      }));

      yield put(getTagsSuccess({ [tag.communityId]: tags }));
    } else {
      const ethereumService = yield select(selectEthereum);
      const selectedAccount = yield call(ethereumService.getSelectedAccount);
      yield call(createTag, ethereumService, selectedAccount, communityId, tag);
    }
    yield put(suggestTagSuccess());
    yield call(reset);
    yield call(createdHistory.push, routes.communityTags(communityId));
  } catch (err) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
    yield put(suggestTagErr(err));
  }
}

export function* checkReadinessWorker({ buttonId, communityId }) {
  yield call(isAuthorized);

  yield call(isValid, {
    buttonId: buttonId || TAGFORM_SUBMIT_BUTTON,
    communityId,
  });
}

/* eslint no-empty: 0 */
export function* redirectToCreateTagWorker({ buttonId, communityId }) {
  try {
    yield call(checkReadinessWorker, { buttonId, communityId });

    yield call(createdHistory.push, routes.tagsCreate(communityId));
  } catch (err) {}
}

export function* getFormWorker() {
  try {
    yield put(getFormProcessing());

    const profile = yield select(makeSelectProfileInfo());
    const hasPermissions = !!getPermissions(profile).length;
    if (!profile || !hasPermissions) {
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
  yield takeLatest(SUGGEST_TAG, suggestTagWorker);
}
