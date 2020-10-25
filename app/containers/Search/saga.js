import { takeEvery, put, call } from 'redux-saga/effects';
import { getResults } from 'utils/custom-search';

import { GET_RESULTS } from './constants';
import {
  getResultsSuccess,
  getResultsErr,
  getExistingQuestionSuccess,
} from './actions';

export function* searchWorker({ query, isItAskQuestion }) {
  try {
    const items = yield call(getResults, query);
    if (isItAskQuestion) {
      yield put(getExistingQuestionSuccess(items));
    } else yield put(getResultsSuccess(items));
  } catch (err) {
    yield put(getResultsErr(err));
  }
}

export default function* defaultSaga() {
  yield takeEvery(GET_RESULTS, searchWorker);
}
