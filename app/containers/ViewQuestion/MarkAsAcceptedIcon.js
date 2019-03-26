import React from 'react';
import PropTypes from 'prop-types';
import { green, blue, white } from 'style-constants';
import { FormattedMessage } from 'react-intl';

import okayIcon from 'svg/okay';
import Icon from 'components/Icon';

import messages from './messages';
import { ButtonStyled } from './BestAnswerMarker';

/* eslint jsx-a11y/no-static-element-interactions: 0, jsx-a11y/click-events-have-key-events: 0 */
export const MarkAsAcceptedIcon = ({
  correctAnswerId,
  answerId,
  questionFrom,
  account,
  id,
  markAsAccepted,
  whoWasAccepted,
}) => {
  // There is accepted answer && I am not question's author
  if (
    correctAnswerId === answerId &&
    answerId !== 0 &&
    account !== questionFrom
  ) {
    return (
      <ButtonStyled bg={green} className="px-2">
        <Icon className="d-inline-flex" icon={okayIcon} />
        <FormattedMessage {...messages.theBest} />
      </ButtonStyled>
    );
  }

  // There is accepted answer && I am question's author
  if (
    correctAnswerId === answerId &&
    answerId !== 0 &&
    account === questionFrom
  ) {
    return (
      <div
        className="d-inline-flex align-items-center"
        id={id}
        onClick={markAsAccepted}
        data-answerid={0}
        data-whowasaccepted={whoWasAccepted}
      >
        <ButtonStyled bg={blue} className="mr-2">
          <Icon className="d-inline-flex" icon={okayIcon} noMargin />
        </ButtonStyled>
        <FormattedMessage {...messages.theBestAnswer} />
      </div>
    );
  }

  // There is no accepted answer && I am question's author
  if (
    correctAnswerId !== answerId &&
    questionFrom === account &&
    answerId !== 0
  ) {
    return (
      <div
        className="d-inline-flex align-items-center"
        id={id}
        onClick={markAsAccepted}
        data-answerid={answerId}
        data-whowasaccepted={whoWasAccepted}
      >
        <ButtonStyled className="mr-2" bg={white}>
          <Icon className="d-inline-flex" icon={okayIcon} noMargin />
        </ButtonStyled>
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
};

export default React.memo(MarkAsAcceptedIcon);
