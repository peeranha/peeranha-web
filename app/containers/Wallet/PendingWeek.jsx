import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { TEXT_WARNING_LIGHT, TEXT_SECONDARY } from 'style-constants';

import PeercoinIcon from 'icons/Peercoin';

import P from 'components/P';
import Span from 'components/Span';
import Base from 'components/Base';

import messages from './messages';
import WeekNumber from './WeekNumber';

const PendingWeek = ({
  period,
  reward,
  locale,
  periodStarted,
  periodFinished,
}) => (
  <li className="flex-grow-1 mb-3">
    <Base position="top">
      <P className="mb-1" color={TEXT_WARNING_LIGHT} fontSize="13">
        <FormattedMessage id={messages.payoutPending.id} />
      </P>
      <WeekNumber
        locale={locale}
        period={period}
        periodStarted={periodStarted}
        periodFinished={periodFinished}
      />
    </Base>
    <Base position="bottom">
      <>
        <P className="mb-1" fontSize="14" color={TEXT_SECONDARY}>
          <FormattedMessage id={messages.estimatedPayout.id} />
        </P>
        <P className="d-flex align-items-center">
          <PeercoinIcon className="mr-2" size={[16, 16]} />
          <Span mobileFS={14}>
            <FormattedMessage id={messages.weAreAnalyzing.id} />
          </Span>
        </P>
      </>
    </Base>
  </li>
);

PendingWeek.propTypes = {
  period: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  locale: PropTypes.string,
  reward: PropTypes.number,
  periodStarted: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  periodFinished: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default memo(PendingWeek);
