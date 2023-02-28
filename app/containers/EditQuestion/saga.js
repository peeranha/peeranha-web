import { call, put, select, takeLatest } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { editQuestion, getQuestionById } from 'utils/questionsManagement';
import { getCommunityWithTags } from 'utils/communityManagement';

import { isAuthorized, isValid } from 'containers/EosioProvider/saga';
import { updateQuestionList } from 'containers/ViewQuestion/saga';

import { selectQuestionData } from 'containers/ViewQuestion/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

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
import { makeSelectAccount } from '../AccountProvider/selectors';
import { saveChangedItemIdToSessionStorage } from 'utils/sessionStorage';
import { CHANGED_POSTS_KEY, POST_TYPE } from 'utils/constants';

export function* getAskedQuestionWorker({ questionId }) {
  try {
    const ethereumService = yield select(selectEthereum);
    const cachedQuestion = yield select(selectQuestionData());
    const account = yield select(makeSelectAccount());
    let question;
    let questionFromContract;

    if (!cachedQuestion) {
      questionFromContract = yield call(
        getQuestionById,
        ethereumService,
        questionId,
        account,
      );
      question = {
        ...questionFromContract,
        isGeneral: !!questionFromContract.postType,
      };
    } else {
      question = cachedQuestion;
    }
    const { communityId } = question;

    if (communityId) {
      const [community, tags] = yield call(getCommunityWithTags, communityId);

      question.community = community;

      question.tags = questionFromContract.tags;
    }

    yield put(getAskedQuestionSuccess(question));
  } catch (err) {
    yield put(getAskedQuestionErr(err));
  }
}

export function* editQuestionWorker({ question, questionId }) {
  try {
    const ethereumService = yield select(selectEthereum);
    const locale = yield select(makeSelectLocale());

    const baseUrl = locale === 'en' ? '' : `/${locale}`;
    const selectedAccount = yield call(ethereumService.getSelectedAccount);

    const questionData = {
      title: question.title,
      content: question.content,
    };

    yield call(
      editQuestion,
      selectedAccount,
      Number(questionId),
      Number(question.communityId),
      questionData,
      question.tags,
      Number(question.postType),
      ethereumService,
    );

    saveChangedItemIdToSessionStorage(CHANGED_POSTS_KEY, questionId);

    yield put(editQuestionSuccess(question));
    yield call(
      createdHistory.push,
      Number(question.postType) === Number(POST_TYPE.documentation)
        ? baseUrl + routes.documentation(questionId, question.title)
        : baseUrl + routes.questionView(questionId, question.title),
    );
  } catch (err) {
    yield put(editQuestionErr(err));
  }
}

export function* checkReadinessWorker({ buttonId }) {
  yield call(isAuthorized);

  yield call(isValid, {
    buttonId: buttonId || EDIT_QUESTION_BUTTON,
    minRating: MIN_RATING_TO_EDIT_QUESTION,
    minEnergy: MIN_ENERGY_TO_EDIT_QUESTION,
  });
}

export function* redirectToEditQuestionPageWorker({ buttonId, link }) {
  try {
    const locale = yield select(makeSelectLocale());

    const baseUrl = locale === 'en' ? '' : `/${locale}`;

    yield call(checkReadinessWorker, { buttonId });
    yield call(createdHistory.push, baseUrl + link);
  } catch (err) {}
}

export default function* () {
  yield takeLatest(GET_ASKED_QUESTION, getAskedQuestionWorker);
  yield takeLatest(EDIT_QUESTION, editQuestionWorker);
  yield takeLatest(EDIT_QUESTION_SUCCESS, updateQuestionList);
}
