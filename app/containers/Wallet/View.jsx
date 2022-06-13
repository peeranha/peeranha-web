import React, { memo } from 'react';
import PropTypes from 'prop-types';

import NavHeader from 'components/WalletNavigation';
import SubHeader from 'containers/Wallet/SubHeader';
import Weeks from 'containers/Wallet/Weeks';
import BoostBanner from 'containers/Wallet/BoostBanner';
import { BOOSTS_SUM_VALUE_WITHOUT_STAKE } from 'utils/constants';

const View = ({
  userId,
  locale,
  account,
  balance,
  availableBalance,
  weekStat,
  userBoostStat,
  getWeekStatProcessing,
  pickupRewardDispatch,
  pickupRewardProcessing,
  ids,
}) => {
  const [currentUserStake, nextUserStake] = userBoostStat || [];

  return (
    <>
      {process.env.REWARD_CLAIMING_ENABLED === 'true' && (
        <NavHeader userId={userId} />
      )}

      <SubHeader
        account={account}
        balance={balance}
        availableBalance={availableBalance}
        stakedInCurrentPeriod={currentUserStake}
        stakedInNextPeriod={nextUserStake}
      />

      {process.env.REWARD_CLAIMING_ENABLED === 'false' && (
        <BoostBanner userId={userId} locale={locale} />
      )}

      {userBoostStat &&
        !(
          currentUserStake + nextUserStake >
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
  weekStat: PropTypes.array,
  userBoostStat: PropTypes.array,
  ids: PropTypes.array,
  getWeekStatProcessing: PropTypes.bool,
  getWeekStatDispatch: PropTypes.func,
  pickupRewardDispatch: PropTypes.func,
  pickupRewardProcessing: PropTypes.bool,
};

export default memo(View);
