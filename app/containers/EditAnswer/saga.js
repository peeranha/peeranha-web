import { languagesEnum } from 'app/i18n';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { editAnswer, getAnswer } from 'utils/questionsManagement';

import { isAuthorized, isValid } from 'containers/EthereumProvider/saga';
import { updateQuestionList } from 'containers/ViewQuestion/saga';

import { selectAnswer, selectQuestionData } from 'containers/ViewQuestion/selectors';

import { saveChangedItemIdToSessionStorage } from 'utils/sessionStorage';
import { CHANGED_POSTS_KEY } from 'utils/constants';
import { isSuiBlockchain, waitForTransactionConfirmation } from 'utils/sui/sui';
import { selectSuiWallet } from 'containers/SuiProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { getQuestionFromGraph, getReplyId2 } from 'utils/theGraph';
import { authorEditSuiAnswer, moderatorEditSuiAnswer } from 'utils/sui/questionsManagement';
import { waitForPostTransactionToIndex } from 'utils/sui/suiIndexer';
import {
  transactionCompleted,
  transactionFailed,
  transactionInitialised,
  transactionInPending,
} from 'containers/EthereumProvider/actions';

import {
  EDIT_ANSWER,
  EDIT_ANSWER_BUTTON,
  EDIT_ANSWER_SUCCESS,
  GET_ANSWER,
  MIN_ENERGY_TO_EDIT_ANSWER,
  MIN_RATING_TO_EDIT_ANSWER,
} from './constants';

import { editAnswerErr, editAnswerSuccess, getAnswerErr, getAnswerSuccess } from './actions';
import { selectEthereum } from '../EthereumProvider/selectors';
export function* getAnswerWorker({ questionId, answerId }) {
  try {
    let question;
    let answer;
    let ethereumService;

    if (isSuiBlockchain) {
      question = yield call(getQuestionFromGraph, questionId);
      answer = question.answers.reverse()[answerId - 1];
    } else {
      ethereumService = yield select(selectEthereum);
      answer = yield select(selectAnswer(answerId));
      question = yield call(getQuestionFromGraph, questionId);
    }

    if (!isSuiBlockchain && !answer) {
      answer = yield call(getAnswer, ethereumService, questionId, answerId);
    }

    yield put(
      getAnswerSuccess({
        ...answer,
        communityId: question.communityId,
        isOfficialReply: question.officialReply === answerId,
      }),
    );
  } catch (err) {
    yield put(getAnswerErr(err));
  }
}

export function* editAnswerWorker({ answer, questionId, answerId, official, title }) {
  try {
    const locale = yield select(makeSelectLocale());
    const cachedQuestion = yield select(selectQuestionData());
    const answerContent = {
      content: answer,
    };

    if (isSuiBlockchain) {
      yield put(transactionInitialised());
      const wallet = yield select(selectSuiWallet());
      const profile = yield select(makeSelectProfileInfo());
      const questionData = yield call(getQuestionFromGraph, questionId);
      const answerData = questionData.answers.reverse()[answerId - 1];

      let txResult;
      if (profile.id === answerData.author.id) {
        const answerObjectId = yield call(getReplyId2, questionId, answerId);
        txResult = yield call(
          authorEditSuiAnswer,
          wallet,
          profile.id,
          questionId,
          answerObjectId,
          answerId,
          answerContent,
          official,
          languagesEnum[locale],
        );
      } else {
        txResult = yield call(
          moderatorEditSuiAnswer,
          wallet,
          profile.id,
          questionId,
          answerId,
          official,
          languagesEnum[locale],
        );
      }
      yield put(transactionInPending(txResult.digest));
      const confirmedTx = yield call(waitForTransactionConfirmation, txResult.digest);
      yield call(waitForPostTransactionToIndex, confirmedTx.digest);
      yield put(transactionCompleted());
    } else {
      const ethereumService = yield select(selectEthereum);
      const user = yield call(ethereumService.getSelectedAccount);
      yield call(
        editAnswer,
        user,
        questionId,
        answerId,
        answerContent,
        official,
        languagesEnum[locale],
        ethereumService,
      );
    }

    if (cachedQuestion) {
      const item = cachedQuestion.answers.find((x) => x.id.toString() === answerId.toString());
      item.content = answer;
      if (official) {
        item.isOfficialReply = official;
      }
    }

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

    yield put(editAnswerSuccess({ ...cachedQuestion }));
    yield call(createdHistory.push, routes.questionView(questionId, title, answerId));
  } catch (err) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
    yield put(editAnswerErr(err));
  }
}

// TODO: test
export function* checkReadinessWorker({ buttonId }) {
  yield call(isAuthorized);

  yield call(isValid, {
    buttonId: buttonId || EDIT_ANSWER_BUTTON,
    minRating: MIN_RATING_TO_EDIT_ANSWER,
    minEnergy: MIN_ENERGY_TO_EDIT_ANSWER,
  });
}

// TODO: test
/* eslint no-empty: 0 */
export function* redirectToEditAnswerPageWorker({ buttonId, link }) {
  try {
    yield call(checkReadinessWorker, { buttonId });
    yield call(createdHistory.push, link);
  } catch (err) {}
}

export default function* () {
  yield takeLatest(GET_ANSWER, getAnswerWorker);
  yield takeLatest(EDIT_ANSWER, editAnswerWorker);
  yield takeLatest(EDIT_ANSWER_SUCCESS, updateQuestionList);
}
