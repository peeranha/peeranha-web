/* eslint consistent-return: 0 */

import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import { translationMessages } from 'i18n';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { getText } from 'utils/ipfs';

import {
  getQuestionById,
  postComment,
  postAnswer,
  upVote,
  downVote,
  markAsAccepted,
  deleteQuestion,
  deleteAnswer,
  deleteComment,
  editComment,
  voteToDelete,
} from 'utils/questionsManagement';

import { selectEos } from 'containers/EosioProvider/selectors';
import { removeUserProfile } from 'containers/DataCacheProvider/actions';
import { getUserProfileWorker } from 'containers/DataCacheProvider/saga';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { TOP_COMMUNITY_DISPLAY_MIN_RATING } from 'containers/Questions/constants';
import { getCurrentAccountWorker } from 'containers/AccountProvider/saga';
import { isAuthorized } from 'containers/EosioProvider/saga';

import {
  GET_QUESTION_DATA,
  POST_COMMENT,
  POST_ANSWER,
  UP_VOTE,
  DOWN_VOTE,
  MARK_AS_ACCEPTED,
  DELETE_QUESTION,
  DELETE_ANSWER,
  DELETE_COMMENT,
  SAVE_COMMENT,
  VOTE_TO_DELETE,
  ITEM_UPV_FLAG,
  ITEM_DNV_FLAG,
  ITEM_VOTED_TO_DEL_FLAG,
} from './constants';

import {
  getQuestionDataSuccess,
  getQuestionDataErr,
  postCommentSuccess,
  postCommentErr,
  postAnswerSuccess,
  postAnswerErr,
  upVoteSuccess,
  upVoteErr,
  downVoteSuccess,
  downVoteErr,
  markAsAcceptedSuccess,
  markAsAcceptedErr,
  deleteQuestionSuccess,
  deleteQuestionErr,
  deleteAnswerSuccess,
  deleteAnswerErr,
  deleteCommentSuccess,
  deleteCommentErr,
  saveCommentSuccess,
  saveCommentErr,
  voteToDeleteSuccess,
  voteToDeleteErr,
  updateQuestionData,
} from './actions';

import { selectQuestionData, selectAnswer, selectComment } from './selectors';

import {
  deleteAnswerValidator,
  deleteQuestionValidator,
  postAnswerValidator,
  postCommentValidator,
  markAsAcceptedValidator,
  upVoteValidator,
  downVoteValidator,
  voteToDeleteValidator,
  deleteCommentValidator,
} from './validate';

