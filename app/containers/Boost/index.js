import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translationMessages } from 'i18n';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { STATE_KEY } from './constants';

import messages from './messages';

import reducer from './reducer';
import saga from './saga';
import { getWeekStat, changeStake } from './actions';
import * as selectors from './selectors';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import {
  makeSelectAccount,
  makeSelectAvailableBalance,
  makeSelectBalance,
} from 'containers/AccountProvider/selectors';

import Seo from 'components/Seo';
import View from './View';
import NotFound from 'containers/ErrorPage';

const Boost = ({
  match: {
    params: { id },
  },
  locale,
  account,
  balance,
  availableBalance,
  weekStat,
  globalBoostStat,
  userBoostStat,
  getWeekStatDispatch,
  getWeekStatProcessing,
  changeStakeDispatch,
  changeStakeLoading,
}) => {
  if (!account) {
    return (
      <div>
        <NotFound withSeo={false} />
      </div>
    );
  }

  useEffect(() => {
    if (account) {
      getWeekStatDispatch();
    }
  }, [account]);

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
        weekStat={weekStat}
        globalBoostStat={globalBoostStat}
        userBoostStat={userBoostStat}
        getWeekStatProcessing={getWeekStatProcessing}
        changeStakeDispatch={changeStakeDispatch}
        changeStakeLoading={changeStakeLoading}
      />
    </div>
  );
};

Boost.propTypes = {
  balance: PropTypes.number,
  stakedInCurrentPeriod: PropTypes.number,
  stakedInNextPeriod: PropTypes.number,
  locale: PropTypes.string,
  account: PropTypes.string,
  match: PropTypes.object,
  weekStat: PropTypes.array,
  globalBoostStat: PropTypes.array,
  userBoostStat: PropTypes.array,
  getWeekStatDispatch: PropTypes.func,
  getWeekStatProcessing: PropTypes.bool,
  changeStakeDispatch: PropTypes.func,
  changeStakeLoading: PropTypes.bool,
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
        availableBalance: makeSelectAvailableBalance(),
        weekStat: selectors.selectWeekStat(),
        globalBoostStat: selectors.selectGlobalBoostStat(),
        userBoostStat: selectors.selectUserBoostStat(),
        getWeekStatProcessing: selectors.selectGetWeekStatProcessing(),
        changeStakeLoading: selectors.selectChangeStakeLoading(),
      }),
      (dispatch) => ({
        getWeekStatDispatch: bindActionCreators(getWeekStat, dispatch),
        changeStakeDispatch: bindActionCreators(changeStake, dispatch),
      }),
    ),
  )(Boost),
);
