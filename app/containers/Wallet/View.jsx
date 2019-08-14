import React from 'react';

import NavHeader from 'components/WalletNavigation';
import SubHeader from './SubHeader';
import Weeks from './Weeks';

const View = ({ userId, locale, account }) => (
  <React.Fragment>
    <NavHeader userId={userId} />
    <SubHeader account={account} />
    <Weeks locale={locale} />
  </React.Fragment>
);

export default React.memo(View);
