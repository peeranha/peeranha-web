import { takeLatest, call } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import {
  REDIRECT_TO_FEED,
  REDIRECT_TO_DOCUMENTATION,
  REDIRECT_TO_PRELOAD,
} from './constants';

export function* redirectToFeedWorker() {
  yield call(createdHistory.push, routes.feed());
}

export function* redirectToDocumentationWorker(data) {
  const ipfs = data.ipfs;
  yield call(createdHistory.push, routes.documentation(ipfs));
}

export function* redirectToPreloadWorker() {
  yield call(createdHistory.push, routes.preloaderPage());
}

export default function* () {
  yield takeLatest(REDIRECT_TO_FEED, redirectToFeedWorker);
  yield takeLatest(REDIRECT_TO_DOCUMENTATION, redirectToDocumentationWorker);
  yield takeLatest(REDIRECT_TO_PRELOAD, redirectToPreloadWorker);
}
