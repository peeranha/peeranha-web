import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_SEARCH_RESULT } from 'containers/AISearch/constants';
import { getSearchResultError } from 'containers/AISearch/actions';
import { getSearchResult } from 'utils/semanticSearch';

const getRecaptchaToken = () =>
  window.grecaptcha.execute(process.env.RECAPTCHA_SITE_KEY, {
    action: 'homepage',
  });

export function* getSearchResultWorker({ query, communityId }) {
  try {
    const token = yield call(getRecaptchaToken);
    console.log('token', token);
    const searchResult = yield call(getSearchResult, query, token, communityId);
    console.log('searchResult', searchResult);
  } catch (e) {
    yield put(getSearchResultError(e));
  }
}

export default function* () {
  yield takeLatest(GET_SEARCH_RESULT, getSearchResultWorker);
}
