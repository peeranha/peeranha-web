import { POST_TYPES } from 'containers/ViewQuestion/constants';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import {
  postQuestion,
  getCreatedPostId,
  updateDocumentationTree,
} from 'utils/questionsManagement';

import { getResults } from 'utils/custom-search';

import { makeSelectAccount } from 'containers/AccountProvider/selectors';

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
import { isAuthorized, isValid } from 'containers/EosioProvider/saga';
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

export function* postQuestionWorker({ val }) {
  try {
    const ethereumService = yield select(selectEthereum);
    const selectedAccount = yield select(makeSelectAccount());
    const documentationMenu = yield select(selectDocumentationMenu());

    // const promoteValue = +val[FORM_PROMOTE];
    const postType = +val[FORM_TYPE];
    const tags =
      postType !== POST_TYPE.documentation
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
    if (postType === POST_TYPE.documentation) {
      const documentationTraversal = documentationArray => {
        return documentationArray.map(documentationSection => {
          if (
            String(documentationSection.id) ===
            String(val[FORM_SUB_ARTICLE].value)
          ) {
            documentationSection.children.push({
              id: id.toString(),
              children: [],
            });
            return {
              id: documentationSection.id,
              children: documentationSection.children,
            };
          } else {
            if (documentationSection.children.length) {
              return {
                id: documentationSection.id,
                children: documentationTraversal(documentationSection.children),
              };
            } else
              return {
                id: documentationSection.id,
                children: documentationSection.children,
              };
          }
        });
      };
      let newMenu;

      if (
        documentationMenu?.length &&
        Number(val[FORM_SUB_ARTICLE].value) !== -1
      ) {
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
      console.log(newMenu);

      const documentationJSON = {
        pinnedId: '',
        documentations: newMenu,
      };
      console.log(documentationJSON);
      console.log(JSON.stringify(documentationJSON));

      yield call(
        updateDocumentationTree,
        selectedAccount,
        communityId,
        documentationJSON,
        ethereumService,
      );
    }

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
      postType === POST_TYPE.documentation
        ? routes.documentation(id)
        : routes.questionView(id, false, communityId),
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
export function* redirectToAskQuestionPageWorker({
  buttonId,
  isDocumentation,
  parentId,
}) {
  try {
    yield call(checkReadinessWorker, { buttonId });
    yield call(
      createdHistory.push,
      isDocumentation
        ? routes.documentationCreate(parentId)
        : routes.questionAsk(),
    );
  } catch (err) {}
}

export function* existingQuestionSaga() {
  yield takeLatest(GET_EXISTING_QUESTIONS, qetExistingQuestionsWorker);
}

export default function*() {
  yield takeLatest(ASK_QUESTION, postQuestionWorker);
}
