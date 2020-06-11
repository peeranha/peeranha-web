import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { BG_PRIMARY } from 'style-constants';
import { formatStringToHtmlId } from 'utils/animation';
import { singleCommunityStyles } from 'utils/communityManagement';

import commonMessages from 'common-messages';

import coinsIcon from 'images/coins.svg?external';
import crownIcon from 'images/crownIcon.svg?inline';
import officialIcon from 'images/officialWhite.svg?inline';

import Button from 'components/Button/Contained/PrimaryMedium';
import MarkAsAcceptedIcon, { LabelStyles } from './MarkAsAcceptedIcon';
import { B } from './QuestionTitle';
import SendTips from '../SendTips';
import { IconMd } from 'components/Icon/IconWithSizes';

import { MARK_AS_BUTTON } from './constants';
import messages from './messages';

import { makeSelectProfileInfo } from '../AccountProvider/selectors';

const styles = singleCommunityStyles();

const Label = Button.extend`
  ${LabelStyles};
  pointer-events: ${x => (x.inactive ? 'none' : 'auto')};
  overflow: hidden;
  height: 1%;
  min-height: 32px;
  max-width: 180px;
  color: white;
  background: ${({ bg }) => bg || 'inherit'};
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
  questionId,
  isOfficial,
  profileInfo,
  userInfo,
}) => {
  if (answerId === 0) return null;

  const isItWrittenByMe = profileInfo
    ? userInfo.user === profileInfo.user
    : false;

  const displayTips =
    !profileInfo || (!!profileInfo && !isItWrittenByMe && answerId !== 0);

  return (
    <Div>
      {displayTips && (
        <SendTips
          form="tip-answer"
          questionId={questionId}
          answerId={answerId}
          account={whoWasAccepted}
        >
          <B>
            <IconMd className="mr-1"
              icon={styles.coinsIcon ? styles.coinsIcon : coinsIcon} />
            <FormattedMessage {...commonMessages.tipAnswer} />
          </B>
        </SendTips>
      )}

      <MarkAsAcceptedIcon
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

      {isTheLargestRating && (
        <Label bg={BG_PRIMARY} inactive>
          <img className="d-inline-flex mr-2" src={crownIcon} alt="icon" />
          <FormattedMessage {...messages.communityChoice} />
        </Label>
      )}

      {isOfficial && (
        <Label bg="rgb(93, 109, 254)" inactive>
          <img
            className="d-inline-flex mr-2"
            height="20"
            src={officialIcon}
            alt="icon"
          />
          <FormattedMessage {...messages.officialAnswer} />
        </Label>
      )}
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
  questionId: PropTypes.string,
  isOfficial: PropTypes.bool,
  profileInfo: PropTypes.object,
  userInfo: PropTypes.object,
};

export default React.memo(
  connect(
    state => ({
      profileInfo: makeSelectProfileInfo()(state),
    }),
    null,
  )(BestAnswerMarker),
);
