/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import { bindActionCreators } from 'redux';
import { translationMessages } from 'i18n';

import { makeSelectLocale } from './selectors';
import { changeLocale } from './actions';

/* eslint react/no-did-mount-set-state: 0 prefer-destructuring: 0  */
export class LanguageProvider extends React.PureComponent {
  componentWillMount() {
    const languages = Object.keys(translationMessages);
    let locale = localStorage.getItem('locale');

    // if (!locale) - find the first suitable language in window.navigator.languages
    if (!locale) {
      locale = window.navigator.languages.filter(x => languages.includes(x))[0];
    }

    if (locale) {
      this.props.changeLocaleDispatch(locale);
    }
  }

  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <IntlProvider
        locale={this.props.locale}
        key={this.props.locale}
        messages={this.props.messages[this.props.locale]}
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element,
  changeLocaleDispatch: PropTypes.func,
};

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale,
}));

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    changeLocaleDispatch: bindActionCreators(changeLocale, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageProvider);
