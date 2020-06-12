import { takeLatest, call } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { REDIRECT_TO_FEED } from './constants';

export function* redirectToFeedWorker() {
  yield call(createdHistory.push, routes.feed());
}

export default function*() {
  yield takeLatest(REDIRECT_TO_FEED, redirectToFeedWorker);
}
