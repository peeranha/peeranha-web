import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import okayIcon from 'images/okay.svg?inline';

import { Icon as AcceptAnswerEdit } from 'components/Input/Checkbox';
import AcceptAnswerView from 'components/Button/Contained/SuccessSmall';

import messages from './messages';

/* eslint jsx-a11y/no-static-element-interactions: 0, jsx-a11y/click-events-have-key-events: 0 */
export const MarkAsAcceptedIcon = ({
  correctAnswerId,
  answerId,
  questionFrom,
  account,
  id,
  markAsAccepted,
  markAsAcceptedLoading,
  whoWasAccepted,
}) => {
  // There is accepted answer && I am not question's author
  if (
    correctAnswerId === answerId &&
    answerId !== 0 &&
    account !== questionFrom
  ) {
    return (
      <AcceptAnswerView className="mr-2">
        <img className="d-inline-flex mr-2" src={okayIcon} alt="icon" />
        <FormattedMessage {...messages.theBest} />
      </AcceptAnswerView>
    );
  }

  // I am question's author
  if (answerId !== 0 && account === questionFrom) {
    return (
      <div
        className="d-inline-flex align-items-center mr-2"
        id={id}
        onClick={markAsAccepted}
        disabled={markAsAcceptedLoading}
        data-answerid={correctAnswerId === answerId ? 0 : answerId}
        data-whowasaccepted={whoWasAccepted}
      >
        <AcceptAnswerEdit
          className="mr-2"
          value={correctAnswerId === answerId}
        />
        <FormattedMessage {...messages.theBestAnswer} />
      </div>
    );
  }

  // There is no accepted answer && I am not question's author
  return null;
};

MarkAsAcceptedIcon.propTypes = {
  correctAnswerId: PropTypes.number,
  answerId: PropTypes.number,
  questionFrom: PropTypes.string,
  account: PropTypes.string,
  id: PropTypes.string,
  markAsAccepted: PropTypes.func,
  whoWasAccepted: PropTypes.string,
  markAsAcceptedLoading: PropTypes.bool,
};

export default React.memo(MarkAsAcceptedIcon);
