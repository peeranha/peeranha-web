import { takeLatest, call, put, select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import {
  postQuestion,
  getQuestionsPostedByUser,
} from 'utils/questionsManagement';

import { GET_RESULTS } from 'containers/Search/constants';

import { selectEos } from 'containers/EosioProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';

import {
  FORM_TITLE,
  FORM_CONTENT,
  FORM_COMMUNITY,
  FORM_TAGS,
  FORM_TYPE,
} from 'components/QuestionForm/constants';

import { isAuthorized, isValid } from 'containers/EosioProvider/saga';
import { searchWorker } from 'containers/Search/saga';

import {
  askQuestionSuccess,
  askQuestionError,
  getExistingQuestionSuccess,
  getExistingQuestionError } from './actions';

import {
  ASK_QUESTION,
  POST_QUESTION_BUTTON,
  MIN_RATING_TO_POST_QUESTION,
  MIN_ENERGY_TO_POST_QUESTION,
  GET_EXISTING_QUESTIONS,
} from './constants';

import { getResults } from '../../utils/custom-search';

export function* postQuestionWorker({ val }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield select(makeSelectAccount());
    const community = val[FORM_COMMUNITY];

    const questionData = {
      title: val[FORM_TITLE],
      content: val[FORM_CONTENT],
      chosenTags: val[FORM_TAGS],
      type: +val[FORM_TYPE],
      community,
    };

    yield call(postQuestion, selectedAccount, questionData, eosService);

    yield put(askQuestionSuccess());

    const questionsPostedByUser = yield call(
      getQuestionsPostedByUser,
      eosService,
      selectedAccount,
    );

    yield call(
      createdHistory.push,
      routes.questionView(
        questionsPostedByUser[0].question_id,
        false,
        community.id,
      ),
    );
  } catch (err) {
    yield put(askQuestionError(err));
  }
}

function* qetExistingQuestionsWorker({ query }) {
  try {
    const existingQuestions = yield call(getResults, query);
    yield put(getExistingQuestionSuccess(existingQuestions))
  } catch (err) {
    yield put(getExistingQuestionError(err));
  }
}

export function* checkReadinessWorker({ buttonId }) {
  yield call(isAuthorized);

  yield call(isValid, {
    buttonId: buttonId || POST_QUESTION_BUTTON,
    minRating: MIN_RATING_TO_POST_QUESTION,
    minEnergy: MIN_ENERGY_TO_POST_QUESTION,
  });
}

/* eslint no-empty: 0 */
export function* redirectToAskQuestionPageWorker({ buttonId }) {
  try {
    yield call(checkReadinessWorker, { buttonId });
    yield call(createdHistory.push, routes.questionAsk());
  } catch (err) {}
}

export default function*() {
  yield takeLatest(ASK_QUESTION, postQuestionWorker);
  yield takeLatest(GET_EXISTING_QUESTIONS, qetExistingQuestionsWorker);
}
