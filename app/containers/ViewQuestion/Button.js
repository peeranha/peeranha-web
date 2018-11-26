import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  buttonId,
  buttonClick,
  buttonName,
  buttonParams,
  isItWrittenByMe,
}) =>
  isItWrittenByMe ? (
    <button
      id={buttonId}
      data-link={buttonParams.ipfsLink}
      data-user={buttonParams.user}
      data-questionid={buttonParams.questionId}
      data-answerid={buttonParams.answerId}
      data-commentid={buttonParams.commentId}
      onClick={buttonClick}
    >
      {buttonName}
    </button>
  ) : null;

Button.propTypes = {
  isItWrittenByMe: PropTypes.bool,
  buttonParams: PropTypes.object,
  buttonId: PropTypes.string,
  buttonName: PropTypes.string,
  buttonClick: PropTypes.func,
};

export default Button;