/* eslint no-param-reassign: 0 */
export function* getQuestionData({
  eosService,
  questionId,
  user,
}) /* istanbul ignore next */ {
  const question = yield call(() => getQuestionById(eosService, questionId));

  /* eslint no-bitwise: 0 */
  const getItemStatus = (historyFlag, constantFlag) =>
    historyFlag && historyFlag.flag & (1 << constantFlag);

  /*
   * @ITEM_UPV_FLAG - number of bit from historyFlag value - zero bit
   * got status with help of @getItemStatus function
   * if value of this bit NOT 0 => status (isUpVoted) is true
   * and so on
   */

  const votingStatus = history => {
    const flag = history.filter(x => x.user === user)[0];

    return {
      isUpVoted: !!getItemStatus(flag, ITEM_UPV_FLAG),
      isDownVoted: !!getItemStatus(flag, ITEM_DNV_FLAG),
      isVotedToDelete: !!getItemStatus(flag, ITEM_VOTED_TO_DEL_FLAG),
    };
  };

  const getlastEditedDate = properties => {
    const LAST_EDITED_KEY = 3;
    const lastEditedDate = properties.filter(x => x.key === LAST_EDITED_KEY)[0];

    return (lastEditedDate && lastEditedDate.value) || null;
  };

  function* addOptions(cachedItem, currentItem) {
    // Item's @content: IF cache is empty - take from IPFS
    if (cachedItem && cachedItem.content) {
      currentItem.content = cachedItem.content;
    } else {
      const content = yield call(() => getText(currentItem.ipfs_link));

      try {
        currentItem.content = JSON.parse(content);
      } catch (err) {
        currentItem.content = content;
      }
    }

    // Items's @userInfo: IF cache is empty - take from IPFS
    const userInfo = yield call(() =>
      getUserProfileWorker({ user: currentItem.user }),
    );

    currentItem.userInfo = userInfo;
    currentItem.isItWrittenByMe = user === currentItem.user;
    currentItem.votingStatus = votingStatus(currentItem.history);
    currentItem.lastEditedDate = getlastEditedDate(currentItem.properties);
  }

  function* processQuestion() {
    const cachedQuestion = yield select(selectQuestionData());
    yield call(() => addOptions(cachedQuestion, question));
  }

  /* eslint no-shadow: 0, func-names: 0 */
  function* processAnswers() {
    const mostRatingAnswer = window._.maxBy(question.answers, 'rating');

    yield all(
      question.answers.map(function*(x) {
        const cachedAnswer = yield select(selectAnswer(x.id));
        yield call(() => addOptions(cachedAnswer, x));

        x.isTheLargestRating =
          x.rating === mostRatingAnswer.rating &&
          x.rating > TOP_COMMUNITY_DISPLAY_MIN_RATING;

        yield all(
          x.comments.map(function*(y) {
            const cachedComment = yield select(selectComment(x.id, y.id));
            yield call(() => addOptions(cachedComment, y));
          }),
        );
      }),
    );
  }

  function* processCommentsOfQuestion() {
    yield all(
      question.comments.map(function*(x) {
        const answerId = 0; // it is unique ID for question to get comments
        const cachedComment = yield select(selectComment(answerId, x.id));

        yield call(() => addOptions(cachedComment, x));
      }),
    );
  }

  yield all([processQuestion(), processAnswers(), processCommentsOfQuestion()]);

  return question;
}

export function* saveCommentWorker({
  user,
  questionId,
  answerId,
  commentId,
  comment,
  toggleView,
}) {
  try {
    const eosService = yield select(selectEos);
    const cachedQues = yield select(selectQuestionData());

    yield call(() =>
      editComment(user, questionId, answerId, commentId, comment, eosService),
    );

    yield call(getCurrentAccountWorker);

    // Delete comment from cache to update it after
    if (+answerId === 0) {
      yield put(
        updateQuestionData({
          ...cachedQues,
          comments: cachedQues.comments.filter(x => x.id !== +commentId),
        }),
      );
    } else {
      const answer = cachedQues.answers.filter(x => x.id === +answerId)[0];
      const updatedComm = answer.comments.filter(y => y.id !== +commentId);

      yield put(
        updateQuestionData({
          ...cachedQues,
          answers: [
            ...cachedQues.answers.filter(x => x.id !== +answerId),
            {
              ...answer,
              comments: updatedComm,
            },
          ],
        }),
      );
    }

    const questionData = yield getQuestionData({
      eosService,
      questionId,
      user,
    });

    yield call(() => toggleView(true));

    yield put(saveCommentSuccess(questionData));
  } catch (err) {
    yield put(saveCommentErr(err));
  }
}

export function* deleteCommentWorker({
  user,
  questionId,
  answerId,
  commentId,
  buttonId,
}) {
  try {
    const eosService = yield select(selectEos);
    const locale = yield select(makeSelectLocale());
    const profileInfo = yield select(makeSelectProfileInfo());

    yield call(() =>
      deleteCommentValidator(
        profileInfo,
        buttonId,
        translationMessages[locale],
      ),
    );

    yield call(() =>
      deleteComment(user, questionId, answerId, commentId, eosService),
    );

    yield call(getCurrentAccountWorker);

    const questionData = yield call(() =>
      getQuestionData({ eosService, questionId, user }),
    );

    yield put(deleteCommentSuccess(questionData));
  } catch (err) {
    yield put(deleteCommentErr(err));
  }
}

