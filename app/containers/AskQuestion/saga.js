import { languagesEnum } from 'app/i18n';
import ReactGA from 'react-ga4';
import { getCurrentAccountSuccess } from 'containers/AccountProvider/actions';
import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { showLoginModal } from 'containers/Login/actions';
import { selectSuiWallet } from 'containers/SuiProvider/selectors';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';
import { isSuiBlockchain } from 'utils/constants';
import { ApplicationError } from 'utils/errors';
import { getActualId, getNetwork } from 'utils/properties';

import { postQuestion, updateDocumentationTree } from 'utils/questionsManagement';

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
import { getSuiUserObject } from 'utils/sui/accountManagement';
import { createSuiProfile, getSuiProfileInfo } from 'utils/sui/profileManagement';
import { waitForOptimisticPostToIndex, waitForPostTransactionToIndex } from 'utils/sui/suiIndexer';
import {
  transactionCompleted,
  transactionFailed,
  transactionInitialised,
  transactionInPending,
} from 'containers/EthereumProvider/actions';
import { getQuestionData } from 'containers/ViewQuestion/actions';
import { selectDocumentationMenu } from 'containers/AppWrapper/selectors';
import { isValid } from 'containers/EthereumProvider/saga';
import { postSuiQuestion } from 'utils/sui/questionsManagement';
import { CREATE_POST_EVENT_NAME, waitForTransactionConfirmation } from 'utils/sui/sui';

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
  NEW_POST_PATHNAME,
} from './constants';

export function* postQuestionWorker({ val }) {
  try {
    ReactGA.event({
      category: 'Users',
      action: 'create_post_started',
    });
    const locale = yield select(makeSelectLocale());
    const postType = val[FORM_TYPE];
    const tags =
      postType !== POST_TYPE.documentation
        ? val[FORM_TAGS].map((tag) => Number(tag.id.split('-')[2]))
        : [];
    const communityId = val[FORM_COMMUNITY].id;

    const questionData = {
      title: val[FORM_TITLE],
      content: val[FORM_CONTENT],
    };

    if (isSuiBlockchain) {
      const wallet = yield select(selectSuiWallet());
      const suiUserObject = yield call(getSuiUserObject, wallet.address);
      yield put(transactionInitialised());
      const profile = yield select(makeSelectProfileInfo());
      if (!suiUserObject) {
        yield call(createSuiProfile, wallet);
        yield put(transactionCompleted());
        const newProfile = yield call(getSuiProfileInfo, wallet.address);
        yield put(getUserProfileSuccess(newProfile));
        yield put(getCurrentAccountSuccess(newProfile.id, 0, 0, 0));
        profile.id = newProfile.id;
      }
      const txResult = yield call(
        postSuiQuestion,
        wallet,
        profile.id,
        getActualId(val[FORM_COMMUNITY].id),
        questionData,
        postType,
        tags,
        languagesEnum[locale],
      );
      yield put(transactionInPending(txResult.digest));

      const confirmedTx = yield call(waitForTransactionConfirmation, txResult.digest);
      const postCreatedEvent = confirmedTx.events.filter((event) =>
        event.type.includes(CREATE_POST_EVENT_NAME),
      )[0];
      const idFromContract = postCreatedEvent.parsedJson.postMetaDataId;
      const id = `${getNetwork(communityId) + 1}-${idFromContract}`;
      yield call(waitForPostTransactionToIndex, confirmedTx.digest);

      yield put(transactionCompleted());
      yield put(askQuestionSuccess(id));

      if (window.location.pathname === '/ask' || postType === POST_TYPE.documentation) {
        yield call(
          createdHistory.push,
          postType === POST_TYPE.documentation
            ? routes.documentation(id, questionData.title)
            : routes.questionView(id, questionData.title, false),
        );
      }
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

      const optimisticIndexStatus = yield call(
        waitForOptimisticPostToIndex,
        transaction.transactionHash,
      );

      const logsArray = transaction.logs.filter((log) => log.data === '0x');
      const idFromTransaction = parseInt(
        logsArray[logsArray.length - 1].topics[3].substring(2),
        16,
      );
      const network = getNetwork(communityId);
      const id = `${Number(network) + 1}-${idFromTransaction}`;

      if (optimisticIndexStatus.isOptimisticIndexed && postType !== POST_TYPE.documentation) {
        yield call(createdHistory.push, routes.questionView(id, questionData.title, false));
      }

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
      yield call(waitForPostTransactionToIndex, transaction.transactionHash, ethereumService);
      yield put(askQuestionSuccess(id));
      ReactGA.event({
        category: 'Users',
        action: 'create_post_completed',
      });
      if (window.location.pathname === '/ask' || postType === POST_TYPE.documentation) {
        yield call(
          createdHistory.push,
          postType === POST_TYPE.documentation
            ? routes.documentation(id, questionData.title)
            : routes.questionView(id, questionData.title, false),
        );
      } else if (optimisticIndexStatus.isOptimisticIndexed) {
        yield put(getQuestionData(id));
      }
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
  const profileInfo = yield select(makeSelectProfileInfo());
  if (!profileInfo) {
    yield put(showLoginModal());
    throw new ApplicationError('Not authorized');
  }

  yield call(isValid, {
    buttonId: buttonId || POST_QUESTION_BUTTON,
    minRating: MIN_RATING_TO_POST_QUESTION,
    minEnergy: MIN_ENERGY_TO_POST_QUESTION,
  });
}

/* eslint no-empty: 0 */
export function* redirectToAskQuestionPageWorker({ buttonId, isDocumentation, parentId }) {
  try {
    const isNewPostPage = createdHistory.location.pathname === NEW_POST_PATHNAME;
    yield call(checkReadinessWorker, { buttonId });
    if (!isNewPostPage) {
      yield call(
        createdHistory.push,
        isDocumentation ? routes.documentationCreate(parentId) : routes.questionAsk(),
      );
    }
  } catch (err) {}
}

export function* existingQuestionSaga() {
  yield takeLatest(GET_EXISTING_QUESTIONS, qetExistingQuestionsWorker);
}

export default function* () {
  yield takeLatest(ASK_QUESTION, postQuestionWorker);
}
