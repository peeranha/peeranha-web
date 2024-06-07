import { selectAnswers, selectGenerationStopped } from 'containers/AISearch/selectors';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_SEARCH_RESULT } from 'containers/AISearch/constants';
import {
  getChunkSuccess,
  getSearchResultError,
  getSearchResultSuccess,
} from 'containers/AISearch/actions';
import { getSearchResult } from 'utils/semanticSearch';

export function* getSearchResultWorker({ query, communityId }) {
  try {
    const answers = yield select(selectAnswers());
    const reader = yield call(getSearchResult, query, communityId);
    const decoder = new TextDecoder('utf-8');
    answers.push({});
    while (true) {
      const generationStopped = yield select(selectGenerationStopped());
      const { done, value } = yield call([reader, reader.read]);

      if (done || generationStopped) break;

      const chunkData = decoder.decode(value, { stream: true });
      const jsonObjects = `[${chunkData.replace(/}{/g, '}, {')}]`;
      const result = JSON.parse(jsonObjects);
      answers[answers.length - 1].answer = result[result.length - 1].answer;
      answers[answers.length - 1].resources = result[result.length - 1].resources;
      yield put(getChunkSuccess(answers));
    }
    yield put(getSearchResultSuccess());
  } catch (e) {
    console.log('Stream ERROR ', e);
    yield put(getSearchResultError(e));
  }
}

export default function* () {
  yield takeLatest(GET_SEARCH_RESULT, getSearchResultWorker);
}
