import LikeIcon from 'icons/Like';
import DisLikeIcon from 'icons/DisLike';
import AnswerWithAIcon from 'icons/AnswerWithA';
import FaqIcon from 'icons/Faq';
import TipIcon from 'icons/Tip';

import messages from './messages';
import { PEER_PRIMARY_COLOR } from '../../style-constants';

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
    ...messages.yourQuestionWasUpVoted,
    icon: <LikeIcon fill="#28A745" stroke="#28A745" />,
  },
  [NOTIFICATIONS_TYPES.questionDownVoted]: {
    ...messages.yourQuestionWasDownVoted,
    icon: <DisLikeIcon fill="#F76F60" stroke="#F76F60" />,
  },
  [NOTIFICATIONS_TYPES.questionUpVoteCanceled]: {
    ...messages.yourQuestionUpVoteWasCanceled,
    icon: <LikeIcon fill="#5F5F5F" stroke="#5F5F5F" />,
  },
  [NOTIFICATIONS_TYPES.questionDownVoteCanceled]: {
    ...messages.yourQuestionDownVoteWasCanceled,
    icon: <DisLikeIcon fill="#5F5F5F" stroke="#5F5F5F" />,
  },
  [NOTIFICATIONS_TYPES.answerUpVoted]: {
    ...messages.yourAnswerWasUpVoted,
    icon: <LikeIcon fill="#28A745" stroke="#28A745" />,
  },
  [NOTIFICATIONS_TYPES.answerDownVoted]: {
    ...messages.yourAnswerWasDownVoted,
    icon: <DisLikeIcon fill="#F76F60" stroke="#F76F60" />,
  },
  [NOTIFICATIONS_TYPES.answerUpVoteCanceled]: {
    ...messages.yourAnswerUpVoteWasCanceled,
    icon: <LikeIcon fill="#5F5F5F" stroke="#5F5F5F" />,
  },
  [NOTIFICATIONS_TYPES.answerDownVoteCanceled]: {
    ...messages.yourAnswerDownVoteWasCanceled,
    icon: <DisLikeIcon fill="#5F5F5F" stroke="#5F5F5F" />,
  },
  [NOTIFICATIONS_TYPES.answerMarkedTheBest]: {
    ...messages.yourAnswerWasMarkedAsTheBest,
    icon: <AnswerWithAIcon stroke="#28A745" />,
  },
  [NOTIFICATIONS_TYPES.questionAnswered]: {
    ...messages.somebodyAnsweredYourQuestion,
    icon: <FaqIcon stroke="#354A89" size={[18, 18]} />,
  },
  [NOTIFICATIONS_TYPES.questionCommented]: {
    ...messages.somebodyLeftACommentToYourQuestion,
    icon: <FaqIcon stroke="#354A89" size={[18, 18]} />,
  },
  [NOTIFICATIONS_TYPES.answerCommented]: {
    ...messages.somebodyLeftACommentToYourAnswer,
    icon: <AnswerWithAIcon stroke="#354A89" />,
  },
  [NOTIFICATIONS_TYPES.questionTipped]: {
    ...messages.yourQuestionWasTipped,
    icon: <TipIcon fill="#FEF1F1" stroke={PEER_PRIMARY_COLOR} />,
  },
  [NOTIFICATIONS_TYPES.answerTipped]: {
    ...messages.yourAnswerWasTipped,
    icon: <TipIcon fill="#FEF1F1" stroke={PEER_PRIMARY_COLOR} />,
  },
};
