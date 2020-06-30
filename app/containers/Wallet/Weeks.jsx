import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import { makeSelectProfileInfo } from '../AccountProvider/selectors';
import CurrentWeek from './CurrentWeek';
import PendingWeek from './PendingWeek';
import PaidOutWeeksContainer from './PaidOutWeeksContainer';

const CurrentPendingWeeks = styled.div`
  display: ${x => (x.inRow ? 'flex' : 'block')};
  align-items: stretch;

  > :nth-child(1) {
    flex: 1;
    margin-right: ${x => (x.inRow ? '10px' : '0px')};

    > div {
      height: 50%;
    }
  }

  > :nth-child(2) {
    flex: 1;
    margin-left: ${x => (x.inRow ? '10px' : '0px')};

    > div {
      height: 50%;
    }
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
  pickupRewardDispatch,
  pickupRewardProcessing,
  ids,
  profile,
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
              {weekStat.length > 1 ? (
                <CurrentWeek
                  currentWeeksNumber={currentWeeksNumber}
                  locale={locale}
                  {...weekStat[currentWeeksNumber === 2 ? 1 : 0]}
                  periodFinished={weekStat[0].periodFinished}
                />
              ) : (
                <CurrentWeek
                  {...weekStat[0]}
                  currentWeeksNumber={0}
                  locale={locale}
                  period={0}
                />
              )}

              {pendingWeek && (
                <PendingWeek
                  locale={locale}
                  registrationWeek={pendingWeek && weekStat.length === 2}
                  {...pendingWeek}
                />
              )}
            </CurrentPendingWeeks>

            <PaidOutWeeksContainer
              weekStat={weekStat.slice(2)}
              pickupRewardDispatch={pickupRewardDispatch}
              pickupRewardProcessing={pickupRewardProcessing}
              locale={locale}
              ids={ids}
              containerRef={ref}
            />
          </ul>
        )}

      {getWeekStatProcessing && <LoadingIndicator />}
    </>
  );
};

Weeks.propTypes = {
  weekStat: PropTypes.array,
  ids: PropTypes.array,
  locale: PropTypes.string,
  pickupRewardDispatch: PropTypes.func,
  getWeekStatProcessing: PropTypes.bool,
  pickupRewardProcessing: PropTypes.bool,
  profile: PropTypes.object,
};

export default React.memo(
  connect(state => ({
    profile: makeSelectProfileInfo()(state),
  }))(Weeks),
);
