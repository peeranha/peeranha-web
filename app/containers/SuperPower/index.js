import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translationMessages } from 'i18n';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { STATE_KEY } from "./constants";

import messages from './messages';

import reducer from './reducer';
import saga from './saga';
import { getWeekStat, changeBet } from './actions';
import * as selectors from './selectors';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import {
  makeSelectAccount,
  makeSelectBalance,
} from 'containers/AccountProvider/selectors';

import Seo from 'components/Seo';
import View from './View';

const SuperPower = ({
  match: {
    params: { id },
  },
  locale,
  account,
  balance,
  weekStat,
  getWeekStatDispatch,
  getWeekStatProcessing,
  changeBetDispatch,
  changeBetLoading,
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
        changeBetDispatch={changeBetDispatch}
        changeBetLoading={changeBetLoading}
      />
    </div>
  );
};

SuperPower.propTypes = {
  balance: PropTypes.number,
  locale: PropTypes.string,
  account: PropTypes.string,
  match: PropTypes.object,
  weekStat: PropTypes.array,
  getWeekStatDispatch: PropTypes.func,
  getWeekStatProcessing: PropTypes.bool,
  changeBetDispatch: PropTypes.func,
  changeBetLoading: PropTypes.bool,
};

export default memo(
  compose(
    injectReducer({ key: STATE_KEY, reducer }),
    injectSaga({ key: STATE_KEY, saga }),
    connect(
      createStructuredSelector({
        locale: makeSelectLocale(),
        account: makeSelectAccount(),
        balance: makeSelectBalance(),
        weekStat: selectors.selectWeekStat(),
        getWeekStatProcessing: selectors.selectGetWeekStatProcessing(),
        changeBetLoading: selectors.selectChangeBetLoading(),
      }),
      dispatch => ({
        getWeekStatDispatch: bindActionCreators(getWeekStat, dispatch),
        changeBetDispatch: bindActionCreators(changeBet, dispatch),
      }),
    ),
  )(SuperPower),
);
