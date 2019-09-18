/**
 *
 * PrivacyPolicy
 *
 */

import React from 'react';
import { translationMessages } from 'i18n';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import Seo from 'components/Seo';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { getPrivacyPolicy } from './actions';

import View from './View';

/* eslint-disable react/prefer-stateless-function */
export class PrivacyPolicy extends React.PureComponent {
  componentDidMount() {
    this.props.getPrivacyPolicyDispatch();
  }

  render() {
    const { locale, privacyPolicy } = this.props;
    const translations = translationMessages[locale];

    return (
      <div>
        <Seo
          title={translations[messages.title.id]}
          description={translations[messages.description.id]}
          language={locale}
          index={false}
        />

        <View privacyPolicy={privacyPolicy} />
      </div>
    );
  }
}

PrivacyPolicy.propTypes = {
  getPrivacyPolicyDispatch: PropTypes.func,
  locale: PropTypes.string,
  privacyPolicy: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  privacyPolicy: selectors.selectPrivacyPolicy(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    getPrivacyPolicyDispatch: bindActionCreators(getPrivacyPolicy, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'privacyPolicy', reducer });
const withSaga = injectSaga({ key: 'privacyPolicy', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PrivacyPolicy);
