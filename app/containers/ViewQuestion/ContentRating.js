import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getFormattedNum } from 'utils/numbers';
import MarkAsAcceptedIcon from './MarkAsAcceptedIcon';

import { MARK_AS_BUTTON, UP_VOTE_BUTTON, DOWN_VOTE_BUTTON } from './constants';

const ContentRating = props => (
  <div className="content-rating text-center">
    <MarkAsAcceptedIcon
      id={`${MARK_AS_BUTTON}${props.answerId}`}
      answerId={props.answerId}
      questionFrom={props.questionFrom}
      account={props.account}
      markAsAccepted={props.markAsAccepted}
      correct_answer_id={props.questionData.correct_answer_id}
    />
    <button id={`${UP_VOTE_BUTTON}${props.answerId}`}>
      <FontAwesomeIcon
        onClick={() => props.upVote(props.answerId)}
        data-voting={`chevron-up-${props.votingStatus}`}
        className="chevron chevron-up"
        icon="chevron-up"
      />
    </button>
    <span className="rating-value">{getFormattedNum(props.rating)}</span>
    <button id={`${DOWN_VOTE_BUTTON}${props.answerId}`}>
      <FontAwesomeIcon
        onClick={() => props.downVote(props.answerId)}
        data-voting={`chevron-down-${props.votingStatus}`}
        className="chevron chevron-down"
        icon="chevron-down"
      />
    </button>
  </div>
);

ContentRating.propTypes = {
  rating: PropTypes.number,
  votingStatus: PropTypes.number,
  account: PropTypes.string,
  questionFrom: PropTypes.string,
  markAsAccepted: PropTypes.func,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  questionData: PropTypes.object,
  answerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ContentRating;
