import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { TEXT_WARNING_LIGHT, TEXT_SECONDARY } from 'style-constants';

import { getFormattedNum3 } from 'utils/numbers';

import currencyPeerImage from 'images/currencyPeer.svg?inline';

import P from 'components/P';
import Span from 'components/Span';
import Base from 'components/Base';
import SmallImage from 'components/Img/SmallImage';

import messages from './messages';
import WeekNumber from './WeekNumber';
import { WEI_IN_ETH } from '../../utils/constants';

const PendingWeek = ({
  period,
  reward,
  locale,
  periodStarted,
  periodFinished,
  registrationWeek,
}) => (
  <li className="flex-grow-1 mb-3">
    <Base position="top">
      <P className="mb-1" color={TEXT_WARNING_LIGHT} fontSize="13">
        <FormattedMessage
          {...messages[registrationWeek ? 'registrationWeek' : 'payoutPending']}
        />
      </P>
      <WeekNumber
        locale={locale}
        period={period}
        periodStarted={periodStarted}
        periodFinished={periodFinished}
      />
    </Base>
    <Base position="bottom">
      {!registrationWeek ? (
        <>
          <P className="mb-1" fontSize="14" color={TEXT_SECONDARY}>
            <FormattedMessage {...messages.estimatedPayout} />
          </P>
          <P className="d-flex align-items-center">
            <SmallImage className="mr-2" src={currencyPeerImage} alt="icon" />
            <Span fontSize="20" mobileFS={14} bold>
              {getFormattedNum3(reward / WEI_IN_ETH)}
            </Span>
          </P>
        </>
      ) : (
        <P>
          <FormattedMessage {...messages.thisIsRegistrationWeek} />
        </P>
      )}
    </Base>
  </li>
);

PendingWeek.propTypes = {
  period: PropTypes.number,
  locale: PropTypes.string,
  reward: PropTypes.number,
  periodStarted: PropTypes.number,
  periodFinished: PropTypes.number,
  registrationWeek: PropTypes.bool,
};

export default memo(PendingWeek);
