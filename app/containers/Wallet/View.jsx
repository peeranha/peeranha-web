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
  availableBalance,
  stakedInCurrentPeriod,
  stakedInNextPeriod,
  weekStat,
  userBoostStat,
  getWeekStatProcessing,
  pickupRewardDispatch,
  pickupRewardProcessing,
  ids,
}) => {
  const [currentBoostValue, nextBoostValue] = userBoostStat || [];
  const BOOSTS_SUM_VALUE_WITHOUT_STAKE = 2;

  return (
    <>
      <NavHeader userId={userId} />

      <SubHeader
        account={account}
        balance={balance}
        availableBalance={availableBalance}
        stakedInCurrentPeriod={stakedInCurrentPeriod}
        stakedInNextPeriod={stakedInNextPeriod}
      />

      {userBoostStat &&
        !(
          currentBoostValue + nextBoostValue >
          BOOSTS_SUM_VALUE_WITHOUT_STAKE
        ) && <BoostBanner userId={userId} locale={locale} />}

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
};

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
