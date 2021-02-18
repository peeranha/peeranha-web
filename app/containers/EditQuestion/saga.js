/* eslint camelcase: 0 */
import { takeLatest, call, put, select } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import {
  getAskedQuestion,
  getQuestionById,
  getPromotedQuestions,
  getPromoteQuestTrActData,
  getChangePromoCommTrActData,
  getEditQuestTrActData,
} from 'utils/questionsManagement';
import { getEditBountyTrActData } from 'utils/walletManagement';
import { getCommunityWithTags } from 'utils/communityManagement';
import { ONE_HOUR_IN_SECONDS, dateNowInSeconds } from 'utils/datetime';

import { isValid, isAuthorized } from 'containers/EosioProvider/saga';
import { updateQuestionList } from 'containers/ViewQuestion/saga';

import { selectEos } from 'containers/EosioProvider/selectors';
import { selectQuestionData } from 'containers/ViewQuestion/selectors';

import {
  GET_ASKED_QUESTION,
  EDIT_QUESTION,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_BUTTON,
  MIN_RATING_TO_EDIT_QUESTION,
  MIN_ENERGY_TO_EDIT_QUESTION,
} from './constants';

import {
  getAskedQuestionSuccess,
  getAskedQuestionErr,
  editQuestionSuccess,
  editQuestionErr,
} from './actions';
import { selectQuestion } from './selectors';

export function* getAskedQuestionWorker({ questionId }) {
  try {
    const eosService = yield select(selectEos);
    const cachedQuestion = yield select(selectQuestionData());

    let freshQuestion;

    if (!cachedQuestion) {
      const { ipfs_link } = yield call(getQuestionById, eosService, questionId);
      freshQuestion = yield call(getAskedQuestion, ipfs_link, eosService);
    }

    const question = cachedQuestion
      ? cachedQuestion.content
      : { ...freshQuestion };
    const { communityId } = question;

    if (communityId) {
      question.community = yield call(
        getCommunityWithTags,
        eosService,
        communityId,
      );

      delete question.communityId;

      question.chosenTags.map(tag => (tag.label = tag.name));
    }

    const promotedQuestions = yield call(
      getPromotedQuestions,
      eosService,
      question.community?.id,
    );

    const promotedQuestion = promotedQuestions.find(
      item => item.question_id === questionId,
    );

    if (promotedQuestion) {
      question.promote = {
        startTime: promotedQuestion.start_time,
        endsTime: promotedQuestion.ends_time,
      };
    }

    yield put(getAskedQuestionSuccess(question));
  } catch (err) {
    yield put(getAskedQuestionErr(err));
  }
}

export function* editQuestionWorker({ question, questionId }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield call(eosService.getSelectedAccount);
    const cachedQuestion = yield select(selectQuestionData());

    // collect actions for one transaction
    const actionsData = [];

    const editQuestTransActData = yield call(
      getEditQuestTrActData,
      selectedAccount,
      questionId,
      { ...question },
    );

    actionsData.push(editQuestTransActData);

    if (question?.bounty) {
      const now = Math.round(new Date().valueOf() / 1000);
      const bountyTime = now + question?.bountyHours * ONE_HOUR_IN_SECONDS;

      const transActData = getEditBountyTrActData(
        selectedAccount,
        question?.bountyFull,
        questionId,
        bountyTime,
        eosService,
      );

      actionsData.push(transActData);
    }

    if (question.promote) {
      const transActData = getPromoteQuestTrActData(
        selectedAccount,
        questionId,
        question.promote,
      );

      actionsData.push(transActData);
    }

    // change promoted question community
    const initialEditQuestData = yield select(selectQuestion());

    if (initialEditQuestData.promote) {
      const { endsTime } = initialEditQuestData.promote;
      const prevCommId = initialEditQuestData.community.id;
      const dateNow = dateNowInSeconds();
      const currCommId = question.community.id;

      if (endsTime > dateNow && prevCommId !== currCommId) {
        const transActData = getChangePromoCommTrActData(
          selectedAccount,
          questionId,
          prevCommId,
        );

        actionsData.push(transActData);
      }
    }

    // send transaction with actions
    const waitForGettingToBlock = !!actionsData.find(
      el => el.waitForGettingToBlock,
    );

    yield call(
      eosService.sendTransactionMult,
      selectedAccount,
      actionsData,
      waitForGettingToBlock,
    );

    if (cachedQuestion) {
      cachedQuestion.title = question.title;
      cachedQuestion.tags = question.chosenTags.map(x => x.id);
      cachedQuestion.community_id = question.community.id;
      cachedQuestion.bounty = question?.bounty;
      cachedQuestion.bountyFull = question?.bountyFull;
      cachedQuestion.bountyHours = question?.bountyHours;
      cachedQuestion.promote = question?.promote;
      cachedQuestion.content = { ...question };
    }

    yield put(editQuestionSuccess(cachedQuestion));
    yield call(createdHistory.push, routes.questionView(questionId));
  } catch (err) {
    yield put(editQuestionErr(err));
  }
}

// TODO: test
export function* checkReadinessWorker({ buttonId }) {
  yield call(isAuthorized);

  yield call(isValid, {
    buttonId: buttonId || EDIT_QUESTION_BUTTON,
    minRating: MIN_RATING_TO_EDIT_QUESTION,
    minEnergy: MIN_ENERGY_TO_EDIT_QUESTION,
  });
}

// TODO: test
/* eslint no-empty: 0 */
export function* redirectToEditQuestionPageWorker({ buttonId, link }) {
  try {
    yield call(checkReadinessWorker, { buttonId });
    yield call(createdHistory.push, link);
  } catch (err) {}
}

export default function*() {
  yield takeLatest(GET_ASKED_QUESTION, getAskedQuestionWorker);
  yield takeLatest(EDIT_QUESTION, editQuestionWorker);
  yield takeLatest(EDIT_QUESTION_SUCCESS, updateQuestionList);
}
