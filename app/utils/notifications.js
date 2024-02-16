import { BORDER_PRIMARY, BORDER_WARNING_LIGHT } from 'style-constants';
import { NOTIFICATIONS_TYPES } from 'components/Notifications/constants';
import {
  AnswerWithA,
  BestAnswer,
  ChangeType,
  Coins,
  Communities,
  DownVote,
  QuestionCircle,
  UpVote,
} from 'icons/index';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import {
  ThumbsUpGraph,
  ThumbsDownGraph,
  TheBestGraph,
  PostTypeChangedGraph,
  PostAnsweredGraph,
  AnswerCommentedGraph,
  PostMovedGraph,
} from 'components/icons';
const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

export const renderNotificationIcon = (type, isCommunityMode, communityStyles) => {
  const coinStyles = isCommunityMode
    ? communityStyles.coinsIconStyles
    : { fill: BORDER_WARNING_LIGHT };
  switch (type) {
    case NOTIFICATIONS_TYPES.questionUpVoted:
    case NOTIFICATIONS_TYPES.answerUpVoted:
      return graphCommunity ? <ThumbsUpGraph size={[24, 24]} /> : <UpVote />;
    case NOTIFICATIONS_TYPES.questionDownVoted:
    case NOTIFICATIONS_TYPES.answerDownVoted:
      return graphCommunity ? <ThumbsDownGraph size={[24, 24]} /> : <DownVote />;
    case NOTIFICATIONS_TYPES.questionUpVoteCanceled:
    case NOTIFICATIONS_TYPES.answerUpVoteCanceled:
      return graphCommunity ? (
        <ThumbsUpGraph size={[24, 24]} fill="#5F5F5F" />
      ) : (
        <UpVote fill="#5F5F5F" stroke="#5F5F5F" />
      );
    case NOTIFICATIONS_TYPES.questionDownVoteCanceled:
    case NOTIFICATIONS_TYPES.answerDownVoteCanceled:
      return graphCommunity ? (
        <ThumbsDownGraph size={[24, 24]} fill="#5F5F5F" />
      ) : (
        <DownVote fill="#5F5F5F" stroke="#5F5F5F" />
      );
    case NOTIFICATIONS_TYPES.answerMarkedTheBest:
      return graphCommunity ? (
        <TheBestGraph size={[24, 24]} fill="#4BCA81" />
      ) : (
        <BestAnswer stroke="#28A745" />
      );
    case NOTIFICATIONS_TYPES.questionAnswered:
    case NOTIFICATIONS_TYPES.questionCommented:
      return graphCommunity ? (
        <PostAnsweredGraph size={[24, 24]} stroke="#4BCA81" />
      ) : (
        <QuestionCircle />
      );
    case NOTIFICATIONS_TYPES.answerCommented:
      return graphCommunity ? (
        <AnswerCommentedGraph size={[24, 24]} fill="#576FED" />
      ) : (
        <AnswerWithA stroke="#354A89" />
      );
    case NOTIFICATIONS_TYPES.questionTipped:
    case NOTIFICATIONS_TYPES.answerTipped:
      return <Coins style={coinStyles} />;
    case NOTIFICATIONS_TYPES.postTypeChanged:
      return graphCommunity ? (
        <PostTypeChangedGraph size={[24, 24]} fill="#576FED" />
      ) : (
        <ChangeType stroke={colors.btnColor || BORDER_PRIMARY} />
      );
    case NOTIFICATIONS_TYPES.communityChanged:
      return graphCommunity ? (
        <PostMovedGraph size={[24, 24]} fill="#576FED" stroke="#576FED" />
      ) : (
        <Communities stroke={colors.btnColor || BORDER_PRIMARY} />
      );
    default:
      return null;
  }
};
