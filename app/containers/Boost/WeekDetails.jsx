import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import {
  TEXT_SECONDARY,
  TEXT_LIGHT,
  BG_WARNING_LIGHT,
  BG_PRIMARY,
} from 'style-constants';

import currencyPeerImage from 'images/currencyPeer.svg?inline';

import { getFormattedNum3 } from 'utils/numbers';
import { getPredictedBoost } from 'utils/walletManagement';

import P from 'components/P';
import Span from 'components/Span';
import Base from 'components/Base';
import SmallImage from 'components/Img/SmallImage';

import messages from './messages';

const BaseGroup = styled.div`
  margin-bottom: 20px;
`;

const PredictionPower = Span.extend`
  padding: 4px 11px 6px;
  font-weight: bold;
  color: ${TEXT_LIGHT};
  background-color: ${({ isCurrentWeek }) =>
    isCurrentWeek ? BG_WARNING_LIGHT : BG_PRIMARY};
  border-radius: 20px;
`;

const WeekDetails = ({ maximumStake, yourStake = 0, isCurrentWeek }) => {
  const predictedBoost = useMemo(
    () => getPredictedBoost(yourStake, maximumStake),
    [yourStake, maximumStake],
  );

  return (
    <Base position="bottom">
      <BaseGroup>
        <P className="mb-1" fontSize="14" color={TEXT_SECONDARY}>
          <FormattedMessage {...messages.maximumStake} />
        </P>
        <P className="d-flex align-items-center">
          <SmallImage className="mr-2" src={currencyPeerImage} alt="icon" />
          <Span fontSize="20" mobileFS={14} bold>
            {getFormattedNum3(maximumStake)}
          </Span>
        </P>
      </BaseGroup>
      <BaseGroup>
        <P className="mb-1" fontSize="14" color={TEXT_SECONDARY}>
          <FormattedMessage {...messages.yourStake} />
        </P>
        <P className="d-flex align-items-center">
          <SmallImage className="mr-2" src={currencyPeerImage} alt="icon" />
          <Span fontSize="20" mobileFS={14} bold>
            {getFormattedNum3(yourStake)}
          </Span>
        </P>
      </BaseGroup>
      {predictedBoost.value > 1 && (
        <BaseGroup>
          <P className="mb-1" fontSize="14" color={TEXT_SECONDARY}>
            <FormattedMessage
              {...messages[isCurrentWeek ? 'yourBoost' : 'yourPredictedBoost']}
            />
          </P>
          <P className="d-flex align-items-center">
            <PredictionPower
              fontSize="20"
              mobileFS={14}
              isCurrentWeek={!!isCurrentWeek}
            >
              {predictedBoost.text}
            </PredictionPower>
          </P>
        </BaseGroup>
      )}
    </Base>
  );
};

WeekDetails.propTypes = {
  maximumStake: PropTypes.number,
  yourStake: PropTypes.number,
  isCurrentWeek: PropTypes.bool,
};

export default memo(WeekDetails);
