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

import { noAccess } from 'routes-config';

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

import { getWeekStat } from './actions';

import View from './View';

/* eslint-disable react/prefer-stateless-function */
export class Wallet extends React.PureComponent {
  componentDidMount() {
    this.props.getWeekStatDispatch();
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (!this.props.account) {
      this.props.history.push(noAccess());
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
  history: PropTypes.object,
  getWeekStatDispatch: PropTypes.func,
  weekStat: PropTypes.array,
  getWeekStatProcessing: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  account: makeSelectAccount(),
  balance: makeSelectBalance(),
  weekStat: selectors.selectWeekStat(),
  getWeekStatProcessing: selectors.selectGetWeekStatProcessing(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    getWeekStatDispatch: bindActionCreators(getWeekStat, dispatch),
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
