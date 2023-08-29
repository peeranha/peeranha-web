import { languagesEnum } from 'app/i18n';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';
import { getActualId } from 'utils/properties';

import { editAnswer } from 'utils/questionsManagement';

import { isAuthorized, isValid } from 'containers/EthereumProvider/saga';
import { updateQuestionList } from 'containers/ViewQuestion/saga';

import { selectQuestionData } from 'containers/ViewQuestion/selectors';

import { saveChangedItemIdToSessionStorage } from 'utils/sessionStorage';
import { CHANGED_POSTS_KEY } from 'utils/constants';
import { isSuiBlockchain, waitForTransactionConfirmation } from 'utils/sui/sui';
import { selectSuiWallet } from 'containers/SuiProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { getPost, getReply, getReplyId2 } from 'utils/theGraph';
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
    const question = yield call(getPost, questionId);
    const answer = yield call(getReply, answerId);
    yield put(
      getAnswerSuccess({
        ...answer,
        communityId: question.communityId,
        isOfficialReply: question.officialReply === Number(answerId.split('-')[2]),
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
      const answerData = yield call(getReply, answerId);

      let txResult;
      if (profile.id === answerData.author.id) {
        const answerObjectId = yield call(getReplyId2, answerId);
        txResult = yield call(
          authorEditSuiAnswer,
          wallet,
          profile.id,
          getActualId(questionId),
          answerObjectId,
          answerId.split('-')[2],
          answerContent,
          official,
          languagesEnum[locale],
        );
      } else {
        txResult = yield call(
          moderatorEditSuiAnswer,
          wallet,
          profile.id,
          getActualId(questionId),
          answerId.split('-')[2],
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
