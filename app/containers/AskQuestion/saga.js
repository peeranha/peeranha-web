import { takeLatest, call, put, select } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';
import { showLoginModal } from 'containers/Login/actions';

import { postQuestion } from 'utils/questionsManagement';
import { getProfileInfo } from 'utils/profileManagement';

import { ASK_QUESTION } from './constants';
import { askQuestionSuccess, askQuestionError } from './actions';
import { postQuestionValidator } from './validate';

export function* postQuestionWorker(res) {
  try {
    const eosService = yield select(selectEos);
    const profileInfo = yield call(() => getProfileInfo(res.user, eosService));

    if (!profileInfo) {
      yield put(showLoginModal());
      throw new Error('Not authorized');
    }

    yield call(() =>
      postQuestionValidator(profileInfo, res.postButtonId, res.translations),
    );

    yield call(() => postQuestion(res.user, res.questionData, eosService));

    yield put(askQuestionSuccess());
  } catch (err) {
    yield put(askQuestionError(err.message));
  }
}

export default function*() {
  yield takeLatest(ASK_QUESTION, postQuestionWorker);
}
