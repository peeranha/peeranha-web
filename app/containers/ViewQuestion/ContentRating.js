import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getFormattedNum } from 'utils/numbers';
import MarkAsAcceptedIcon from './MarkAsAcceptedIcon';

/* eslint consistent-return: "error" */
const isRatingChanged = (history, account, flag) => {
  const filtered = history.filter(x => x.user === account);

  if (filtered[0] && filtered[0].flag === flag) {
    return 'text-primary';
  }

  return '';
};

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
      className={`chevron ${isRatingChanged(props.history, props.account, 1)}`}
      icon="chevron-up"
    />
    <span className="rating-value">{getFormattedNum(props.rating)}</span>
    <FontAwesomeIcon
      onClick={() => props.downVote(props.answerId)}
      className={`chevron ${isRatingChanged(props.history, props.account, 2)}`}
      icon="chevron-down"
    />
  </div>
);

ContentRating.propTypes = {
  answerId: PropTypes.number,
  rating: PropTypes.number,
  history: PropTypes.array,
  account: PropTypes.string,
  questionFrom: PropTypes.string,
  markAsAccepted: PropTypes.func,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  questionData: PropTypes.object,
};

export default ContentRating;
