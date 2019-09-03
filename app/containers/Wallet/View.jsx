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
}) => (
  <React.Fragment>
    <NavHeader userId={userId} />
    <SubHeader account={account} balance={balance} />
    <Weeks
      locale={locale}
      weekStat={weekStat}
      getWeekStatProcessing={getWeekStatProcessing}
    />
  </React.Fragment>
);

View.propTypes = {
  userId: PropTypes.string,
  locale: PropTypes.string,
  account: PropTypes.string,
  balance: PropTypes.string,
  weekStat: PropTypes.array,
  getWeekStatProcessing: PropTypes.bool,
};

export default React.memo(View);
