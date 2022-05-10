import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getBoostWeeks } from 'utils/walletManagement';

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

const Weeks = ({ locale, weekStat, userBoostStat, getWeekStatProcessing }) => {
  return (
    <>
      {userBoostStat &&
        !getWeekStatProcessing && (
          <ul className="mt-3">
            <CurrentPendingWeeks inRow>
              <CurrentWeek
                locale={locale}
                period={weekStat[0].period}
                periodStarted={weekStat[0].periodStarted}
                periodFinished={weekStat[0].periodFinished}
                averageStakeCurrent={userBoostStat.averageStakeCurrent}
                userStakeCurrent={userBoostStat.userStakeCurrent}
              />

              <NextWeek
                locale={locale}
                period={weekStat[0].period}
                periodStarted={weekStat[0].periodStarted}
                periodFinished={weekStat[0].periodFinished}
                averageStakeNext={userBoostStat.averageStakeNext}
                userStakeNext={userBoostStat.userStakeNext}
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
