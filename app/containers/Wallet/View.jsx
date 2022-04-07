import React, { memo } from 'react';
import PropTypes from 'prop-types';

import NavHeader from 'components/WalletNavigation';
import SubHeader from './SubHeader';
import Weeks from './Weeks';
import BoostBanner from './BoostBanner';

const View = ({
  userId,
  locale,
  account,
  balance,
  stakedInCurrentPeriod,
  stakedInNextPeriod,
  weekStat,
  userBoostStat,
  getWeekStatProcessing,
  pickupRewardDispatch,
  pickupRewardProcessing,
  ids,
}) => (
  <>
    {/*TODO boost*/}
    {/*<NavHeader userId={userId} />*/}

    <SubHeader
      account={account}
      balance={balance}
      stakedInCurrentPeriod={stakedInCurrentPeriod}
      stakedInNextPeriod={stakedInNextPeriod}
    />

    {userBoostStat &&
      !userBoostStat.length && <BoostBanner userId={userId} locale={locale} />}

    <Weeks
      locale={locale}
      weekStat={weekStat}
      getWeekStatProcessing={getWeekStatProcessing}
      pickupRewardDispatch={pickupRewardDispatch}
      pickupRewardProcessing={pickupRewardProcessing}
      ids={ids}
    />
  </>
);

View.propTypes = {
  userId: PropTypes.string,
  locale: PropTypes.string,
  account: PropTypes.string,
  balance: PropTypes.number,
  stakedInCurrentPeriod: PropTypes.number,
  stakedInNextPeriod: PropTypes.number,
  weekStat: PropTypes.array,
  userBoostStat: PropTypes.array,
  ids: PropTypes.array,
  getWeekStatProcessing: PropTypes.bool,
  getWeekStatDispatch: PropTypes.func,
  pickupRewardDispatch: PropTypes.func,
  pickupRewardProcessing: PropTypes.bool,
};

export default memo(View);
