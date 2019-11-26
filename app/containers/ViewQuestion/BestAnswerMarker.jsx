import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { BG_PRIMARY } from 'style-constants';

import crownIcon from 'images/crownIcon.svg?inline';
import CommunityChoiceButton from 'components/Button/Contained/PrimarySmall';

import MarkAsAcceptedIcon from './MarkAsAcceptedIcon';
import { MARK_AS_BUTTON } from './constants';
import messages from './messages';

export const BestAnswerMarker = ({
  answerId,
  questionFrom,
  account,
  markAsAccepted,
  markAsAcceptedLoading,
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
        markAsAcceptedLoading={markAsAcceptedLoading}
        correctAnswerId={correctAnswerId}
        whoWasAccepted={whoWasAccepted}
      />

      {isTheLargestRating ? (
        <CommunityChoiceButton bg={BG_PRIMARY}>
          <img className="d-inline-flex mr-2" src={crownIcon} alt="icon" />
          <FormattedMessage {...messages.communityChoice} />
        </CommunityChoiceButton>
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
  markAsAcceptedLoading: PropTypes.bool,
};

export default React.memo(BestAnswerMarker);
