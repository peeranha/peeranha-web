/* eslint camelcase: 0 */
import { languagesEnum } from 'app/i18n';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectSuiWallet } from 'containers/SuiProvider/selectors';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { editQuestion, getQuestionById } from 'utils/questionsManagement';
import { getCommunityWithTags } from 'utils/communityManagement';

import { isAuthorized, isValid } from 'containers/EthereumProvider/saga';
import { updateQuestionList } from 'containers/ViewQuestion/saga';

import { selectQuestionData } from 'containers/ViewQuestion/selectors';
import { editSuiQuestion } from 'utils/sui/questionsManagement';
import { getSuiPost } from 'utils/sui/suiIndexer';

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
import { makeSelectAccount, makeSelectProfileInfo } from '../AccountProvider/selectors';
import { saveChangedItemIdToSessionStorage } from 'utils/sessionStorage';
import { CHANGED_POSTS_KEY, POST_TYPE } from 'utils/constants';
import { isSuiBlockchain } from 'utils/sui/sui';
import { getQuestionFromGraph } from 'utils/theGraph';

export function* getAskedQuestionWorker({ questionId }) {
  try {
    let ethereumService;
    if (!isSuiBlockchain) {
      ethereumService = yield select(selectEthereum);
    }
    const cachedQuestion = yield select(selectQuestionData());
    const account = yield select(makeSelectAccount());
    let question;
    let questionFromContract;

    if (!cachedQuestion) {
      if (isSuiBlockchain) {
        question = yield call(getSuiPost, questionId);
      } else {
        questionFromContract = yield call(getQuestionById, ethereumService, questionId, account);
        question = {
          ...questionFromContract,
          isGeneral: !!questionFromContract.postType,
        };
        const { communityId } = question;

        if (communityId) {
          const [community, tags] = yield call(getCommunityWithTags, communityId);

          question.community = community;

          question.tags = questionFromContract.tags;
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

export function* editQuestionWorker({ question, questionId, id2 }) {
  try {
    const locale = yield select(makeSelectLocale());

    const questionData = {
      title: question.title,
      content: question.content,
    };

    if (isSuiBlockchain) {
      const wallet = yield select(selectSuiWallet());
      const profile = yield select(makeSelectProfileInfo());
      console.log(profile);
      yield call(
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
      const ethereumService = yield select(selectEthereum);
      const selectedAccount = yield call(ethereumService.getSelectedAccount);
      yield call(
        editQuestion,
        selectedAccount,
        Number(questionId),
        Number(question.communityId),
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
