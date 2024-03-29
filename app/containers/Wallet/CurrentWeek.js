import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { TEXT_WARNING_LIGHT } from 'style-constants';

import calendarImage from 'images/calendar.svg?external';

import P from 'components/P';
import Span from 'components/Span';
import Base from 'components/Base';
import Icon from 'components/Icon';

import WeekNumber from './WeekNumber';

const CurrentWeek = ({
  period,
  locale,
  periodStarted,
  periodFinished,
  currentWeeksNumber,
}) => {
  const { t } = useTranslation();

  return (
    <li className="flex-grow-1 mb-3">
      <Base position="top">
        <P className="mb-1" color={TEXT_WARNING_LIGHT} fontSize="13">
          {t('wallet.currentPeriod')}
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
        <Icon className="mr-3" icon={calendarImage} width="34" />
        <Span mobileFS={14}>{t('wallet.periodStillInProgress')}</Span>
      </Base>
    </li>
  );
};

CurrentWeek.propTypes = {
  period: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  locale: PropTypes.string,
  periodStarted: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  periodFinished: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentWeeksNumber: PropTypes.number,
};

export default memo(CurrentWeek);
