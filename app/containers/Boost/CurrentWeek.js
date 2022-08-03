import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import {
  TEXT_WARNING_LIGHT,
  BORDER_RADIUS_L,
  BORDER_WARNING_LIGHT,
} from 'style-constants';

import P from 'components/P';
import Base from 'components/Base';
import WeekNumber from '../Wallet/WeekNumber';
import WeekDetails from './WeekDetails';

const CurrentWeek = ({
  period,
  locale,
  averageStakeCurrent,
  userStakeCurrent,
  periodStarted,
  periodFinished,
  userBoostCurrent,
}) => {
  const { t } = useTranslation();

  return (
    <li
      className="d-flex flex-column flex-grow-1 mb-3"
      style={{
        border: `1px dashed ${BORDER_WARNING_LIGHT}`,
        borderRadius: BORDER_RADIUS_L,
      }}
    >
      <Base className="flex-grow-0" position="top">
        <P className="mb-1" color={TEXT_WARNING_LIGHT} fontSize="13">
          {t('wallet.currentPeriod')}
        </P>
        <WeekNumber
          locale={locale}
          period={period}
          periodStarted={periodStarted}
          periodFinished={periodFinished}
        />
      </Base>
      <WeekDetails
        averageStake={averageStakeCurrent}
        yourStake={userStakeCurrent}
        userBoost={userBoostCurrent}
        isCurrentWeek
      />
    </li>
  );
};

CurrentWeek.propTypes = {
  period: PropTypes.number,
  locale: PropTypes.string,
  periodStarted: PropTypes.number,
  periodFinished: PropTypes.number,
  maxStake: PropTypes.number,
  userStake: PropTypes.number,
};

export default memo(CurrentWeek);
