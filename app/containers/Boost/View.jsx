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
  weekStat,
  globalBoostStat,
  userBoostStat,
  getWeekStatProcessing,
  changeStakeDispatch,
  changeStakeLoading,
}) => {
  const [currentStake, setCurrentStake] = useState(0);

  const changeCurrentStake = useCallback(
    x => {
      setCurrentStake(Math.floor(balance * x * 1000000) / 1000000);
    },
    [currentStake, setCurrentStake],
  );

  const boostWeeks = getBoostWeeks(weekStat, globalBoostStat, userBoostStat);

  console.log('boostWeeks', boostWeeks)
  const { currentWeek } = boostWeeks;
  const { maxStake } = currentWeek;

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
      
      <SubHeader account={account} balance={balance ? balance.toString() : ""} />

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
        changeCurrentStake={changeCurrentStake}
        onChangeCurrentStake={e => setCurrentStake(+e.currentTarget.value)}
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
  weekStat: PropTypes.array,
  globalBoostStat: PropTypes.array,
  userBoostStat: PropTypes.array,
  getWeekStatProcessing: PropTypes.bool,
  changeStakeDispatch: PropTypes.func,
  changeStakeLoading: PropTypes.bool,
};

export default React.memo(View);
