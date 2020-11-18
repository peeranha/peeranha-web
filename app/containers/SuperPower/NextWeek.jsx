import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { TEXT_WARNING_LIGHT } from 'style-constants';

import P from 'components/P';
import Base from 'components/Base';
import WeekDetails from './WeekDetails';
import WeekNumber from './WeekNumber';

import messages from './messages';

const NextWeek = ({
  period,
  locale,
  periodStarted,
  periodFinished,
}) => (
  <li className="flex-grow-1 mb-3">
    <Base position="top">
      <P className="mb-1" color={TEXT_WARNING_LIGHT} fontSize="13">
        <FormattedMessage {...messages.nextPeriod} />
      </P>
      <WeekNumber
        locale={locale}
        period={period}
        periodStarted={periodStarted}
        periodFinished={periodFinished}
      />
    </Base>

    <WeekDetails
      betsPool={4478546.00392}
      users={3021}
      yourBet={9959.25001}
      superPowerPrediction={1.25}
    />
  </li>
);

NextWeek.propTypes = {
  period: PropTypes.number,
  locale: PropTypes.string,
  periodStarted: PropTypes.number,
  periodFinished: PropTypes.number,
};

export default memo(NextWeek);
