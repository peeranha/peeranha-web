import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { BG_PRIMARY } from 'style-constants';
import { formatStringToHtmlId } from 'utils/animation';
import { singleCommunityStyles } from 'utils/communityManagement';

import commonMessages from 'common-messages';

import coinsIcon from 'images/coins.svg?inline';
import crownIcon from 'images/crownIcon.svg?inline';
import Button from 'components/Button/Contained/PrimaryMedium';

import MarkAsAcceptedIcon, { LabelStyles } from './MarkAsAcceptedIcon';
import { B } from './QuestionTitle';
import { MARK_AS_BUTTON } from './constants';
import messages from './messages';
import SendTips from '../SendTips';

const styles = singleCommunityStyles();

const Label = Button.extend`
  ${LabelStyles};
  pointer-events: ${x => (x.inactive ? 'none' : 'auto')};
  overflow: hidden;
  height: 1%;
  min-height: 32px;
  max-width: 167px;
`;

const Div = styled.div`
  max-width: 600px;
  display: flex;
  flex-flow: row wrap;

  > button:not(:last-child) {
    margin-right: 16px;
  }

  > button {
    margin-bottom: 10px;
  }
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
  isItWrittenByMe,
}) => {
  if (answerId === 0) return null;
  const displayTips = !isItWrittenByMe && answerId !== 0;
  return (
    <Div>
      <Base>
        {displayTips && (
          <SendTips form="tip-answer" account={whoWasAccepted}>
            <B>
              <img
                className="mr-1"
                src={styles.coinsIcon ? styles.coinsIcon : coinsIcon}
                alt="icon"
              />
              <FormattedMessage {...commonMessages.tipAnswer} />
            </B>
          </SendTips>
        )}
        <MarkAsAcceptedIcon
          className=""
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
        />
      </Base>
      {isTheLargestRating ? (
        <Label bg={BG_PRIMARY} inactive>
          <img className="d-inline-flex mr-2" src={crownIcon} alt="icon" />
          <FormattedMessage {...messages.communityChoice} />
        </Label>
      ) : null}
    </Div>
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
  isItWrittenByMe: PropTypes.bool,
};

export default React.memo(BestAnswerMarker);
