import answerIcon from 'images/answer.svg?inline';
import questionIcon from 'images/question2.svg?inline';
import bestAnswerIcon from 'images/bestAnswer.svg?inline';
import downVoteIcon from 'images/redFingerDownSingleQuestion.svg?inline';
import upVoteIcon from 'images/fingerUpSingleQuestionPage.svg?inline';

import messages from './messages';

export const ROW_HEIGHT = 40;
export const VERTICAL_OFFSET = 5 * ROW_HEIGHT;

export const MARK_ALL_NOTIFICATIONS_AS_READ =
  'app/Notifications/MARK_ALL_NOTIFICATIONS_AS_READ';
export const SET_READ_NOTIFICATIONS =
  'app/Notifications/SET_READ_NOTIFICATIONS';
export const LOAD_MORE_NOTIFICATIONS =
  'app/Notifications/LOAD_MORE_NOTIFICATIONS';
export const LOAD_MORE_NOTIFICATIONS_SUCCESS =
  'app/Notifications/LOAD_MORE_NOTIFICATIONS_SUCCESS';
export const LOAD_MORE_NOTIFICATIONS_ERROR =
  'app/Notifications/LOAD_MORE_NOTIFICATIONS_ERROR';

export const NOTIFICATIONS_TYPES = {
  1: {
    ...messages.yourQuestionWasUpVoted,
    src: upVoteIcon,
  },
  2: {
    ...messages.yourQuestionWasDownVoted,
    src: downVoteIcon,
  },
  3: {
    ...messages.yourAnswerWasUpVoted,
    src: upVoteIcon,
  },
  4: {
    ...messages.yourAnswerWasDownVoted,
    src: downVoteIcon,
  },
  5: {
    ...messages.yourAnswerWasMarkedAsTheBest,
    src: bestAnswerIcon,
  },
  6: {
    ...messages.somebodyAnsweredYourQuestion,
    src: questionIcon,
  },
  7: {
    ...messages.somebodyLeftACommentToYourQuestion,
    src: questionIcon,
  },
  8: {
    ...messages.somebodyLeftACommentToYourAnswer,
    src: answerIcon,
  },
};
