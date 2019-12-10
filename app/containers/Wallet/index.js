/**
 *
 * Wallet
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translationMessages } from 'i18n';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  makeSelectAccount,
  makeSelectBalance,
} from 'containers/AccountProvider/selectors';

import Seo from 'components/Seo';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import * as selectors from './selectors';

import { getWeekStat, pickupReward } from './actions';

import View from './View';

/* eslint-disable react/prefer-stateless-function */
export class Wallet extends React.PureComponent {
  componentDidMount() {
    if (this.props.account) {
      this.props.getWeekStatDispatch();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.account && this.props.account) {
      this.props.getWeekStatDispatch();
    }
  }

  render() /* istanbul ignore next */ {
    const userId = this.props.match.params.id;

    const {
      locale,
      account,
      balance,
      weekStat,
      getWeekStatProcessing,
      pickupRewardDispatch,
      pickupRewardProcessing,
      ids,
    } = this.props;

    return (
      <div>
        <Seo
          title={translationMessages[locale][messages.title.id]}
          description={translationMessages[locale][messages.description.id]}
          language={locale}
          index={false}
        />

        <View
          userId={userId}
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
  }
}

Wallet.propTypes = {
  balance: PropTypes.string,
  locale: PropTypes.string,
  account: PropTypes.string,
  match: PropTypes.object,
  getWeekStatDispatch: PropTypes.func,
  pickupRewardDispatch: PropTypes.func,
  weekStat: PropTypes.array,
  ids: PropTypes.array,
  getWeekStatProcessing: PropTypes.bool,
  pickupRewardProcessing: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  account: makeSelectAccount(),
  balance: makeSelectBalance(),
  weekStat: selectors.selectWeekStat(),
  getWeekStatProcessing: selectors.selectGetWeekStatProcessing(),
  pickupRewardProcessing: selectors.selectPickupRewardProcessing(),
  ids: selectors.selectIds(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    getWeekStatDispatch: bindActionCreators(getWeekStat, dispatch),
    pickupRewardDispatch: bindActionCreators(pickupReward, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'wallet', reducer });
const withSaga = injectSaga({ key: 'wallet', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Wallet);
