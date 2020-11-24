import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

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
  changeBetDispatch,
  changeBetLoading,
}) => {
  const [currentBet, setCurrentBet] = useState(0);

  const changeCurrentBet = useCallback(
    x => {
      setCurrentBet(Math.floor(balance * x * 1000000) / 1000000);
    },
    [currentBet, setCurrentBet],
  );

  let superPowerPrediction;
  if (currentBet / balance === 0) {
    superPowerPrediction = 1;
  } else if (currentBet / balance <= 0.1) {
    superPowerPrediction = 1.25;
  } else if (currentBet / balance <= 0.25) {
    superPowerPrediction = 2;
  } else if (currentBet / balance <= 0.5) {
    superPowerPrediction = 3;
  } else if (currentBet / balance <= 0.75) {
    superPowerPrediction = 4;
  } else if (currentBet / balance <= 1) {
    superPowerPrediction = 5;
  }

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
      currentBet={currentBet}
      superPowerPrediction={superPowerPrediction}
      maxBet={balance}
      changeCurrentBet={changeCurrentBet}
      onChangeCurrentBet={e => setCurrentBet(+e.currentTarget.value)}
      changeBet={changeBetDispatch}
      changeBetLoading={changeBetLoading}
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
  changeBetDispatch: PropTypes.func,
  changeBetLoading: PropTypes.bool,
};

export default React.memo(View);
