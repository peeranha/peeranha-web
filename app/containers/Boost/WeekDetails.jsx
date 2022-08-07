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

import PeercoinIcon from 'icons/Peercoin';

import { getFormattedNum3 } from 'utils/numbers';

import P from 'components/P';
import Span from 'components/Span';
import Base from 'components/Base';

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

const WeekDetails = ({
  averageStake,
  yourStake = 0,
  userBoost,
  isCurrentWeek,
}) => (
  <Base position="bottom">
    <BaseGroup>
      <P className="mb-1" fontSize="14" color={TEXT_SECONDARY}>
        <FormattedMessage {...messages.maximumStake} />
      </P>
      <P className="d-flex align-items-center">
        <PeercoinIcon className="mr-2" size={[16, 16]} />
        <Span fontSize="20" mobileFS={14} bold>
          {getFormattedNum3(averageStake)}
        </Span>
      </P>
    </BaseGroup>
    <BaseGroup>
      <P className="mb-1" fontSize="14" color={TEXT_SECONDARY}>
        <FormattedMessage {...messages.yourStake} />
      </P>
      <P className="d-flex align-items-center">
        <PeercoinIcon className="mr-2" size={[16, 16]} />
        <Span fontSize="20" mobileFS={14} bold>
          {getFormattedNum3(yourStake)}
        </Span>
      </P>
    </BaseGroup>
    {userBoost > 1 && (
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
            {userBoost}
          </PredictionPower>
        </P>
      </BaseGroup>
    )}
  </Base>
);

WeekDetails.propTypes = {
  averageStake: PropTypes.number,
  yourStake: PropTypes.number,
  isCurrentWeek: PropTypes.bool,
};

export default memo(WeekDetails);
