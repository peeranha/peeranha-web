import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { BG_LIGHT, BORDER_SECONDARY, BG_PRIMARY } from 'style-constants';

import crownIcon from 'images/crownIcon.svg?inline';

import Button from 'components/Button';

import MarkAsAcceptedIcon from './MarkAsAcceptedIcon';
import { MARK_AS_BUTTON } from './constants';
import messages from './messages';

/* eslint indent: 0 */
export const ButtonStyled = Button.extend`
  background: ${/* istanbul ignore next */ x => x.bg};
  font-size: 14px;
  height: 22px;
  min-width: 0;
  padding: 0 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${/* istanbul ignore next */ x =>
      x.bg === BG_LIGHT ? BORDER_SECONDARY : x.bg};
`;

export const BestAnswerMarker = /* istanbul ignore next */ ({
  answerId,
  questionFrom,
  account,
  markAsAccepted,
  correctAnswerId,
  whoWasAccepted,
  isTheLargestRating,
}) => {
  if (+answerId === 0) return null;

  return (
    <div className="d-flex mb-3">
      <MarkAsAcceptedIcon
        id={`${MARK_AS_BUTTON}${answerId}`}
        answerId={answerId}
        questionFrom={questionFrom}
        account={account}
        markAsAccepted={markAsAccepted}
        correctAnswerId={correctAnswerId}
        whoWasAccepted={whoWasAccepted}
      />

      {isTheLargestRating ? (
        <div className="ml-2">
          <ButtonStyled bg={BG_PRIMARY} className="px-2">
            <img className="d-inline-flex mr-2" src={crownIcon} alt="icon" />
            <FormattedMessage {...messages.communityChoice} />
          </ButtonStyled>
        </div>
      ) : null}
    </div>
  );
};

BestAnswerMarker.propTypes = {
  answerId: PropTypes.string,
  questionFrom: PropTypes.string,
  account: PropTypes.string,
  markAsAccepted: PropTypes.func,
  correctAnswerId: PropTypes.number,
  whoWasAccepted: PropTypes.string,
  isTheLargestRating: PropTypes.bool,
};

export default React.memo(BestAnswerMarker);
