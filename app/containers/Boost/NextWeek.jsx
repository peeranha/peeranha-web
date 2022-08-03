import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { TEXT_WARNING_LIGHT } from 'style-constants';

import P from 'components/P';
import Base from 'components/Base';
import WeekDetails from './WeekDetails';
import WeekNumber from '../Wallet/WeekNumber';

const NextWeek = ({
  period,
  locale,
  averageStakeNext,
  userStakeNext,
  userBoostNext,
  periodFinished,
}) => {
  const { t } = useTranslation();

  return (
    <li className="d-flex flex-column flex-grow-1 mb-3">
      <Base className="flex-grow-0" position="top">
        <P className="mb-1" color={TEXT_WARNING_LIGHT} fontSize="13">
          {t('boost.nextPeriod')}
        </P>
        <WeekNumber
          locale={locale}
          period={Number(period) + 1}
          periodStarted={periodFinished}
          periodFinished={
            Number(periodFinished) + Number(process.env.PERIOD_LENGTH)
          }
        />
      </Base>

      <WeekDetails
        averageStake={averageStakeNext}
        yourStake={userStakeNext}
        userBoost={userBoostNext}
      />
    </li>
  );
};

NextWeek.propTypes = {
  period: PropTypes.number,
  locale: PropTypes.string,
  periodStarted: PropTypes.number,
  periodFinished: PropTypes.number,
  maxStake: PropTypes.number,
  userStake: PropTypes.number,
};

export default memo(NextWeek);
