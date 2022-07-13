import { POST_TYPES } from 'containers/ViewQuestion/constants';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { postQuestion, getCreatedPostId } from 'utils/questionsManagement';

import { getResults } from 'utils/custom-search';

import { makeSelectAccount } from 'containers/AccountProvider/selectors';

import {
  FORM_TITLE,
  FORM_CONTENT,
  FORM_COMMUNITY,
  FORM_TAGS,
  FORM_TYPE,
  POST_TYPE,
} from 'components/QuestionForm/constants';

import { isAuthorized, isValid } from 'containers/EosioProvider/saga';

import {
  askQuestionSuccess,
  askQuestionError,
  getExistingQuestionSuccess,
  getExistingQuestionError,
} from './actions';

import {
  ASK_QUESTION,
  POST_QUESTION_BUTTON,
  MIN_RATING_TO_POST_QUESTION,
  MIN_ENERGY_TO_POST_QUESTION,
  GET_EXISTING_QUESTIONS,
} from './constants';
import { selectEthereum } from '../EthereumProvider/selectors';
import { selectCommunities } from '../DataCacheProvider/selectors';

export function* postQuestionWorker({ val }) {
  try {
    const ethereumService = yield select(selectEthereum);
    const selectedAccount = yield select(makeSelectAccount());
    // const promoteValue = +val[FORM_PROMOTE];
    const postType = +val[FORM_TYPE];
    const tags =
      postType !== POST_TYPE.faq
        ? val[FORM_TAGS].map(tag => Number(tag.id.split('-')[1]))
        : [];
    const communityId = val[FORM_COMMUNITY].id;

    const questionData = {
      title: val[FORM_TITLE],
      content: val[FORM_CONTENT],
      // bounty: +val[FORM_BOUNTY],
      // bountyFull: `${getFormattedAsset(+val[FORM_BOUNTY])} PEER`,
      // bountyHours: +val[FORM_BOUNTY_HOURS],
    };
    const transaction = yield call(
      postQuestion,
      selectedAccount,
      communityId,
      questionData,
      postType,
      tags,
      ethereumService,
    );
    const id = yield call(
      getCreatedPostId,
      ethereumService,
      transaction.blockNumber,
      selectedAccount,
      communityId,
    );

    // if (val[FORM_BOUNTY] && Number(val[FORM_BOUNTY]) > 0) {
    //   const now = Math.round(new Date().valueOf() / 1000);
    //   const bountyTime = now + questionData.bountyHours * ONE_HOUR_IN_SECONDS;
    //
    //   yield call(
    //     setBounty,
    //     selectedAccount,
    //     questionData.bountyFull,
    //     questionsPostedByUser[0].question_id,
    //     bountyTime,
    //     eosService,
    //   );
    // }

    // if (promoteValue) {
    //   yield call(promoteQuestion, eosService, selectedAccount, que stionsPostedByUser[0].question_id, promoteValue);
    // }

    yield put(askQuestionSuccess(id));

    yield call(
      createdHistory.push,
      routes.questionView(id, false, communityId),
    );
  } catch (err) {
    yield put(askQuestionError(err));
  }
}

function* qetExistingQuestionsWorker({ query }) {
  try {
    const existingQuestions = yield call(getResults, query);
    yield put(getExistingQuestionSuccess(existingQuestions));
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

export function* existingQuestionSaga() {
  yield takeLatest(GET_EXISTING_QUESTIONS, qetExistingQuestionsWorker);
}

export default function*() {
  yield takeLatest(ASK_QUESTION, postQuestionWorker);
}
