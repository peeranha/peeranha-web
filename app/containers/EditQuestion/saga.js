/* eslint camelcase: 0 */
import { languagesEnum } from 'app/i18n';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { editQuestion } from 'utils/questionsManagement';
import { getCommunityTags, getCommunityWithTags } from 'utils/communityManagement';

import { isAuthorized, isValid } from 'containers/EthereumProvider/saga';
import { updateQuestionList } from 'containers/ViewQuestion/saga';

import { saveChangedItemIdToSessionStorage } from 'utils/sessionStorage';
import { CHANGED_POSTS_KEY, POST_TYPE } from 'utils/constants';
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

export function* getAskedQuestionWorker({ questionId }) {
  try {
    const question = yield call(getQuestionFromGraph, questionId);
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

    yield put(getAskedQuestionSuccess(question));
  } catch (err) {
    yield put(getAskedQuestionErr(err));
  }
}

export function* editQuestionWorker({ question, questionId }) {
  try {
    const locale = yield select(makeSelectLocale());
    const ethereumService = yield select(selectEthereum);
    const selectedAccount = yield call(ethereumService.getSelectedAccount);

    const questionData = {
      title: question.title,
      content: question.content,
    };

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

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

    yield put(editQuestionSuccess(question));
    yield call(
      createdHistory.push,
      Number(question.postType) === Number(POST_TYPE.documentation)
        ? routes.documentation(questionId, question.title)
        : routes.questionView(questionId, question.title),
    );
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

export default function* () {
  yield takeLatest(GET_ASKED_QUESTION, getAskedQuestionWorker);
  yield takeLatest(EDIT_QUESTION, editQuestionWorker);
  yield takeLatest(EDIT_QUESTION_SUCCESS, updateQuestionList);
}
