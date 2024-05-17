/* eslint no-param-reassign: 0, array-callback-return: 0 */

import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';
import { selectUsers } from 'containers/DataCacheProvider/selectors';

import { selectEthereum } from 'containers/EthereumProvider/selectors';

import { call, put, takeLatest, select } from 'redux-saga/effects';
import maxBy from 'lodash/maxBy';
import { banUser } from 'utils/accountManagement';

import { getAnsweredUsersPosts } from 'utils/questionsManagement';

import { GET_QUESTIONS } from 'containers/QuestionsOfUser/constants';
import { REDIRECT_TO_FEED } from 'containers/App/constants';
import { redirectToFeedWorker } from 'containers/App/saga';
import { getQuestionsSuccess, getQuestionsErr, banUserSuccess } from './actions';

import { selectQuestionsWithUserAnswers, selectNumber } from './selectors';
import { BAN_USER, GET_QUESTIONS as GET_ANSWERED_QUESTIONS } from './constants';
import { getQuestionsWorker } from '../QuestionsOfUser/saga';
import { POST_TYPE_ANSWER } from '../Profile/constants';
import { isGeneralQuestion } from '../ViewQuestion/saga';
import { TOP_COMMUNITY_DISPLAY_MIN_RATING } from '../Questions/constants';

export function* getQuestionsWithAnswersWorker({ userId }) {
  try {
    const questionsFromStore = yield select(selectQuestionsWithUserAnswers());

    const limit = yield select(selectNumber());
    const offset = questionsFromStore?.length || 0;

    const questions = yield call(getAnsweredUsersPosts, userId, limit, offset);
    questions?.map((post) => {
      post.elementType = POST_TYPE_ANSWER;
      post.acceptedAnswer = post.bestReply > 0;
      post.isGeneral = isGeneralQuestion(post);
      post.replies = post.replies.filter(
        (reply) => reply.author.id.toUpperCase() === userId.toUpperCase(),
      );
      const mostRatingAnswer = maxBy(post.replies, 'rating');

      post.replies.map((reply) => {
        post.myPostTime = reply.postTime;
        post.isMyAnswerAccepted = reply.isBestReply;

        post.isTheLargestRating =
          reply.rating === mostRatingAnswer.rating &&
          reply.rating > TOP_COMMUNITY_DISPLAY_MIN_RATING;

        post.myPostRating = reply.rating;
        post.answerId = reply.id;
      });
    });

    yield put(getQuestionsSuccess(questions));
  } catch (err) {
    yield put(getQuestionsErr(err));
  }
}

export function* banUserWorker({ buttonId, user, communityId }) {
  try {
    const ethereumService = yield select(selectEthereum);

    const account = yield select(makeSelectAccount());
    yield call(banUser, account, user, communityId, ethereumService);

    const fullProfileInfo = yield select(selectUsers(user));

    const updatedProfileInfo = {
      ...fullProfileInfo,
      communityBans: fullProfileInfo.communityBans
        ? [...fullProfileInfo.communityBans, communityId]
        : [communityId],
    };

    yield put(getUserProfileSuccess(updatedProfileInfo));

    yield put(banUserSuccess);
  } catch (err) {}
}

export default function* () {
  yield takeLatest(GET_ANSWERED_QUESTIONS, getQuestionsWithAnswersWorker);
  yield takeLatest(GET_QUESTIONS, getQuestionsWorker);
  yield takeLatest(REDIRECT_TO_FEED, redirectToFeedWorker);
  yield takeLatest(BAN_USER, banUserWorker);
}
