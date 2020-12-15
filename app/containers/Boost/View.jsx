import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { MAX_STAKE_PREDICTION, MIN_STAKE_PREDICTION } from './constants';

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
  stakedInCurrentPeriod,
  stakedInNextPeriod,
  weekStat,
  globalBoostStat,
  userBoostStat,
  getWeekStatProcessing,
  changeStakeDispatch,
  changeStakeLoading,
}) => {
  const boostWeeks = getBoostWeeks(weekStat, globalBoostStat, userBoostStat);
  const { currentWeek, nextWeek } = boostWeeks;
  const { userStake, maxStake } = nextWeek;

  const [currentStake, setCurrentStake] = useState(userStake);

  if (currentStake === undefined && !!userStake)
    setCurrentStake(userStake);

  const changeCurrentStake = useCallback(
    x => {
      setCurrentStake(Math.floor(balance * x * 1000000) / 1000000);
    },
    [currentStake, setCurrentStake],
  );

  let predictedBoost = 1;
  if (maxStake && currentStake <= maxStake) {
    predictedBoost = currentStake / maxStake * (MAX_STAKE_PREDICTION - MIN_STAKE_PREDICTION) + 1;
    predictedBoost = Math.floor(predictedBoost * 100) / 100;
  } else if (currentStake > 0) {
    predictedBoost = MAX_STAKE_PREDICTION;
  }

  return (
    <>
      <NavHeader userId={userId} />
      
      <SubHeader
        account={account}
        balance={balance ? balance.toString() : ""}
        stakedInCurrentPeriod={stakedInCurrentPeriod}
        stakedInNextPeriod={stakedInNextPeriod}
      />

      <Weeks
        locale={locale}
        weekStat={weekStat}
        globalBoostStat={globalBoostStat}
        userBoostStat={userBoostStat}
        getWeekStatProcessing={getWeekStatProcessing}
      />

      <Form
        currentStake={currentStake}
        predictedBoost={predictedBoost}
        maxStake={balance}
        initialUserStake={stakedInNextPeriod}
        changeCurrentStake={changeCurrentStake}
        onChangeCurrentStake={setCurrentStake}
        changeStake={changeStakeDispatch}
        changeStakeLoading={changeStakeLoading}
        locale={locale}
      />
    </>
  );
}

View.propTypes = {
  userId: PropTypes.string,
  locale: PropTypes.string,
  account: PropTypes.string,
  balance: PropTypes.number,
  stakedInCurrentPeriod: PropTypes.number,
  stakedInNextPeriod: PropTypes.number,
  weekStat: PropTypes.array,
  globalBoostStat: PropTypes.array,
  userBoostStat: PropTypes.array,
  getWeekStatProcessing: PropTypes.bool,
  changeStakeDispatch: PropTypes.func,
  changeStakeLoading: PropTypes.bool,
};

export default React.memo(View);
