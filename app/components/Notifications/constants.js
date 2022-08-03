import answerIcon from 'images/answer.svg?external';
import questionIcon from 'images/question2.svg?external';
import bestAnswerIcon from 'images/bestAnswer.svg?external';
import downVoteIcon from 'images/redFingerDownSingleQuestion.svg?external';
import grayDownVoteIcon from 'images/grayFingerDownSingleQuestion.svg?external';
import greenUpVoteIcon from 'images/greenFingerUpSingleQuestion.svg?external';
import grayUpVoteIcon from 'images/grayFingerUpSingleQuestion.svg?external';
import coinsIcon from 'images/coins.svg?external';

import messages from './messages';

export const ROW_HEIGHT = 40;
export const VERTICAL_OFFSET = 5 * ROW_HEIGHT;
export const NOTIFICATIONS_REQUEST_LIMIT = 50;
export const MARK_AS_READ_DELAY = 1000;

export const MARK_ALL_NOTIFICATIONS_AS_READ =
  'app/Notifications/MARK_ALL_NOTIFICATIONS_AS_READ';
export const MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS =
  'app/Notifications/MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS';
export const MARK_ALL_NOTIFICATIONS_AS_READ_ERROR =
  'app/Notifications/MARK_ALL_NOTIFICATIONS_AS_READ_ERROR';

export const LOAD_MORE_UNREAD_NOTIFICATIONS =
  'app/Notifications/LOAD_MORE_UNREAD_NOTIFICATIONS';
export const LOAD_MORE_UNREAD_NOTIFICATIONS_SUCCESS =
  'app/Notifications/LOAD_MORE_UNREAD_NOTIFICATIONS_SUCCESS';
export const LOAD_MORE_UNREAD_NOTIFICATIONS_ERROR =
  'app/Notifications/LOAD_MORE_UNREAD_NOTIFICATIONS_ERROR';

export const LOAD_MORE_NOTIFICATIONS =
  'app/Notifications/LOAD_MORE_NOTIFICATIONS';
export const LOAD_MORE_NOTIFICATIONS_SUCCESS =
  'app/Notifications/LOAD_MORE_NOTIFICATIONS_SUCCESS';
export const LOAD_MORE_NOTIFICATIONS_ERROR =
  'app/Notifications/LOAD_MORE_NOTIFICATIONS_ERROR';

export const MARK_AS_READ_NOTIFICATIONS_ALL =
  'app/Notifications/MARK_AS_READ_NOTIFICATIONS_ALL';
export const MARK_AS_READ_NOTIFICATIONS_UNREAD =
  'app/Notifications/SET_READ_NOTIFICATIONS_UNREAD';

export const MARK_AS_READ_SUCCESS = 'app/Notifications/MARK_AS_READ_SUCCESS';
export const MARK_AS_READ_ERROR = 'app/Notifications/MARK_AS_READ_ERROR';

export const CLEAR_NOTIFICATIONS_DATA =
  'app/Notifications/CLEAR_NOTIFICATIONS_DATA';

export const SET_NOTIFICATIONS_INFO =
  'app/Notifications/SET_NOTIFICATIONS_INFO';

export const FILTER_READ_TIMESTAMPS =
  'app/Notifications/FILTER_UNREAD_TIMESTAMPS';

export const SET_LAST_USER = 'app/Notifications/SET_LAST_USER';

export const NOTIFICATIONS_TYPES = {
  questionUpVoted: 1,
  questionDownVoted: 2,
  questionUpVoteCanceled: 3,
  questionDownVoteCanceled: 4,
  answerUpVoted: 5,
  answerDownVoted: 6,
  answerUpVoteCanceled: 7,
  answerDownVoteCanceled: 8,
  answerMarkedTheBest: 9,
  questionAnswered: 10,
  questionCommented: 11,
  answerCommented: 12,
  questionTipped: 13,
  answerTipped: 14,
};

export const NOTIFICATIONS_DATA = {
  [NOTIFICATIONS_TYPES.questionUpVoted]: {
    keyTranslate: 'notifications.yourQuestionWasUpVoted',
    src: greenUpVoteIcon,
  },
  [NOTIFICATIONS_TYPES.questionDownVoted]: {
    keyTranslate: 'notifications.yourQuestionWasDownVoted',
    src: downVoteIcon,
  },
  [NOTIFICATIONS_TYPES.questionUpVoteCanceled]: {
    keyTranslate: 'notifications.yourQuestionUpVoteWasCanceled',
    src: grayUpVoteIcon,
  },
  [NOTIFICATIONS_TYPES.questionDownVoteCanceled]: {
    keyTranslate: 'notifications.yourQuestionDownVoteWasCanceled',
    src: grayDownVoteIcon,
  },
  [NOTIFICATIONS_TYPES.answerUpVoted]: {
    keyTranslate: 'notifications.yourAnswerWasUpVoted',
    src: greenUpVoteIcon,
  },
  [NOTIFICATIONS_TYPES.answerDownVoted]: {
    keyTranslate: 'notifications.yourAnswerWasDownVoted',
    src: downVoteIcon,
  },
  [NOTIFICATIONS_TYPES.answerUpVoteCanceled]: {
    keyTranslate: 'notifications.yourAnswerUpVoteWasCanceled',
    src: grayUpVoteIcon,
  },
  [NOTIFICATIONS_TYPES.answerDownVoteCanceled]: {
    keyTranslate: 'notifications.yourAnswerDownVoteWasCanceled',
    src: grayDownVoteIcon,
  },
  [NOTIFICATIONS_TYPES.answerMarkedTheBest]: {
    keyTranslate: 'notifications.yourAnswerWasMarkedAsTheBest',
    src: bestAnswerIcon,
  },
  [NOTIFICATIONS_TYPES.questionAnswered]: {
    keyTranslate: 'notifications.somebodyAnsweredYourQuestion',
    src: questionIcon,
  },
  [NOTIFICATIONS_TYPES.questionCommented]: {
    keyTranslate: 'notifications.somebodyLeftACommentToYourQuestion',
    src: questionIcon,
  },
  [NOTIFICATIONS_TYPES.answerCommented]: {
    keyTranslate: 'notifications.somebodyLeftACommentToYourAnswer',
    src: answerIcon,
  },
  [NOTIFICATIONS_TYPES.questionTipped]: {
    keyTranslate: 'notifications.yourQuestionWasTipped',
    src: coinsIcon,
  },
  [NOTIFICATIONS_TYPES.answerTipped]: {
    keyTranslate: 'notifications.yourAnswerWasTipped',
    src: coinsIcon,
  },
};
