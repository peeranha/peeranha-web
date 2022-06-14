import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import styled from 'styled-components';

import * as routes from 'routes-config';
import messages from 'common-messages';

import { BG_WARNING_LIGHT, TEXT_LIGHT } from 'style-constants';

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
import { REWARD_CLAIMING_ENABLED } from '../../../utils/constants';

export const BoostPrediction = styled.span`
  padding: 3px 6px 3.5px;
  margin-left: 5px;
  font-size: 14px;
  color: ${TEXT_LIGHT};
  line-height: 1;
  background-color: ${BG_WARNING_LIGHT};
  border-radius: 10px;
`;

const isPositiveNumber = number => Number.isFinite(number) && number > 0;

const Menu = memo(({ user, number, locale, boost }) => {
  return (
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
      {REWARD_CLAIMING_ENABLED && (
        <A to={routes.userBoost(user)}>
          <FormattedMessage id={messages.boost.id} />
          {boost > 1 && <BoostPrediction>{boost}</BoostPrediction>}
        </A>
      )}

      {/*<SendTokens>*/}
      {/*  <FormattedMessage {...messages.sendTokens} />*/}
      {/*</SendTokens>*/}
    </Ul>
  );
});

const WalletDropdown = ({
  user,
  balance,
  boost,
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
        className="d-none d-md-flex mr-1 wallet-dropdown"
        button={
          <WalletButton balance={balance} locale={locale} isBoost={boost > 1} />
        }
        menu={
          <Menu user={user} number={number} locale={locale} boost={boost} />
        }
      />
      {isPositiveNumber(number) && (
        <NotificationIcon
          isMobileVersion={false}
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
  boost: PropTypes.object,
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
