import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { getFormattedDate } from 'utils/datetime';
import {
  FULL_MONTH_NAME_DAY_YEAR,
  DD_MM_YY,
  MONTH_3LETTERS__DAY_TIME,
} from 'utils/constants';

import P from 'components/P';
import Span from 'components/Span';

const WeekNumber = ({ period, locale, periodStarted, periodFinished }) => {
  const { t } = useTranslation();

  return (
    <P>
      <Span className="mr-3" fontSize="24" mobileFS={21} bold>
        {t('wallet.week')} {Number(period) + 1}
      </Span>

      <Span className="d-none d-md-inline-block">
        {getFormattedDate(
          periodStarted,
          locale,
          process.env.ENV === 'prod'
            ? FULL_MONTH_NAME_DAY_YEAR
            : MONTH_3LETTERS__DAY_TIME,
        )}
        {' — '}
        {getFormattedDate(
          periodFinished,
          locale,
          process.env.ENV === 'prod'
            ? FULL_MONTH_NAME_DAY_YEAR
            : MONTH_3LETTERS__DAY_TIME,
        )}
      </Span>

      <Span className="d-inline-block d-md-none" mobileFS={14}>
        {getFormattedDate(periodStarted, locale, DD_MM_YY)}
        {' — '}
        {getFormattedDate(periodFinished, locale, DD_MM_YY)}
      </Span>
    </P>
  );
};

WeekNumber.propTypes = {
  period: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  locale: PropTypes.string,
  periodStarted: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  periodFinished: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentWeeksNumber: PropTypes.number,
};

export default memo(WeekNumber);
