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
    const response = yield call(
      fetch,
      'https://orpbzrwr25kteba3dsftyghdom0nykmi.lambda-url.us-east-2.on.aws/',
      {
        method: 'POST',
        body: JSON.stringify({
          query,
          communityId: '3-0xdf71421e1693893fc5a71c1daf097a68468226e67f1f670d686f3eb1ffb9c8e9',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (e) {
    yield put(getSearchResultError(e));
  }
}

export default function* () {
  yield takeLatest(GET_SEARCH_RESULT, getSearchResultWorker);
}
