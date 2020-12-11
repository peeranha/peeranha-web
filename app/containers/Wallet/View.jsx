import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { STATE_KEY } from "containers/Boost/constants";

import * as selectors from 'containers/Boost/selectors';
import reducer from 'containers/Boost/reducer';
import saga from 'containers/Boost/saga';
import { getWeekStat } from 'containers/Boost/actions';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import NavHeader from 'components/WalletNavigation';
import SubHeader from './SubHeader';
import Weeks from './Weeks';
import BoostBanner from './BoostBanner';

const View = ({
  userId,
  locale,
  account,
  balance,
  weekStat,
  userBoostStat,
  getWeekStatProcessing,
  getWeekStatDispatch,
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
  <>
    <NavHeader userId={userId} />
    
    <SubHeader account={account} balance={balance} />

    {(userBoostStat && !userBoostStat.length) && <BoostBanner userId={userId} />}

    <Weeks
      locale={locale}
      weekStat={weekStat}
      getWeekStatProcessing={getWeekStatProcessing}
      pickupRewardDispatch={pickupRewardDispatch}
      pickupRewardProcessing={pickupRewardProcessing}
      ids={ids}
    />
  </>
);}

View.propTypes = {
  userId: PropTypes.string,
  locale: PropTypes.string,
  account: PropTypes.string,
  balance: PropTypes.number,
  weekStat: PropTypes.array,
  userBoostStat: PropTypes.array,
  ids: PropTypes.array,
  getWeekStatProcessing: PropTypes.bool,
  getWeekStatDispatch: PropTypes.func,
  pickupRewardDispatch: PropTypes.func,
  pickupRewardProcessing: PropTypes.bool,
};

export default memo(
  compose(
    injectReducer({ key: STATE_KEY, reducer }),
    injectSaga({ key: STATE_KEY, saga }),
    connect(
      createStructuredSelector({
        userBoostStat: selectors.selectUserBoostStat(),
      }),
      dispatch => ({
        getWeekStatDispatch: bindActionCreators(getWeekStat, dispatch),
      }),
    ),
  )(View),
);
