import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { BG_PRIMARY } from 'style-constants';
import { formatStringToHtmlId } from 'utils/animation';

import commonMessages from 'common-messages';

import coinsIcon from 'images/coins.svg?inline';
import crownIcon from 'images/crownIcon.svg?inline';
import Button from 'components/Button/Contained/PrimaryMedium';

import MarkAsAcceptedIcon, { LabelStyles } from './MarkAsAcceptedIcon';
import { B } from './QuestionTitle';
import { MARK_AS_BUTTON } from './constants';
import messages from './messages';
import SendTips from '../SendTips';

const Label = Button.extend`
  ${LabelStyles};
  pointer-events: ${x => (x.inactive ? 'none' : 'auto')};
  overflow: hidden;
  height: 1%;
  min-height: 32px;
  min-width: 167px;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: ${({ isShorter }) =>
  isShorter ? 400 : 455}px) {
    display: flex;
    flex-direction: column;

    > div {
      margin-bottom: 10px;
    }

    > button {
      width: 165px;
    }
  }

  @media only screen and (max-width: 276px) {
    justify-content: center;
  }
`;

const Base = styled.div`
  display: flex;
  width: 241px;
  height: 32px;
  justify-content: space-between;

  @media only screen and (max-width: 276px) {
    overflow: hidden;
    height: 1%;
    justify-content: center;
    flex-direction: column;
    > button:nth-child(1) {
      margin-bottom: 10px;
      width: 130px;
    }

    > button:nth-child(2) {
      margin-bottom: 0;
      width: 98px;
    }
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
    <Div isShorter={answerId !== correctAnswerId}>
      <Base>
        {displayTips && (
          <SendTips form="tip-answer" account={whoWasAccepted}>
            <B>
              <img className="mr-1" src={coinsIcon} alt="icon" />
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
      {true ? (
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
