import React from 'react';
import PropTypes from 'prop-types';
import { white, gray, blue } from 'style-constants';
import { FormattedMessage } from 'react-intl';

import crownIcon from 'svg/crownIcon';

import Button from 'components/Button';
import Icon from 'components/Icon';

import MarkAsAcceptedIcon from './MarkAsAcceptedIcon';
import { MARK_AS_BUTTON } from './constants';
import messages from './messages';

export const ButtonStyled = Button.extend`
  background: ${(x) /* istanbul ignore next */ => x.bg};
  font-size: 14px;
  height: 22px;
  min-width: 0;
  padding: 0 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${(x) /* istanbul ignore next */ => (x.bg === white ? gray : x.bg)};
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
          <ButtonStyled bg={blue} className="px-2">
            <Icon className="d-inline-flex" icon={crownIcon} />
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
