import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getFormattedNum } from 'utils/numbers';
import MarkAsAcceptedIcon from './MarkAsAcceptedIcon';

const ContentRating = props => (
  <div className="content-rating text-center">
    <MarkAsAcceptedIcon
      answerId={props.answerId}
      questionFrom={props.questionFrom}
      account={props.account}
      markAsAccepted={props.markAsAccepted}
      correct_answer_id={props.questionData.correct_answer_id}
    />
    <FontAwesomeIcon
      onClick={() => props.upVote(props.answerId)}
      data-voting={`chevron-up-${props.votingStatus}`}
      className="chevron"
      icon="chevron-up"
    />
    <span className="rating-value">{getFormattedNum(props.rating)}</span>
    <FontAwesomeIcon
      onClick={() => props.downVote(props.answerId)}
      data-voting={`chevron-down-${props.votingStatus}`}
      className="chevron"
      icon="chevron-down"
    />
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
