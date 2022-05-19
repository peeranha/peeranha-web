import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { getBoostWeeks } from 'utils/walletManagement';

import NavHeader from 'components/WalletNavigation';
import SubHeader from 'containers/Wallet/SubHeader';
import Weeks from './Weeks';
import Form from './Form';

const View = ({
  userId,
  locale,
  account,
  balance,
  availableBalance,
  weekStat,
  userBoostStat,
  getWeekStatProcessing,
  changeStakeDispatch,
  changeStakeLoading,
}) => {
  const userStakeNext = userBoostStat?.userStakeNext ?? 0;
  const averageStakeNext = userBoostStat?.averageStakeNext ?? 0;

  const [currentStake, setCurrentStake] = useState(-1);

  if (currentStake < 0 && !!userStakeNext) setCurrentStake(userStakeNext);

  const changeCurrentStake = useCallback(
    (x) => {
      setCurrentStake(Math.floor(balance * x * 1000000) / 1000000);
    },
    [currentStake, setCurrentStake],
  );

  return (
    <>
      <NavHeader userId={userId} />

      <SubHeader
        account={account}
        balance={balance}
        availableBalance={availableBalance}
        stakedInCurrentPeriod={userBoostStat?.userStakeCurrent}
        stakedInNextPeriod={userBoostStat?.userStakeNext}
      />

      <Weeks
        locale={locale}
        weekStat={weekStat}
        userBoostStat={userBoostStat}
        getWeekStatProcessing={getWeekStatProcessing}
      />

      <Form
        userBoostStat={userBoostStat}
        valueHasToBeLessThan={balance}
        currentStake={currentStake}
        maxStake={balance}
        initialUserStake={userBoostStat?.userStakeNext || 0}
        changeCurrentStake={changeCurrentStake}
        onChangeCurrentStake={setCurrentStake}
        changeStake={changeStakeDispatch}
        changeStakeLoading={changeStakeLoading}
        locale={locale}
        nextWeekMaxStake={averageStakeNext}
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
  globalBoostStat: PropTypes.array,
  userBoostStat: PropTypes.array,
  getWeekStatProcessing: PropTypes.bool,
  changeStakeDispatch: PropTypes.func,
  changeStakeLoading: PropTypes.bool,
};

export default React.memo(View);