export function* deleteAnswerWorker({
  user,
  questionId,
  answerId,
  postButtonId,
}) {
  try {
    let questionData = yield select(selectQuestionData());

    const locale = yield select(makeSelectLocale());
    const eosService = yield select(selectEos);
    const profileInfo = yield select(makeSelectProfileInfo());

    yield call(() =>
      deleteAnswerValidator(
        postButtonId,
        answerId,
        questionData.correct_answer_id,
        translationMessages[locale],
        profileInfo,
      ),
    );

    yield call(() => deleteAnswer(user, questionId, answerId, eosService));

    yield call(getCurrentAccountWorker);

    questionData = yield call(() =>
      getQuestionData({ eosService, questionId, user }),
    );

    yield put(deleteAnswerSuccess(questionData));
  } catch (err) {
    yield put(deleteAnswerErr(err));
  }
}

export function* deleteQuestionWorker({ user, questionid, postButtonId }) {
  try {
    const questionData = yield select(selectQuestionData());
    const locale = yield select(makeSelectLocale());
    const eosService = yield select(selectEos);
    const profileInfo = yield select(makeSelectProfileInfo());

    yield call(() =>
      deleteQuestionValidator(
        postButtonId,
        questionData.answers.length,
        translationMessages[locale],
        profileInfo,
      ),
    );

    yield call(() => deleteQuestion(user, questionid, eosService));

    yield call(getCurrentAccountWorker);

    yield put(deleteQuestionSuccess());

    yield call(() => createdHistory.push(routes.questions()));
  } catch (err) {
    yield put(deleteQuestionErr(err));
  }
}

export function* getQuestionDataWorker({ questionId }) {
  try {
    const eosService = yield select(selectEos);
    const user = yield call(eosService.getSelectedAccount);

    const questionData = yield call(() =>
      getQuestionData({ eosService, questionId, user }),
    );

    yield put(getQuestionDataSuccess(questionData));
  } catch (err) {
    yield put(getQuestionDataErr(err));
  }
}

export function* postCommentWorker({
  user,
  postButtonId,
  answerId,
  translations,
  questionId,
  comment,
  reset,
  toggleView,
}) {
  try {
    let questionData = yield select(selectQuestionData());

    const eosService = yield select(selectEos);
    const profileInfo = yield select(makeSelectProfileInfo());

    yield call(isAuthorized);

    yield call(() =>
      postCommentValidator(
        profileInfo,
        questionData,
        postButtonId,
        answerId,
        translations,
      ),
    );

    yield call(() =>
      postComment(user, questionId, answerId, comment, eosService),
    );

    yield call(getCurrentAccountWorker);

    yield call(() => toggleView(true));

    questionData = yield call(() =>
      getQuestionData({ eosService, questionId, user }),
    );

    yield call(() => reset());

    yield put(postCommentSuccess(questionData));
  } catch (err) {
    yield put(postCommentErr(err));
  }
}

export function* postAnswerWorker({
  user,
  questionId,
  answer,
  translations,
  postButtonId,
  reset,
}) {
  try {
    let questionData = yield select(selectQuestionData());

    const eosService = yield select(selectEos);
    const profileInfo = yield select(makeSelectProfileInfo());

    yield call(isAuthorized);

    yield call(() =>
      postAnswerValidator(
        profileInfo,
        questionData,
        postButtonId,
        translations,
      ),
    );

    yield call(() => postAnswer(user, questionId, answer, eosService));

    yield call(getCurrentAccountWorker);

    questionData = yield call(() =>
      getQuestionData({ eosService, questionId, user }),
    );

    yield call(() => reset());
    yield put(postAnswerSuccess(questionData));
  } catch (err) {
    yield put(postAnswerErr(err));
  }
}

export function* downVoteWorker({
  whoWasDownvoted,
  user,
  postButtonId,
  answerId,
  translations,
  questionId,
}) {
  try {
    let questionData = yield select(selectQuestionData());

    const eosService = yield select(selectEos);
    const profileInfo = yield select(makeSelectProfileInfo());

    yield call(isAuthorized);

    yield call(() =>
      downVoteValidator(
        profileInfo,
        questionData,
        postButtonId,
        answerId,
        translations,
      ),
    );

    yield call(() => downVote(user, questionId, answerId, eosService));

    yield call(getCurrentAccountWorker);

    yield put(removeUserProfile(whoWasDownvoted));

    questionData = yield call(() =>
      getQuestionData({ eosService, questionId, user }),
    );

    yield put(downVoteSuccess(questionData));
  } catch (err) {
    yield put(downVoteErr(err));
  }
}

