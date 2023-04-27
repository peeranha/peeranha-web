import { languagesEnum } from 'app/i18n';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectSuiWallet } from 'containers/SuiProvider/selectors';
import { POST_TYPES } from 'containers/ViewQuestion/constants';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { postQuestion, getCreatedPostId, updateDocumentationTree } from 'utils/questionsManagement';

import { getResults } from 'utils/custom-search';

import { makeSelectAccount, makeSelectProfileInfo } from 'containers/AccountProvider/selectors';

import {
  FORM_COMMUNITY,
  FORM_CONTENT,
  FORM_SUB_ARTICLE,
  FORM_TAGS,
  FORM_TITLE,
  FORM_TYPE,
  POST_TYPE,
} from 'components/QuestionForm/constants';

import { selectDocumentationMenu } from 'containers/AppWrapper/selectors';
import { isAuthorized, isValid } from 'containers/EthereumProvider/saga';
import { postSuiQuestion } from 'utils/sui/questionsManagement';
import {
  CREATE_POST_EVENT_NAME,
  createPost,
  getTransactionEventByName,
  handleMoveCall,
  isSuiBlockchain,
  postLib,
  USER_RATING_COLLECTION,
} from 'utils/sui/sui';
import { selectEthereum } from '../EthereumProvider/selectors';

import {
  askQuestionError,
  askQuestionSuccess,
  getExistingQuestionError,
  getExistingQuestionSuccess,
} from './actions';

import {
  ASK_QUESTION,
  GET_EXISTING_QUESTIONS,
  MIN_ENERGY_TO_POST_QUESTION,
  MIN_RATING_TO_POST_QUESTION,
  POST_QUESTION_BUTTON,
} from './constants';
import { getSuiUserObject } from 'utils/sui/accountManagement';
import { createSuiProfile, getSuiProfileInfo } from 'utils/sui/profileManagement';
import { waitForPostTransactionToIndex } from 'utils/sui/suiIndexer';
import {
  transactionCompleted,
  transactionFailed,
  transactionInitialised,
  transactionInPending,
} from 'containers/EthereumProvider/actions';

export function* postQuestionWorker({ val }) {
  try {
    const locale = yield select(makeSelectLocale());
    const postType = +val[FORM_TYPE];
    const tags =
      postType !== POST_TYPE.documentation
        ? val[FORM_TAGS].map((tag) => Number(tag.id.split('-')[1]))
        : [];
    const communityId = val[FORM_COMMUNITY].id;

    const questionData = {
      title: val[FORM_TITLE],
      content: val[FORM_CONTENT],
    };

    if (isSuiBlockchain) {
      const wallet = yield select(selectSuiWallet());
      const suiUserObject = yield call(getSuiUserObject, wallet.address);
      if (!suiUserObject) {
        yield call(createSuiProfile, wallet);
        yield put(transactionCompleted());
        const newProfile = yield call(getSuiProfileInfo, wallet.address);
        profile.id = newProfile.id;
      }
      yield put(transactionInitialised());
      const profile = yield select(makeSelectProfileInfo());
      const txResult = yield call(
        postSuiQuestion,
        wallet,
        profile.id,
        val[FORM_COMMUNITY].suiId,
        questionData,
        postType,
        tags,
        languagesEnum[locale],
      );
      yield put(transactionInPending(txResult.digest));
      yield put(transactionCompleted());
      const postCreatedEvent = txResult.events.filter((event) =>
        event.type.includes(CREATE_POST_EVENT_NAME),
      )[0];
      const id = postCreatedEvent.parsedJson.postMetaDataId;

      yield call(waitForPostTransactionToIndex, txResult.digest);

      yield put(askQuestionSuccess(id));

      yield call(
        createdHistory.push,
        postType === POST_TYPE.documentation
          ? routes.documentation(id, questionData.title)
          : routes.questionView(id, questionData.title, false),
      );
    } else {
      const ethereumService = yield select(selectEthereum);
      const selectedAccount = yield select(makeSelectAccount());
      const documentationMenu = yield select(selectDocumentationMenu());
      const transaction = yield call(
        postQuestion,
        selectedAccount,
        communityId,
        questionData,
        postType,
        tags,
        languagesEnum[locale],
        ethereumService,
      );
      const id = yield call(
        getCreatedPostId,
        ethereumService,
        transaction.blockNumber,
        selectedAccount,
        communityId,
      );

      if (postType === POST_TYPE.documentation) {
        const documentationTraversal = (documentationArray) =>
          documentationArray.map((documentationSection) => {
            if (String(documentationSection.id) === String(val[FORM_SUB_ARTICLE].value)) {
              documentationSection.children.push({
                id: id.toString(),
                title: questionData.title,
                children: [],
              });
              return {
                id: documentationSection.id,
                children: documentationSection.children,
              };
            } else if (documentationSection.children.length) {
              return {
                id: documentationSection.id,
                children: documentationTraversal(documentationSection.children),
              };
            }
            return {
              id: documentationSection.id,
              children: documentationSection.children,
            };
          });
        let newMenu;

        if (documentationMenu?.length && Number(val[FORM_SUB_ARTICLE].value) !== -1) {
          newMenu = documentationTraversal(documentationMenu);
        } else {
          newMenu = [
            ...(documentationMenu || []),
            {
              id: id.toString(),
              children: [],
            },
          ];
        }

        const documentationJSON = {
          pinnedId: '',
          documentations: newMenu,
        };

        yield call(
          updateDocumentationTree,
          selectedAccount,
          communityId,
          documentationJSON,
          ethereumService,
        );
      }

      yield put(askQuestionSuccess(id));

      yield call(
        createdHistory.push,
        postType === POST_TYPE.documentation
          ? routes.documentation(id, questionData.title)
          : routes.questionView(id, questionData.title, false),
      );
    }
  } catch (err) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
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
export function* redirectToAskQuestionPageWorker({ buttonId, isDocumentation, parentId }) {
  try {
    yield call(checkReadinessWorker, { buttonId });
    yield call(
      createdHistory.push,
      isDocumentation ? routes.documentationCreate(parentId) : routes.questionAsk(),
    );
  } catch (err) {}
}

export function* existingQuestionSaga() {
  yield takeLatest(GET_EXISTING_QUESTIONS, qetExistingQuestionsWorker);
}

export default function* () {
  yield takeLatest(ASK_QUESTION, postQuestionWorker);
}
