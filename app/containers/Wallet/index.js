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
import { compose } from 'redux';

import { noAccess } from 'routes-config';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';

import Seo from 'components/Seo';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import View from './View';

/* eslint-disable react/prefer-stateless-function */
export class Wallet extends React.PureComponent {
  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (!this.props.account) {
      this.props.history.push(noAccess());
    }
  }

  render() {
    const userId = this.props.match.params.id;

    const { locale, account } = this.props;

    return (
      <div>
        <Seo
          title={translationMessages[locale][messages.title.id]}
          description={translationMessages[locale][messages.description.id]}
          language={locale}
          index={false}
        />

        <View userId={userId} locale={locale} account={account} />
      </div>
    );
  }
}

Wallet.propTypes = {
  locale: PropTypes.string,
  account: PropTypes.string,
  match: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  account: makeSelectAccount(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
