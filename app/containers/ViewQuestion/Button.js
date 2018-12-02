import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ buttonId, buttonClick, buttonName, buttonParams, show }) =>
  show ? (
    <button
      id={buttonId}
      data-questionid={buttonParams.questionId}
      data-answerid={buttonParams.answerId}
      data-commentid={buttonParams.commentId}
      onClick={buttonClick}
    >
      {buttonName}
    </button>
  ) : null;

Button.propTypes = {
  show: PropTypes.bool,
  buttonParams: PropTypes.object,
  buttonId: PropTypes.string,
  buttonName: PropTypes.string,
  buttonClick: PropTypes.func,
};

export default Button;
