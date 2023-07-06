/* eslint camelcase: 0 */
import { languagesEnum } from 'app/i18n';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectSuiWallet } from 'containers/SuiProvider/selectors';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { editQuestion } from 'utils/questionsManagement';
import { getCommunityTags, getCommunityWithTags } from 'utils/communityManagement';

import { isAuthorized, isValid } from 'containers/EthereumProvider/saga';
import { updateQuestionList } from 'containers/ViewQuestion/saga';

import { selectQuestionData } from 'containers/ViewQuestion/selectors';
import { editSuiQuestion, moderatorEditSuiQuestion } from 'utils/sui/questionsManagement';
import { getSuiPost, waitForPostTransactionToIndex } from 'utils/sui/suiIndexer';
import { getQuestionFromGraph } from 'utils/theGraph';

import {
  EDIT_QUESTION,
  EDIT_QUESTION_BUTTON,
  EDIT_QUESTION_SUCCESS,
  GET_ASKED_QUESTION,
  MIN_ENERGY_TO_EDIT_QUESTION,
  MIN_RATING_TO_EDIT_QUESTION,
} from './constants';

import {
  editQuestionErr,
  editQuestionSuccess,
  getAskedQuestionErr,
  getAskedQuestionSuccess,
} from './actions';
import { selectEthereum } from '../EthereumProvider/selectors';
import { makeSelectProfileInfo } from '../AccountProvider/selectors';
import { saveChangedItemIdToSessionStorage } from 'utils/sessionStorage';
import { CHANGED_POSTS_KEY, POST_TYPE } from 'utils/constants';
import { isSuiBlockchain, waitForTransactionConfirmation } from 'utils/sui/sui';
import {
  transactionCompleted,
  transactionFailed,
  transactionInitialised,
  transactionInPending,
} from 'containers/EthereumProvider/actions';

export function* getAskedQuestionWorker({ questionId }) {
  try {
    const cachedQuestion = yield select(selectQuestionData());
    let question;

    if (!cachedQuestion) {
      if (isSuiBlockchain) {
        const communities = yield select(selectCommunities());
        question = yield call(getSuiPost, questionId, communities);
      } else {
        question = yield call(getQuestionFromGraph, questionId);
        const { communityId } = question;

        if (communityId) {
          const [community] = yield call(getCommunityWithTags, communityId);
          const tags = yield call(getCommunityTags, communityId);
          const questionTags = tags[communityId].filter((tag) =>
            question.tags.map((questionTag) => questionTag.id).includes(tag.id),
          );

          question.community = community;
          question.tags = questionTags;
        }
      }
    } else {
      question = cachedQuestion;
    }

    yield put(getAskedQuestionSuccess(question));
  } catch (err) {
    yield put(getAskedQuestionErr(err));
  }
}

export function* editQuestionWorker({ question, questionId, id2, author }) {
  try {
    const locale = yield select(makeSelectLocale());

    const questionData = {
      title: question.title,
      content: question.content,
    };

    if (isSuiBlockchain) {
      yield put(transactionInitialised());
      const wallet = yield select(selectSuiWallet());
      const profile = yield select(makeSelectProfileInfo());
      let txResult;
      if (profile.id === author) {
        txResult = yield call(
          editSuiQuestion,
          wallet,
          profile.id,
          id2,
          questionId,
          question.communityId,
          questionData,
          Number(question.postType),
          question.tags,
          languagesEnum[locale],
        );
      } else {
        txResult = yield call(
          moderatorEditSuiQuestion,
          wallet,
          profile.id,
          questionId,
          question.communityId,
          Number(question.postType),
          question.tags,
          languagesEnum[locale],
        );
      }

      yield put(transactionInPending(txResult.digest));
      const confirmedTx = yield call(waitForTransactionConfirmation, txResult.digest);
      yield call(waitForPostTransactionToIndex, confirmedTx.digest);
      yield put(transactionCompleted());
    } else {
      const ethereumService = yield select(selectEthereum);
      const selectedAccount = yield call(ethereumService.getSelectedAccount);
      yield call(
        editQuestion,
        questionId.split('-')[0],
        selectedAccount,
        questionId,
        question.communityId,
        questionData,
        question.tags,
        Number(question.postType),
        languagesEnum[locale],
        ethereumService,
      );
    }

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

    yield put(editQuestionSuccess(question));
    yield call(
      createdHistory.push,
      Number(question.postType) === Number(POST_TYPE.documentation)
        ? routes.documentation(questionId, question.title)
        : routes.questionView(questionId, question.title),
    );
  } catch (err) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
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

export default function* () {
  yield takeLatest(GET_ASKED_QUESTION, getAskedQuestionWorker);
  yield takeLatest(EDIT_QUESTION, editQuestionWorker);
  yield takeLatest(EDIT_QUESTION_SUCCESS, updateQuestionList);
}
