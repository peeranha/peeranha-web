import React from 'react';
import PropTypes from 'prop-types';

import NavHeader from 'components/WalletNavigation';
import SubHeader from './SubHeader';
import Weeks from './Weeks';

const View = ({
  userId,
  locale,
  account,
  balance,
  weekStat,
  getWeekStatProcessing,
  pickupRewardDispatch,
  pickupRewardProcessing,
  ids,
}) => (
  <React.Fragment>
    <NavHeader userId={userId} />
    <SubHeader account={account} balance={balance} />
    <Weeks
      locale={locale}
      weekStat={weekStat}
      getWeekStatProcessing={getWeekStatProcessing}
      pickupRewardDispatch={pickupRewardDispatch}
      pickupRewardProcessing={pickupRewardProcessing}
      ids={ids}
    />
  </React.Fragment>
);

View.propTypes = {
  userId: PropTypes.string,
  locale: PropTypes.string,
  account: PropTypes.string,
  balance: PropTypes.string,
  weekStat: PropTypes.array,
  ids: PropTypes.array,
  getWeekStatProcessing: PropTypes.bool,
  pickupRewardDispatch: PropTypes.func,
  pickupRewardProcessing: PropTypes.bool,
};

export default React.memo(View);
