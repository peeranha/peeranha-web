import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translationMessages } from 'i18n';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import {
  makeSelectAccount,
  makeSelectAvailableBalance,
  makeSelectBalance,
  makeSelectStakedInCurrentPeriod,
  makeSelectStakedInNextPeriod,
} from 'containers/AccountProvider/selectors';

import Seo from 'components/Seo';

import messages from './messages';
import * as selectors from './selectors';

import { pickupReward, getWeekStat } from './actions';

import View from './View';
import NotFound from '../ErrorPage';
import { checkUserURL } from '../../utils/accountManagement';

const Wallet = ({
  match: {
    params: { id },
  },
  locale,
  account,
  balance,
  availableBalance,
  stakedInCurrentPeriod,
  stakedInNextPeriod,
  weekStat,
  userBoostStat,
  getWeekStatDispatch,
  getWeekStatProcessing,
  pickupRewardDispatch,
  pickupRewardProcessing,
  ids,
}) => {
  useEffect(
    () => {
      if (account) {
        getWeekStatDispatch();
      }
    },
    [account],
  );

  if (!account || !checkUserURL(account)) {
    return (
      <div>
        <NotFound withSeo={false} />
      </div>
    );
  }

  return (
    <div>
      {process.env.ENV !== 'dev' && (
        <Seo
          title={translationMessages[locale][messages.title.id]}
          description={translationMessages[locale][messages.description.id]}
          language={locale}
          index={false}
        />
      )}

      <View
        userId={id}
        locale={locale}
        account={account}
        balance={balance}
        availableBalance={availableBalance}
        stakedInCurrentPeriod={stakedInCurrentPeriod}
        stakedInNextPeriod={stakedInNextPeriod}
        weekStat={weekStat}
        userBoostStat={userBoostStat}
        getWeekStatProcessing={getWeekStatProcessing}
        pickupRewardDispatch={pickupRewardDispatch}
        pickupRewardProcessing={pickupRewardProcessing}
        ids={ids}
      />
    </div>
  );
};

Wallet.propTypes = {
  balance: PropTypes.number,
  stakedInCurrentPeriod: PropTypes.number,
  stakedInNextPeriod: PropTypes.number,
  locale: PropTypes.string,
  account: PropTypes.string,
  match: PropTypes.object,
  pickupRewardDispatch: PropTypes.func,
  weekStat: PropTypes.array,
  userBoostStat: PropTypes.array,
  ids: PropTypes.array,
  getWeekStatDispatch: PropTypes.func,
  getWeekStatProcessing: PropTypes.bool,
  pickupRewardProcessing: PropTypes.bool,
};

export default memo(
  compose(
    /*
    * reducer and saga injections are produced in WalletDropdown container
    */
    connect(
      createStructuredSelector({
        locale: makeSelectLocale(),
        account: makeSelectAccount(),
        balance: makeSelectBalance(),
        availableBalance: makeSelectAvailableBalance(),
        stakedInCurrentPeriod: makeSelectStakedInCurrentPeriod(),
        stakedInNextPeriod: makeSelectStakedInNextPeriod(),
        weekStat: selectors.selectWeekStat(),
        userBoostStat: selectors.selectUserBoostStat(),
        getWeekStatProcessing: selectors.selectGetWeekStatProcessing(),
        pickupRewardProcessing: selectors.selectPickupRewardProcessing(),
        ids: selectors.selectIds(),
      }),
      dispatch => ({
        pickupRewardDispatch: bindActionCreators(pickupReward, dispatch),
        getWeekStatDispatch: bindActionCreators(getWeekStat, dispatch),
      }),
    ),
  )(Wallet),
);
