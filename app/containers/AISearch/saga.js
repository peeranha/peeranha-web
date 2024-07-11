import {
  selectAnswers,
  selectGenerationStopped,
  selectThreadId,
} from 'containers/AISearch/selectors';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_SEARCH_RESULT } from 'containers/AISearch/constants';
import {
  getChunkSuccess,
  getSearchResultError,
  getSearchResultSuccess,
} from 'containers/AISearch/actions';
import { getSearchResult } from 'utils/semanticSearch';

export function* getSearchResultWorker({ query, communityId }) {
  let response = null;
  try {
    const answers = yield select(selectAnswers());
    const threadId = yield select(selectThreadId());
    const reader = yield call(getSearchResult, query, communityId, threadId);
    const decoder = new TextDecoder('utf-8');
    answers.push({});
    let index = 0;
    while (true) {
      index += 1;
      const generationStopped = yield select(selectGenerationStopped());
      const { done, value } = yield call([reader, reader.read]);

      if (done) break;
      if (generationStopped) {
        if (index === 1) {
          answers[answers.length - 1].answer = 'Generation stopped...';
          answers[answers.length - 1].resources = [];
        }
        yield put(getChunkSuccess(answers, true));
        break;
      }

      const chunkData = decoder.decode(value, { stream: true });
      response = chunkData;
      const jsonObjects = `[${chunkData.replace(/}{/g, '}, {')}]`;
      let result;
      try {
        result = JSON.parse(jsonObjects);
      } catch (parsingError) {
        // eslint-disable-next-line no-continue
        continue;
      }
      if (result) {
        answers[answers.length - 1].answer = result[result.length - 1].answer;
        answers[answers.length - 1].resources = result[result.length - 1].resources;
        yield put(getChunkSuccess(answers, false, result[result.length - 1].threadId));
      }
    }
    yield put(getSearchResultSuccess());
  } catch (e) {
    console.log('Stream ERROR ', response, ' error text: ', e);
    yield put(getSearchResultError(e));
  }
}

export default function* () {
  yield takeLatest(GET_SEARCH_RESULT, getSearchResultWorker);
}
