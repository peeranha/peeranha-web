import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import CurrentWeek from './CurrentWeek';
import NextWeek from './NextWeek';

const CurrentPendingWeeks = styled.div`
  display: ${x => (x.inRow ? 'flex' : 'block')};
  align-items: stretch;

  > :nth-child(1) {
    flex: 1;
    margin-right: ${x => (x.inRow ? '10px' : '0px')};
  }

  > :nth-child(2) {
    flex: 1;
    margin-left: ${x => (x.inRow ? '10px' : '0px')};
  }

  @media only screen and (max-width: 768px) {
    display: block;

    > * {
      margin-right: 0 !important;
      margin-left: 0 !important;
    }
  }
`;

const PERIOD_LENGTH = {
  development: 2*60*60, // two hours
  test: 2*60*60, // two hours
  production: 7*24*60*60, // one week
}

const Weeks = ({
  locale,
  weekStat,
  globalBoostStat,
  userBoostStat,
  getWeekStatProcessing,
}) => {
  const currentWeek = weekStat ? weekStat[0] : {};
  const nextWeek = currentWeek ? 
    {
      period: currentWeek.period + 1,
      periodStarted: currentWeek.periodFinished,  
      periodFinished: currentWeek.periodFinished + PERIOD_LENGTH[process.env.NODE_ENV],
    } : {};

  if (globalBoostStat) {
    currentWeek.maxStake = +globalBoostStat[
      (globalBoostStat.length > 1) && (globalBoostStat[0].period === nextWeek.period) ? 1 : 0
    ].max_stake;
    nextWeek.maxStake = +globalBoostStat[0].max_stake;
  }

  if (userBoostStat) {
    currentWeek.userStake = +userBoostStat[
      (userBoostStat.length > 1) && (userBoostStat[0].period === nextWeek.period) ? 1 : 0
    ].staked_tokens;
    nextWeek.userStake = +userBoostStat[0].staked_tokens;
  }

  return (
    <>
      {globalBoostStat &&
        !getWeekStatProcessing && (
          <ul className="mt-3">
            <CurrentPendingWeeks inRow>
              <CurrentWeek
                locale={locale}
                {...currentWeek}
              />

              <NextWeek
                locale={locale}
                {...nextWeek}
              />
            </CurrentPendingWeeks>
          </ul>
        )}

      {getWeekStatProcessing && <LoadingIndicator />}
    </>
  );
};

Weeks.propTypes = {
  weekStat: PropTypes.array,
  globalBoostStat: PropTypes.array,
  userBoostStat: PropTypes.array,
  locale: PropTypes.string,
  getWeekStatProcessing: PropTypes.bool,
};

export default React.memo(Weeks);
