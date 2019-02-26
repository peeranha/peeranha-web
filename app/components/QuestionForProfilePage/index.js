import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { darkblue, green, blue } from 'style-constants';

import { getFormattedDate } from 'utils/datetime';
import { getFollowedCommunities } from 'utils/communityManagement';
import { MONTH_3LETTERS__DAY_TIME } from 'utils/constants';

import okayIcon from 'svg/okay';
import crownIcon from 'svg/crownIcon';

import Base from 'components/Base';
import Span from 'components/Span';
import Icon from 'components/Icon';
import A from 'components/A';
import Img from 'components/Img';

import messages from 'containers/Profile/messages';

import {
  POST_TYPE_ANSWER,
  POST_TYPE_QUESTION,
} from 'containers/Profile/constants';

const BaseStyled = Base.extend`
  margin-top: 15px;
  word-break: break-all;
`;

const Badge = Span.extend`
  color: ${darkblue};
  border: 1px solid ${darkblue};
  border-radius: 3px;
  padding: 4px 10px;
  text-align: center;
  width: 56px;
  height: 24px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AcceptedQuestionBadgeStyled = Badge.extend`
  background: ${green};
  border: none;
`;

const TopCommunityBadgeStyled = Badge.extend`
  background: ${blue};
  border: none;
`;

/* eslint indent: 0 */
const AcceptedQuestionBadge = /* istanbul ignore next */ ({
  acceptedAnswer,
  postType,
  isMyAnswerAccepted,
}) =>
  (postType === POST_TYPE_QUESTION && acceptedAnswer) ||
  (postType === POST_TYPE_ANSWER && isMyAnswerAccepted) ? (
    <AcceptedQuestionBadgeStyled>
      <Icon
        className="d-flex align-items-center justify-content-center"
        icon={okayIcon}
        noMargin
      />
    </AcceptedQuestionBadgeStyled>
  ) : null;

const TopCommunityBadge = /* istanbul ignore next */ ({
  isTheLargestRating,
  postType,
}) =>
  isTheLargestRating && postType === POST_TYPE_ANSWER ? (
    <TopCommunityBadgeStyled>
      <Icon
        className="d-flex align-items-center justify-content-center"
        icon={crownIcon}
        noMargin
      />
    </TopCommunityBadgeStyled>
  ) : null;

const QuestionCommunity = /* istanbul ignore next */ ({
  communities,
  communityId,
}) => {
  if (!communities[0]) {
    return null;
  }

  const com = getFollowedCommunities(communities, [communityId])[0];

  return (
    <Span className="d-flex align-items-center" fontSize="14">
      <Img className="mr-1" src={com.avatar} alt="comm_avatar" />
      <span>{com.name}</span>
    </Span>
  );
};

/* eslint camelcase: 0 */
export const QuestionForProfilePage = /* istanbul ignore next */ ({
  myPostRating,
  title,
  myPostTime,
  locale,
  acceptedAnswer,
  communities,
  community_id,
  postType,
  isMyAnswerAccepted,
  isTheLargestRating,
  route,
}) => (
  <BaseStyled className="d-flex flex-grow-1" position="left">
    <div className="d-flex flex-column mr-4">
      <Badge bold>{myPostRating}</Badge>

      <AcceptedQuestionBadge
        acceptedAnswer={acceptedAnswer}
        postType={postType}
        isMyAnswerAccepted={isMyAnswerAccepted}
      />

      <TopCommunityBadge
        postType={postType}
        isTheLargestRating={isTheLargestRating}
      />
    </div>

    <div className="d-flex flex-column flex-grow-1">
      <p>
        <A to={route} href={route}>
          <Span fontSize="24" bold>
            {title}
          </Span>
        </A>
      </p>
      <p className="d-flex align-items-center my-1">
        <Span className="text-capitalize mr-3" fontSize="14" color="gray">
          <FormattedMessage {...messages.asked} />
          <span className="pl-1">
            {getFormattedDate(myPostTime, locale, MONTH_3LETTERS__DAY_TIME)}
          </span>
        </Span>
        <QuestionCommunity
          communities={communities}
          communityId={community_id}
        />
      </p>
    </div>
  </BaseStyled>
);

AcceptedQuestionBadge.propTypes = {
  acceptedAnswer: PropTypes.bool,
  postType: PropTypes.string,
  isMyAnswerAccepted: PropTypes.bool,
};

TopCommunityBadge.propTypes = {
  isTheLargestRating: PropTypes.bool,
  postType: PropTypes.string,
};

QuestionCommunity.propTypes = {
  communities: PropTypes.array,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

QuestionForProfilePage.propTypes = {
  myPostRating: PropTypes.number,
  title: PropTypes.string,
  myPostTime: PropTypes.number,
  locale: PropTypes.string,
  acceptedAnswer: PropTypes.bool,
  communities: PropTypes.array,
  id: PropTypes.string,
  community_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  postType: PropTypes.string,
  isMyAnswerAccepted: PropTypes.bool,
  isTheLargestRating: PropTypes.bool,
  route: PropTypes.string,
};

export default React.memo(QuestionForProfilePage);
