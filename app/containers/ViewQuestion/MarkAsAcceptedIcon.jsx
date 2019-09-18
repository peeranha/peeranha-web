import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { BG_SUCCESS, BG_PRIMARY, BG_LIGHT, TEXT_LIGHT } from 'style-constants';

import okayIcon from 'images/okay.svg?inline';

import Span from 'components/Span';

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
      <ButtonStyled bg={BG_SUCCESS} className="px-2">
        <img className="d-inline-flex mr-2" src={okayIcon} alt="icon" />
        <Span color={TEXT_LIGHT}>
          <FormattedMessage {...messages.theBest} />
        </Span>
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
        <ButtonStyled bg={BG_PRIMARY} className="mr-2">
          <img className="d-inline-flex" src={okayIcon} alt="icon" />
        </ButtonStyled>
        <Span color={TEXT_LIGHT}>
          <FormattedMessage {...messages.theBestAnswer} />
        </Span>
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
        <ButtonStyled className="mr-2" bg={BG_LIGHT}>
          <img className="d-inline-flex" src={okayIcon} alt="icon" />
        </ButtonStyled>
        <Span color={TEXT_LIGHT}>
          <FormattedMessage {...messages.theBestAnswer} />
        </Span>
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
