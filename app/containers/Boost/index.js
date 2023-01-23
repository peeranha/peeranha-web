import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import {
  makeSelectAccount,
  makeSelectAccountLoading,
  makeSelectAvailableBalance,
  makeSelectBalance,
} from 'containers/AccountProvider/selectors';
import Seo from 'components/Seo';
import NotFound from 'containers/ErrorPage';
import { STATE_KEY } from './constants';

import reducer from './reducer';
import saga from './saga';
import { getWeekStat, changeStake } from './actions';
import * as selectors from './selectors';

import View from './View';

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
  loading,
}) => {
  const { t } = useTranslation();

  if (!account && !loading) {
    return (
      <div>
        <NotFound withSeo={false} />
      </div>
    );
  }

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
          title={t('boost.title')}
          description={t('boost.description')}
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
  loading: PropTypes.bool,
};

export default memo(
  compose(
    injectReducer({ key: STATE_KEY, reducer }),
    injectSaga({
      key: STATE_KEY,
      saga,
      disableEject: true,
    }),
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
        loading: makeSelectAccountLoading(),
      }),
      dispatch => ({
        getWeekStatDispatch: bindActionCreators(getWeekStat, dispatch),
        changeStakeDispatch: bindActionCreators(changeStake, dispatch),
      }),
    ),
  )(Boost),
);
