import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { TEXT_WARNING_LIGHT } from 'style-constants';

import P from 'components/P';
import Base from 'components/Base';
import WeekDetails from './WeekDetails';
import WeekNumber from '../Wallet/WeekNumber';
import messages from './messages';

const NextWeek = ({
  period,
  locale,
  averageStakeNext,
  userStakeNext,
  userBoostNext,
  periodFinished,
}) => (
  <li className="d-flex flex-column flex-grow-1 mb-3">
    <Base className="flex-grow-0" position="top">
      <P className="mb-1" color={TEXT_WARNING_LIGHT} fontSize="13">
        <FormattedMessage id={messages.nextPeriod.id} />
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

NextWeek.propTypes = {
  period: PropTypes.number,
  locale: PropTypes.string,
  periodStarted: PropTypes.number,
  periodFinished: PropTypes.number,
  maxStake: PropTypes.number,
  userStake: PropTypes.number,
};

export default memo(NextWeek);
