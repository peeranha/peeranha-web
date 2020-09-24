import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translationMessages } from 'i18n';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  makeSelectAccount,
  makeSelectBalance,
} from 'containers/AccountProvider/selectors';

import Seo from 'components/Seo';

import messages from './messages';
import * as selectors from './selectors';

import { pickupReward, getWeekStat } from './actions';

import View from './View';

const Wallet = ({
  match: {
    params: { id },
  },
  locale,
  account,
  balance,
  weekStat,
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
        weekStat={weekStat}
        getWeekStatProcessing={getWeekStatProcessing}
        pickupRewardDispatch={pickupRewardDispatch}
        pickupRewardProcessing={pickupRewardProcessing}
        ids={ids}
      />
    </div>
  );
};

Wallet.propTypes = {
  balance: PropTypes.string,
  locale: PropTypes.string,
  account: PropTypes.string,
  match: PropTypes.object,
  pickupRewardDispatch: PropTypes.func,
  weekStat: PropTypes.array,
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
        weekStat: selectors.selectWeekStat(),
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
