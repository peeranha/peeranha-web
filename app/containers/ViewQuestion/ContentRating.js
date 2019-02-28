import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getFormattedNum } from 'utils/numbers';
import MarkAsAcceptedIcon from './MarkAsAcceptedIcon';

import { MARK_AS_BUTTON, UP_VOTE_BUTTON, DOWN_VOTE_BUTTON } from './constants';

const ContentRating = ({
  answerId,
  questionFrom,
  account,
  markAsAccepted,
  questionData,
  upVote,
  votingStatus,
  rating,
  downVote,
  userInfo,
}) => (
  <div className="content-rating text-center">
    <MarkAsAcceptedIcon
      id={`${MARK_AS_BUTTON}${answerId}`}
      answerId={answerId}
      questionFrom={questionFrom}
      account={account}
      markAsAccepted={markAsAccepted}
      correct_answer_id={questionData.correct_answer_id}
      whoWasAccepted={userInfo.user}
    />
    <button id={`${UP_VOTE_BUTTON}${answerId}`}>
      <FontAwesomeIcon
        onClick={() => upVote(answerId, userInfo.user)}
        data-voting={`chevron-hl-${votingStatus.isUpVoted}`}
        className="chevron chevron-up"
        icon="chevron-up"
      />
    </button>
    <span className="rating-value">{getFormattedNum(rating)}</span>
    <button id={`${DOWN_VOTE_BUTTON}${answerId}`}>
      <FontAwesomeIcon
        onClick={() => downVote(answerId, userInfo.user)}
        data-voting={`chevron-hl-${votingStatus.isDownVoted}`}
        className="chevron chevron-down"
        icon="chevron-down"
      />
    </button>
  </div>
);

ContentRating.propTypes = {
  rating: PropTypes.number,
  votingStatus: PropTypes.object,
  userInfo: PropTypes.object,
  account: PropTypes.string,
  questionFrom: PropTypes.string,
  markAsAccepted: PropTypes.func,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  questionData: PropTypes.object,
  answerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ContentRating;
