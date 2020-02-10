import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { BG_PRIMARY } from 'style-constants';
import { formatStringToHtmlId } from 'utils/animation';

import crownIcon from 'images/crownIcon.svg?inline';
import Button from 'components/Button/Contained/PrimaryMedium';

import MarkAsAcceptedIcon, { LabelStyles } from './MarkAsAcceptedIcon';
import { MARK_AS_BUTTON } from './constants';
import messages from './messages';

const Label = Button.extend`
  ${LabelStyles};
`;

export const BestAnswerMarker = ({
  answerId,
  questionFrom,
  account,
  markAsAccepted,
  correctAnswerId,
  whoWasAccepted,
  isTheLargestRating,
  ids,
  isGeneral,
}) => {
  if (answerId === 0) return null;

  return (
    <div className="d-flex">
      <MarkAsAcceptedIcon
        className="mb-3 mr-3"
        id={formatStringToHtmlId(`${MARK_AS_BUTTON}${answerId}`)}
        answerId={answerId}
        questionFrom={questionFrom}
        account={account}
        markAsAccepted={markAsAccepted}
        disabled={ids.includes(
          formatStringToHtmlId(`${MARK_AS_BUTTON}${answerId}`),
        )}
        correctAnswerId={correctAnswerId}
        whoWasAccepted={whoWasAccepted}
        isGeneral={isGeneral}
      />

      {isTheLargestRating ? (
        <Label className="mb-3" bg={BG_PRIMARY}>
          <img className="d-inline-flex mr-2" src={crownIcon} alt="icon" />
          <FormattedMessage {...messages.communityChoice} />
        </Label>
      ) : null}
    </div>
  );
};

BestAnswerMarker.propTypes = {
  answerId: PropTypes.number,
  questionFrom: PropTypes.string,
  account: PropTypes.string,
  markAsAccepted: PropTypes.func,
  correctAnswerId: PropTypes.number,
  whoWasAccepted: PropTypes.string,
  isTheLargestRating: PropTypes.bool,
  markAsAcceptedLoading: PropTypes.bool,
  ids: PropTypes.array,
  isGeneral: PropTypes.bool,
};

export default React.memo(BestAnswerMarker);
