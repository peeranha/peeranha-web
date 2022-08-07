import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { TEXT_WARNING_LIGHT } from 'style-constants';

import CalendarIcon from 'icons/Calendar';

import P from 'components/P';
import Span from 'components/Span';
import Base from 'components/Base';

import messages from './messages';
import WeekNumber from './WeekNumber';

const CurrentWeek = ({
  period,
  locale,
  periodStarted,
  periodFinished,
  currentWeeksNumber,
}) => (
  <li className="flex-grow-1 mb-3">
    <Base position="top">
      <P className="mb-1" color={TEXT_WARNING_LIGHT} fontSize="13">
        <FormattedMessage id={messages.currentPeriod.id} />
      </P>
      <WeekNumber
        currentWeeksNumber={currentWeeksNumber}
        locale={locale}
        period={period}
        periodStarted={periodStarted}
        periodFinished={periodFinished}
      />
    </Base>
    <Base className="d-flex align-items-center" position="bottom">
      <CalendarIcon className="mr-3" stroke="#576FED" fill="#BDC0C9" />
      <Span mobileFS={14}>
        <FormattedMessage id={messages.periodStillInProgress.id} />
      </Span>
    </Base>
  </li>
);

CurrentWeek.propTypes = {
  period: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  locale: PropTypes.string,
  periodStarted: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  periodFinished: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentWeeksNumber: PropTypes.number,
};

export default memo(CurrentWeek);
