import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import { bindActionCreators } from 'redux';
// import { translationMessages } from 'i18n';

import { makeSelectLocale } from './selectors';
import { changeLocale } from './actions';

export const LanguageProvider = ({
  children,
  locale,
  messages,
  // changeLocaleDispatch,
}) => (
  /* useEffect(() => {
    const languages = Object.keys(translationMessages);
    let locale = localStorage.getItem('locale');
    // find the first suitable language in window.navigator.languages
    if (!locale) {
      locale = window.navigator.languages.filter(x => languages.includes(x))[0];
    } else {
      changeLocaleDispatch(locale)
    }
  }, []) */

  <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
    {children}
  </IntlProvider>
);

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element,
  // changeLocaleDispatch: PropTypes.func,
};

export default connect(
  createStructuredSelector({
    locale: makeSelectLocale(),
  }),
  dispatch => ({
    changeLocaleDispatch: bindActionCreators(changeLocale, dispatch),
  }),
)(LanguageProvider);
