import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { TEXT_WARNING_LIGHT, BORDER_RADIUS_L, BORDER_WARNING_LIGHT } from 'style-constants';

import P from 'components/P';
import Base from 'components/Base';
import WeekNumber from './WeekNumber';
import WeekDetails from './WeekDetails';

import messages from './messages';

const CurrentWeek = ({
  period,
  locale,
  periodStarted,
  periodFinished,
  currentWeeksNumber,
}) => (
  <li
    className="flex-grow-1 mb-3"
    style={{border: `1px dashed ${BORDER_WARNING_LIGHT}`, borderRadius: BORDER_RADIUS_L}}
  >
    <Base position="top">
      <P className="mb-1" color={TEXT_WARNING_LIGHT} fontSize="13">
        <FormattedMessage {...messages.currentPeriod} />
      </P>
      <WeekNumber
        currentWeeksNumber={currentWeeksNumber}
        locale={locale}
        period={period}
        periodStarted={periodStarted}
        periodFinished={periodFinished}
      />
    </Base>
    <WeekDetails
      betsPool={9876543210.84736}
      users={12038}
      yourBet={9959.25001}
      superPowerPrediction={2}
      isCurrentWeek
    />
  </li>
);

CurrentWeek.propTypes = {
  period: PropTypes.number,
  locale: PropTypes.string,
  periodStarted: PropTypes.number,
  periodFinished: PropTypes.number,
  currentWeeksNumber: PropTypes.number,
};

export default memo(CurrentWeek);
