import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { MAX_STAKE_PREDICTION, MIN_STAKE_PREDICTION } from './constants';

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

  const maximumCurrentStake = 9876543210.84736;

  const predictedBoost = 
    Math.floor(currentStake / maximumCurrentStake * 100) / 100 * 
    (MAX_STAKE_PREDICTION - MIN_STAKE_PREDICTION) + 1;

  return (
  <>
    <NavHeader userId={userId} />
    
    <SubHeader account={account} balance={balance.toString()} />

    <Weeks
      locale={locale}
      weekStat={weekStat}
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
);}

View.propTypes = {
  userId: PropTypes.string,
  locale: PropTypes.string,
  account: PropTypes.string,
  balance: PropTypes.number,
  weekStat: PropTypes.array,
  getWeekStatProcessing: PropTypes.bool,
  changeStakeDispatch: PropTypes.func,
  changeStakeLoading: PropTypes.bool,
};

export default React.memo(View);
