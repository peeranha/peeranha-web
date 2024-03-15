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
  PostUpvotedGraph,
  PostDownvotedGraph,
  AnswerUpvotedGraph,
  AnswerDownvotedGraph,
  TheBestGraph,
  PostTypeChangedGraph,
  PostAnsweredGraph,
  PostCommentedGraph,
  AnswerCommentedGraph,
  PostMovedGraph,
  UpvoteCanceledGraph,
  DownvoteCanceledGraph,
} from 'components/icons';
const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

export const renderNotificationIcon = (type, isCommunityMode, communityStyles) => {
  const coinStyles = isCommunityMode
    ? communityStyles.coinsIconStyles
    : { fill: BORDER_WARNING_LIGHT };
  switch (type) {
    case NOTIFICATIONS_TYPES.questionUpVoted:
      return graphCommunity ? (
        <PostUpvotedGraph size={[24, 24]} stroke="#4BCA81" fill="#4BCA81" css={{ fill: 'none' }} />
      ) : (
        <UpVote />
      );
    case NOTIFICATIONS_TYPES.answerUpVoted:
      return graphCommunity ? (
        <AnswerUpvotedGraph
          size={[24, 24]}
          stroke="#4BCA81"
          fill="#4BCA81"
          css={{ fill: 'none' }}
        />
      ) : (
        <UpVote />
      );
    case NOTIFICATIONS_TYPES.questionDownVoted:
      return graphCommunity ? (
        <PostDownvotedGraph
          size={[24, 24]}
          stroke="#ED4A6D"
          fill="#ED4A6D"
          css={{ fill: 'none' }}
        />
      ) : (
        <DownVote />
      );
    case NOTIFICATIONS_TYPES.answerDownVoted:
      return graphCommunity ? (
        <AnswerDownvotedGraph
          size={[24, 24]}
          stroke="#ED4A6D"
          fill="#ED4A6D"
          css={{ fill: 'none' }}
        />
      ) : (
        <DownVote />
      );
    case NOTIFICATIONS_TYPES.questionUpVoteCanceled:
    case NOTIFICATIONS_TYPES.answerUpVoteCanceled:
      return graphCommunity ? (
        <UpvoteCanceledGraph size={[24, 24]} stroke="#ED4A6D" />
      ) : (
        <UpVote fill="#5F5F5F" stroke="#5F5F5F" />
      );
    case NOTIFICATIONS_TYPES.questionDownVoteCanceled:
    case NOTIFICATIONS_TYPES.answerDownVoteCanceled:
      return graphCommunity ? (
        <DownvoteCanceledGraph size={[24, 24]} stroke="#ED4A6D" />
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
      return graphCommunity ? (
        <PostAnsweredGraph size={[24, 24]} stroke="#4BCA81" css={{ fill: 'none' }} />
      ) : (
        <QuestionCircle />
      );
    case NOTIFICATIONS_TYPES.questionCommented:
      return graphCommunity ? (
        <PostCommentedGraph size={[24, 24]} stroke="#576FED" css={{ fill: 'none' }} />
      ) : (
        <QuestionCircle />
      );
    case NOTIFICATIONS_TYPES.answerCommented:
      return graphCommunity ? (
        <AnswerCommentedGraph size={[24, 24]} stroke="#576FED" css={{ fill: 'none' }} />
      ) : (
        <AnswerWithA stroke="#354A89" />
      );
    case NOTIFICATIONS_TYPES.questionTipped:
    case NOTIFICATIONS_TYPES.answerTipped:
      return <Coins style={coinStyles} />;
    case NOTIFICATIONS_TYPES.postTypeChanged:
      return graphCommunity ? (
        <PostTypeChangedGraph
          size={[24, 24]}
          fill="#576FED"
          stroke="#576FED"
          css={{ fill: 'none' }}
        />
      ) : (
        <ChangeType stroke={colors.btnColor || BORDER_PRIMARY} />
      );
    case NOTIFICATIONS_TYPES.communityChanged:
      return graphCommunity ? (
        <PostMovedGraph size={[24, 24]} fill="#576FED" stroke="#576FED" css={{ fill: 'none' }} />
      ) : (
        <Communities stroke={colors.btnColor || BORDER_PRIMARY} />
      );
    default:
      return null;
  }
};
