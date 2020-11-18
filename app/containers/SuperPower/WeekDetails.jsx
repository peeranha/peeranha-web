import React, { memo } from 'react';
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
  background-color: ${({ isCurrentWeek }) => isCurrentWeek ? BG_WARNING_LIGHT : BG_PRIMARY};
  border-radius: 20px;
`;

const WeekDetails = ({
  betsPool,
  users,
  yourBet,
  superPowerPrediction,
  isCurrentWeek,
}) => (
  <Base position="bottom">
    <BaseGroup>
      <P className="mb-1" fontSize="14" color={TEXT_SECONDARY}>
        <FormattedMessage {...messages.betsPool} />
      </P>
      <P className="d-flex align-items-center">
        <SmallImage className="mr-2" src={currencyPeerImage} alt="icon" />
        <Span fontSize="20" mobileFS={14} bold>{getFormattedNum3(betsPool)}</Span>
      </P>
    </BaseGroup>
    <BaseGroup>
      <P className="mb-1" fontSize="14" color={TEXT_SECONDARY}>
        <FormattedMessage {...messages.users} />
      </P>
      <P className="d-flex align-items-center">
        <Span fontSize="20" mobileFS={14} bold>{users}</Span>
      </P>
    </BaseGroup>
    <BaseGroup>
      <P className="mb-1" fontSize="14" color={TEXT_SECONDARY}>
        <FormattedMessage {...messages.yourBet} />
      </P>
      <P className="d-flex align-items-center">
        <SmallImage className="mr-2" src={currencyPeerImage} alt="icon" />
        <Span fontSize="20" mobileFS={14} bold>{getFormattedNum3(yourBet)}</Span>
        <Span
          className="ml-1"
          fontSize="14"
          mobileFS={12}
          color={TEXT_SECONDARY}
        ><FormattedMessage {...messages.transferedToNextPeriod} /></Span>
      </P>
    </BaseGroup>
    <BaseGroup>
      <P className="mb-1" fontSize="14" color={TEXT_SECONDARY}>
        <FormattedMessage {...messages[isCurrentWeek ? 'yourSuperPower' : 'superPowerPrediction']} />
      </P>
      <P className="d-flex align-items-center">
        <PredictionPower
          fontSize="20"
          mobileFS={14}
          isCurrentWeek={!!isCurrentWeek}
        >
          ×{superPowerPrediction}
        </PredictionPower>
      </P>
    </BaseGroup>
  </Base>
);

WeekDetails.propTypes = {
  betsPool: PropTypes.number,
  users: PropTypes.number,
  yourBet: PropTypes.number,
  superPowerPrediction: PropTypes.number,
  isCurrentWeek: PropTypes.bool,
};

export default memo(WeekDetails);
