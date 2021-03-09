import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import { bindActionCreators } from 'redux';
import { translationMessages } from 'i18n';

import { makeSelectLocale } from './selectors';
import { changeLocale } from './actions';

export const LanguageProvider = ({
  children,
  locale,
  messages,
  changeLocaleDispatch,
}) => {
  useEffect(() => {
    const projectLangs = Object.keys(translationMessages);
    const storedLocale = localStorage.getItem('locale');

    if (storedLocale) {
      changeLocaleDispatch(storedLocale);
    } else {
      // find the first suitable language in window.navigator.languages
      const userLocale = window.navigator.languages
        .find(lang => projectLangs.includes(lang.slice(0, 2)))
        ?.slice(0, 2);

      if (userLocale) {
        changeLocaleDispatch(userLocale);
      }
    }
  }, []);

  return (
    <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
};

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element,
  changeLocaleDispatch: PropTypes.func,
};

export default connect(
  createStructuredSelector({
    locale: makeSelectLocale(),
  }),
  dispatch => ({
    changeLocaleDispatch: bindActionCreators(changeLocale, dispatch),
  }),
)(LanguageProvider);
