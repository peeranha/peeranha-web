import { GET_FAQ } from 'containers/Faq/constants';
import {
  getQuestionsError,
  getQuestionsSuccess,
} from 'containers/Questions/actions';

import { getPosts, getPostsByCommunityId } from 'utils/theGraph';

export function* getFaqWorker({ communityIdFilter, next, toUpdateQuestions }) {
  try {
    const questionsList = yield call(getPostsByCommunityId, [
      communityIdFilter,
    ]);

    yield put(getFaqSuccess(questionsList, next, toUpdateQuestions, undefined));
  } catch (err) {
    yield put(getQuestionsError(err));
  }
}

export default function*() {
  yield takeLatest(GET_FAQ, getFaqWorker);
}
