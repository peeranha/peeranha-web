import { call, put, takeLatest, select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { suggestTag } from 'utils/communityManagement';
import { selectEos } from 'containers/EosioProvider/selectors';

import {
  successToastHandlingWithDefaultText,
  errorToastHandlingWithDefaultText,
} from 'containers/Toast/saga';

import { suggestTagSuccess, suggestTagErr } from './actions';

import {
  SUGGEST_TAG,
  SUGGEST_TAG_SUCCESS,
  SUGGEST_TAG_ERROR,
} from './constants';

export function* suggestTagWorker({ tag, reset }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield call(() => eosService.getSelectedAccount());

    yield call(() => suggestTag(eosService, selectedAccount, tag));

    yield put(suggestTagSuccess());

    yield call(reset);

    yield call(() =>
      createdHistory.push(routes.suggestedTags(tag.communityId)),
    );
  } catch (err) {
    yield put(suggestTagErr(err.message));
  }
}

export default function*() {
  yield takeLatest(SUGGEST_TAG, suggestTagWorker);
  yield takeLatest(SUGGEST_TAG_SUCCESS, successToastHandlingWithDefaultText);
  yield takeLatest(SUGGEST_TAG_ERROR, errorToastHandlingWithDefaultText);
}
