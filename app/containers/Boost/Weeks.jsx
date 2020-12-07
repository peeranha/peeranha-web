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

/* eslint indent: 0 */
const Weeks = ({
  locale,
  weekStat,
  getWeekStatProcessing,
}) => {
  const currentWeeksNumber = weekStat && ((weekStat[0] && 1) || 0);

  const pendingWeek = weekStat?.[1] ?? null;

  const ref = useRef(null);

  return (
    <>
      {weekStat &&
        !getWeekStatProcessing && (
          <ul className="mt-3" ref={ref}>
            <CurrentPendingWeeks inRow={weekStat.length >= 2}>
              {weekStat.length > 1 && (
                <CurrentWeek
                  currentWeeksNumber={currentWeeksNumber}
                  locale={locale}
                  {...weekStat[currentWeeksNumber === 2 ? 1 : 0]}
                  periodFinished={weekStat[0].periodFinished}
                />
              )}

              {pendingWeek && (
                <NextWeek
                  locale={locale}
                  {...pendingWeek}
                />
              )}
            </CurrentPendingWeeks>
          </ul>
        )}

      {getWeekStatProcessing && <LoadingIndicator />}
    </>
  );
};

Weeks.propTypes = {
  weekStat: PropTypes.array,
  locale: PropTypes.string,
  getWeekStatProcessing: PropTypes.bool,
};

export default React.memo(Weeks);
