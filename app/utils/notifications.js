import { BORDER_WARNING_LIGHT } from 'style-constants';
import { NOTIFICATIONS_TYPES } from 'components/Notifications/constants';
import { AnswerWithA, BestAnswer, Coins, DownVote, QuestionCircle, UpVote } from 'icons/index';

export const renderNotificationIcon = (type, isCommunityMode, communityStyles) => {
  const coinStyles = isCommunityMode
    ? communityStyles.coinsIconStyles
    : { fill: BORDER_WARNING_LIGHT };
  switch (type) {
    case NOTIFICATIONS_TYPES.questionUpVoted:
    case NOTIFICATIONS_TYPES.answerUpVoted:
      return <UpVote />;
    case NOTIFICATIONS_TYPES.questionDownVoted:
    case NOTIFICATIONS_TYPES.answerDownVoted:
      return <DownVote />;
    case NOTIFICATIONS_TYPES.questionUpVoteCanceled:
    case NOTIFICATIONS_TYPES.answerUpVoteCanceled:
      return <UpVote fill="#5F5F5F" stroke="#5F5F5F" />;
    case NOTIFICATIONS_TYPES.questionDownVoteCanceled:
    case NOTIFICATIONS_TYPES.answerDownVoteCanceled:
      return <DownVote fill="#5F5F5F" stroke="#5F5F5F" />;
    case NOTIFICATIONS_TYPES.answerMarkedTheBest:
      return <BestAnswer stroke="#28A745" />;
    case NOTIFICATIONS_TYPES.questionAnswered:
    case NOTIFICATIONS_TYPES.questionCommented:
      return <QuestionCircle />;
    case NOTIFICATIONS_TYPES.answerCommented:
      return <AnswerWithA stroke="#354A89" />;
    case NOTIFICATIONS_TYPES.questionTipped:
    case NOTIFICATIONS_TYPES.answerTipped:
      return <Coins style={coinStyles} />;
    default:
      return null;
  }
};
