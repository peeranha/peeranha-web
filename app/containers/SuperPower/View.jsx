import React from 'react';
import PropTypes from 'prop-types';

import NavHeader from 'components/WalletNavigation';
import SubHeader from 'containers/Wallet/SubHeader';
import Weeks from './Weeks';

const View = ({
  userId,
  locale,
  account,
  balance,
  weekStat,
  getWeekStatProcessing,
}) => (
  <>
    <NavHeader userId={userId} />
    
    <SubHeader account={account} balance={balance} />

    <Weeks
      locale={locale}
      weekStat={weekStat}
      getWeekStatProcessing={getWeekStatProcessing}
    />
  </>
);

View.propTypes = {
  userId: PropTypes.string,
  locale: PropTypes.string,
  account: PropTypes.string,
  balance: PropTypes.number,
  weekStat: PropTypes.array,
  getWeekStatProcessing: PropTypes.bool,
};

export default React.memo(View);