export function* upVoteWorker({
  user,
  postButtonId,
  answerId,
  translations,
  questionId,
  whoWasUpvoted,
}) {
  try {
    let questionData = yield select(selectQuestionData());

    const eosService = yield select(selectEos);
    const profileInfo = yield select(makeSelectProfileInfo());

    yield call(isAuthorized);

    yield call(() =>
      upVoteValidator(
        profileInfo,
        questionData,
        postButtonId,
        answerId,
        translations,
      ),
    );

    yield call(() => upVote(user, questionId, answerId, eosService));

    yield call(getCurrentAccountWorker);

    yield put(removeUserProfile(whoWasUpvoted));

    questionData = yield call(() =>
      getQuestionData({ eosService, questionId, user }),
    );

    yield put(upVoteSuccess(questionData));
  } catch (err) {
    yield put(upVoteErr(err));
  }
}

export function* markAsAcceptedWorker({
  user,
  postButtonId,
  translations,
  questionId,
  correctAnswerId,
  whoWasAccepted,
}) {
  try {
    let questionData = yield select(selectQuestionData());

    const eosService = yield select(selectEos);
    const profileInfo = yield select(makeSelectProfileInfo());

    yield call(isAuthorized);

    yield call(() =>
      markAsAcceptedValidator(
        profileInfo,
        questionData,
        postButtonId,
        translations,
      ),
    );

    yield call(() =>
      markAsAccepted(user, questionId, correctAnswerId, eosService),
    );

    yield call(getCurrentAccountWorker);

    yield put(removeUserProfile(whoWasAccepted));

    questionData = yield call(() =>
      getQuestionData({ eosService, questionId, user }),
    );

    yield put(markAsAcceptedSuccess(questionData));
  } catch (err) {
    yield put(markAsAcceptedErr(err));
  }
}

export function* voteToDeleteWorker({
  questionId,
  answerId,
  commentId,
  postButtonId,
  whoWasVoted,
}) {
  try {
    let questionData = yield select(selectQuestionData());

    const eosService = yield select(selectEos);
    const locale = yield select(makeSelectLocale());
    const user = yield call(eosService.getSelectedAccount);

    const profileInfo = yield select(makeSelectProfileInfo());

    yield call(isAuthorized);

    yield call(() =>
      voteToDeleteValidator(
        profileInfo,
        questionData,
        translationMessages[locale],
        postButtonId,
        {
          questionId,
          answerId,
          commentId,
        },
      ),
    );

    yield call(() =>
      voteToDelete(user, questionId, answerId, commentId, eosService),
    );

    yield call(getCurrentAccountWorker);

    // Delete user profile from DataCacheProvider - to update them after accepting action
    yield put(removeUserProfile(whoWasVoted));

    questionData = yield call(() =>
      getQuestionData({ eosService, questionId, user }),
    );

    yield put(voteToDeleteSuccess(questionData));
  } catch (err) {
    yield put(voteToDeleteErr(err));
  }
}

export default function*() {
  yield takeLatest(GET_QUESTION_DATA, getQuestionDataWorker);
  yield takeLatest(POST_COMMENT, postCommentWorker);
  yield takeLatest(POST_ANSWER, postAnswerWorker);
  yield takeLatest(UP_VOTE, upVoteWorker);
  yield takeLatest(DOWN_VOTE, downVoteWorker);
  yield takeLatest(MARK_AS_ACCEPTED, markAsAcceptedWorker);
  yield takeLatest(DELETE_QUESTION, deleteQuestionWorker);
  yield takeLatest(DELETE_ANSWER, deleteAnswerWorker);
  yield takeLatest(DELETE_COMMENT, deleteCommentWorker);
  yield takeLatest(SAVE_COMMENT, saveCommentWorker);
  yield takeLatest(VOTE_TO_DELETE, voteToDeleteWorker);
}
