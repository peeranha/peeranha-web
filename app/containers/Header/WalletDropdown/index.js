import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import * as routes from 'routes-config';
import messages from 'common-messages';

import Dropdown from 'components/Dropdown';
import A from 'components/A';
import Ul from 'components/Ul/SpecialOne';

import SendTokens from 'containers/SendTokens';

import {
  selectWeekStat,
  selectRewardsWeeksNumber,
  selectGetWeekStatProcessing,
} from 'containers/Wallet/selectors';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from 'containers/Wallet/reducer';
import saga from 'containers/Wallet/saga';

import { getWeekStat } from 'containers/Wallet/actions';

import NotificationIcon from './NotificationIcon';
import WalletButton from './WalletButton';

const isPositiveNumber = number => Number.isFinite(number) && number > 0;

const Menu = memo(({ user, number, locale }) => (
  <Ul>
    <A to={routes.userWallet(user)}>
      <FormattedMessage {...messages.wallet} />
      {isPositiveNumber(number) && (
        <NotificationIcon
          inline
          number={number}
          iconId="walletDropDownInline"
          locale={locale}
        />
      )}
    </A>
    <SendTokens>
      <FormattedMessage {...messages.sendTokens} />
    </SendTokens>
  </Ul>
));

const WalletDropdown = ({
  user,
  balance,
  locale,
  getWeekStatDispatch,
  rewardsWeeksNumber: number,
  account,
}) => {
  useEffect(
    () => {
      if (account) {
        getWeekStatDispatch();
      }
    },
    [account],
  );

  return (
    <div className="position-relative">
      <Dropdown
        id={`profile_id_${Math.random()}`}
        className="d-none d-md-flex mr-3 wallet-dropdown"
        button={<WalletButton balance={balance} locale={locale} />}
        menu={<Menu user={user} number={number} locale={locale} />}
      />
      {isPositiveNumber(number) && (
        <NotificationIcon
          mobile={false}
          number={number}
          iconId="WalletDropDown_NotificationIcon"
          locale={locale}
        />
      )}
    </div>
  );
};

Menu.propTypes = {
  user: PropTypes.string,
  balance: PropTypes.string,
  number: PropTypes.number,
};

WalletDropdown.propTypes = {
  user: PropTypes.string,
  balance: PropTypes.number,
  locale: PropTypes.string,
  getWeekStatDispatch: PropTypes.func,
  rewardsWeeksNumber: PropTypes.number,
  account: PropTypes.string,
};

export default memo(
  compose(
    injectReducer({ key: 'wallet', reducer }),
    injectSaga({ key: 'wallet', saga }),
    connect(
      createStructuredSelector({
        locale: makeSelectLocale(),
        weekStat: selectWeekStat(),
        rewardsWeeksNumber: selectRewardsWeeksNumber(),
        getWeekStatProcessing: selectGetWeekStatProcessing(),
        account: makeSelectAccount(),
      }),
      dispatch => ({
        getWeekStatDispatch: bindActionCreators(getWeekStat, dispatch),
      }),
    ),
  )(WalletDropdown),
);
