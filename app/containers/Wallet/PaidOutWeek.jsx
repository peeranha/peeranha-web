import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { TEXT_SECONDARY } from 'style-constants';

import { getFormattedNum3 } from 'utils/numbers';

import P from 'components/P';
import Span from 'components/Span';
import BaseRounded from 'components/Base/BaseRounded';
import PickupButton from 'components/Button/Contained/InfoLarge';
import ReceivedButton from 'components/Button/Contained/SecondaryLarge';
import PeercoinIcon from 'icons/Peercoin';

import messages from './messages';

import WeekNumber from './WeekNumber';
import { formatEther } from 'ethers/lib/utils';
import { REWARD_CLAIMING_ENABLED } from '../../utils/constants';

const BaseRoundedLi = BaseRounded.extend`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > * {
    flex: 1;
  }

  ${PickupButton}, ${ReceivedButton} {
    min-width: 140px;
  }
`.withComponent('li');

const Container = styled.div`
  @media only screen and (max-width: 776px) {
    padding-bottom: 16px;
  }
`;

const WeekActions = styled.div`
  @media only screen and (max-width: 730px) {
    flex-direction: column;
    flex-grow: 0;
    font-size: 16px;

    button {
      margin: 7px 0 0 !important;
    }
  }
`;

const EstimatedReward = styled.div`
  display: inline-grid;
  grid-template-columns: 5% 95%;
`;

const PaidOutWeek = ({
  period,
  reward,
  locale,
  hasTaken,
  pickupRewardDispatch,
  pickupRewardProcessing,
  periodStarted,
  periodFinished,
  style,
}) => {
  const pickUpReward = () => {
    pickupRewardDispatch(period);
  };
  return (
    <Container style={style}>
      <BaseRoundedLi className="align-items-center">
        <div>
          <P fontSize="13" color={TEXT_SECONDARY}>
            <FormattedMessage id={messages.paidOut.id} />
          </P>
          <WeekNumber
            locale={locale}
            period={period}
            periodStarted={periodStarted}
            periodFinished={periodFinished}
          />
        </div>
        {(REWARD_CLAIMING_ENABLED && (
          <WeekActions className="d-flex align-items-center justify-content-end">
            <P className="d-flex align-items-center">
              <PeercoinIcon className="mr-2" size={[16, 16]} />
              <Span fontSize="20" mobileFS={14} bold>
                {getFormattedNum3(formatEther(reward))}
              </Span>
            </P>

            {!hasTaken && (
              <PickupButton
                className="ml-4"
                id={`pickup-reward-${period}`}
                onClick={pickUpReward}
                disabled={
                  hasTaken !== false ||
                  !Number(formatEther(reward)) ||
                  pickupRewardProcessing
                }
              >
                <FormattedMessage id={messages.getReward.id} />
              </PickupButton>
            )}

            {hasTaken && (
              <ReceivedButton className="ml-4">
                <FormattedMessage id={messages.received.id} />
              </ReceivedButton>
            )}
          </WeekActions>
        )) || (
          <EstimatedReward>
            <font
              style={{
                gridColumn: '2',
                textAlign: 'right',
              }}
              color={TEXT_SECONDARY}
              className="align-items-center"
            >
              <FormattedMessage id={messages.estimatedReward.id} />
            </font>
            <Span
              fontSize="20"
              mobileFS={14}
              bold
              style={{ gridColumn: '2', textAlign: 'right' }}
            >
              <PeercoinIcon className="mr-2" size={[16, 16]} />
              {getFormattedNum3(formatEther(reward))}
            </Span>
          </EstimatedReward>
        )}
      </BaseRoundedLi>
    </Container>
  );
};

PaidOutWeek.propTypes = {
  period: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  locale: PropTypes.string,
  reward: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hasTaken: PropTypes.bool,
  pickupRewardDispatch: PropTypes.func,
  pickupRewardProcessing: PropTypes.bool,
  periodStarted: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  periodFinished: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
};

export default memo(PaidOutWeek);
