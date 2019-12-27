import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import okayIcon from 'images/okay.svg?inline';

import Checkbox from 'components/Input/Checkbox';
import AcceptAnswerView from 'components/Button/Contained/SuccessSmall';

import messages from './messages';

export const MarkAsAcceptedIcon = ({
  correctAnswerId,
  answerId,
  questionFrom,
  account,
  id,
  markAsAccepted,
  disabled,
  whoWasAccepted,
  className,
}) => {
  // There is accepted answer && I am not question's author
  if (
    correctAnswerId === answerId &&
    answerId !== 0 &&
    account !== questionFrom
  ) {
    return (
      <AcceptAnswerView className={`mr-2 ${className}`}>
        <img className="d-inline-flex mr-2" src={okayIcon} alt="icon" />
        <FormattedMessage {...messages.theBest} />
      </AcceptAnswerView>
    );
  }

  // I am question's author
  if (answerId !== 0 && account === questionFrom) {
    return (
      <div className={className}>
        <Checkbox
          input={{
            name: id,
            value: correctAnswerId === answerId,
            onChange: markAsAccepted,
            'data-answerid': correctAnswerId === answerId ? 0 : answerId,
            'data-whowasaccepted': whoWasAccepted,
          }}
          label={<FormattedMessage {...messages.theBestAnswer} />}
          disabled={disabled}
          meta={{}}
        />
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
  className: PropTypes.string,
  markAsAcceptedLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default React.memo(MarkAsAcceptedIcon);
