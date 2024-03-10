import { call, put, takeLatest } from 'redux-saga/effects';
import ReactGA from 'react-ga4';
import { GET_SEARCH_RESULT } from 'containers/AISearch/constants';
import { getSearchResultError, getSearchResultSuccess } from 'containers/AISearch/actions';
import { getSearchResult } from 'utils/semanticSearch';

const getRecaptchaToken = () =>
  window.grecaptcha.execute(process.env.RECAPTCHA_SITE_KEY, {
    action: 'homepage',
  });

export function* getSearchResultWorker({ query, communityId }) {
  try {
    ReactGA.event({
      category: 'Users',
      action: 'ai_search_started',
    });
    const token = yield call(getRecaptchaToken);
    const searchResult = yield call(getSearchResult, query, token, communityId);
    yield put(getSearchResultSuccess({ ...searchResult, question: query }));
    ReactGA.event({
      category: 'Users',
      action: 'ai_search_completed',
    });
  } catch (e) {
    yield put(getSearchResultError(e));
  }
}

export default function* () {
  yield takeLatest(GET_SEARCH_RESULT, getSearchResultWorker);
}
