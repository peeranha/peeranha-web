import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { BG_PRIMARY, BG_PRIMARY_RGB } from 'style-constants';

import { formatStringToHtmlId } from 'utils/animation';

import SuperHeroIcon from 'icons/SuperHero';
import OfficialIcon from 'icons/Official';

import Button from 'components/Button/Contained/PrimaryMedium';
import MarkAsAcceptedIcon, { LabelStyles } from './MarkAsAcceptedIcon';

import { MARK_AS_BUTTON } from './constants';
import messages from './messages';

import { makeSelectProfileInfo } from '../AccountProvider/selectors';

const Label = Button.extend`
  ${LabelStyles};
  pointer-events: ${x => (x.inactive ? 'none' : 'auto')};
  overflow: hidden;
  height: 1%;
  min-height: 32px;
  max-width: 300px;
  color: ${({ color }) => color || 'white'};
  background: ${({ bg }) => bg || 'inherit'};
  ${({ border }) => `border: 1px solid ${border}` || ''};
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
  isOfficial,
}) => {
  if (answerId === 0) return null;

  return (
    <Div>
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
          <SuperHeroIcon
            className="d-inline-flex mr-2"
            stroke={BG_PRIMARY}
            size={[15, 15]}
          />
          <FormattedMessage {...messages.communityChoice} />
        </Label>
      )}

      {isOfficial && (
        <Label
          bg={`rgba(${BG_PRIMARY_RGB}, 0.2)`}
          border={BG_PRIMARY}
          color={BG_PRIMARY}
          inactive
        >
          <OfficialIcon className="d-inline-flex mr-2" stroke={BG_PRIMARY} />
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
  author: PropTypes.object,
};

export default React.memo(
  connect(
    state => ({
      profileInfo: makeSelectProfileInfo()(state),
    }),
    null,
  )(BestAnswerMarker),
);
