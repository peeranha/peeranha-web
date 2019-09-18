import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  TEXT_PRIMARY_DARK,
  BORDER_PRIMARY_DARK,
  BG_PRIMARY,
  BG_SUCCESS,
  TEXT_SECONDARY,
} from 'style-constants';

import { getFormattedDate } from 'utils/datetime';
import { MONTH_3LETTERS__DAY_TIME } from 'utils/constants';

import okayIcon from 'images/okay.svg?inline';
import crownIcon from 'images/crownIcon.svg?inline';

import Base from 'components/Base';
import Span from 'components/Span';
import A from 'components/A';

import messages from 'common-messages';

import {
  POST_TYPE_ANSWER,
  POST_TYPE_QUESTION,
} from 'containers/Profile/constants';

import QuestionCommunity from './QuestionCommunity';

const BaseStyled = Base.extend`
  margin-top: 15px;
  word-break: break-all;
`;

const Badge = Span.extend`
  color: ${TEXT_PRIMARY_DARK};
  border: 1px solid ${BORDER_PRIMARY_DARK};
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
  background: ${BG_SUCCESS};
  border: none;
`;

const TopCommunityBadgeStyled = Badge.extend`
  background: ${BG_PRIMARY};
  border: none;
`;

/* eslint indent: 0 */
const AcceptedQuestionBadge = ({
  acceptedAnswer,
  postType,
  isMyAnswerAccepted,
}) =>
  (postType === POST_TYPE_QUESTION && acceptedAnswer) ||
  (postType === POST_TYPE_ANSWER && isMyAnswerAccepted) ? (
    <AcceptedQuestionBadgeStyled>
      <img
        className="d-flex align-items-center justify-content-center"
        src={okayIcon}
        alt="icon"
      />
    </AcceptedQuestionBadgeStyled>
  ) : null;

const TopCommunityBadge = ({ isTheLargestRating, postType }) =>
  isTheLargestRating && postType === POST_TYPE_ANSWER ? (
    <TopCommunityBadgeStyled>
      <img
        className="d-flex align-items-center justify-content-center"
        src={crownIcon}
        alt="icon"
      />
    </TopCommunityBadgeStyled>
  ) : null;

/* eslint camelcase: 0 */
export const QuestionForProfilePage = ({
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
    <div className="d-none d-sm-flex flex-column mr-4">
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
          <Span fontSize="24" mobileFS="18" bold>
            {title}
          </Span>
        </A>
      </p>
      <p className="d-flex align-items-center my-1">
        <Span
          className="text-capitalize mr-3"
          fontSize="14"
          color={TEXT_SECONDARY}
        >
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
