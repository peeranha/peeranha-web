import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const renderIcon = x => {
  if (x.correct_answer_id === x.answerId && x.answerId !== 0) {
    return { color: 'text-success', id: 0 };
  }

  if (
    x.correct_answer_id !== x.answerId &&
    x.questionFrom === x.account &&
    x.answerId !== 0
  ) {
    return { color: 'text-secondary', id: x.answerId };
  }

  return null;
};

const MarkAsAcceptedIcon = props => {
  const icon = renderIcon(props);
  return icon ? (
    <button id={props.id}>
      <FontAwesomeIcon
        onClick={() => props.markAsAccepted(icon.id, props.whoWasAccepted)}
        className={`chevron check ${icon.color}`}
        icon="check"
      />
    </button>
  ) : null;
};

MarkAsAcceptedIcon.propTypes = {
  markAsAccepted: PropTypes.func,
  whoWasAccepted: PropTypes.string,
  id: PropTypes.string,
};

export { renderIcon };
export default MarkAsAcceptedIcon;
