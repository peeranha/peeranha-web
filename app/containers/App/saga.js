import { takeLatest, call, select } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { REDIRECT_TO_FEED, REDIRECT_TO_DOCUMENTATION, REDIRECT_TO_PRELOAD } from './constants';

export function* redirectToFeedWorker() {
  const locale = yield select(makeSelectLocale());

  const baseUrl = locale === 'en' ? '' : `/${locale}`;

  yield call(createdHistory.push, baseUrl + routes.feed());
}

export function* redirectToDocumentationWorker() {
  const locale = yield select(makeSelectLocale());

  const baseUrl = locale === 'en' ? '' : `/${locale}`;

  yield call(createdHistory.push, baseUrl + routes.documentationStartPage());
}

export function* redirectToPreloadWorker() {
  const locale = yield select(makeSelectLocale());

  const baseUrl = locale === 'en' ? '' : `/${locale}`;

  yield call(createdHistory.push, baseUrl + routes.preloaderPage());
}

export default function* () {
  yield takeLatest(REDIRECT_TO_FEED, redirectToFeedWorker);
  yield takeLatest(REDIRECT_TO_DOCUMENTATION, redirectToDocumentationWorker);
  yield takeLatest(REDIRECT_TO_PRELOAD, redirectToPreloadWorker);
}
