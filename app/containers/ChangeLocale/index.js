/**
 *
 * ChangeLocale
 *
 */

import React from 'react';
import { translationMessages } from 'i18n';

import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import createdHistory from 'createdHistory';
import commonMessages from 'common-messages';

import { setCookie } from 'utils/cookie';

import { APP_LOCALE } from 'containers/LanguageProvider/constants';
import { changeLocale } from 'containers/LanguageProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import ChangeLocalePopup from './ChangeLocalePopup';
import ChangeLocaleDropdown from './ChangeLocaleDropdown';

/* eslint global-require: 0 */
export const ChangeLocale = ({ locale, changeLocaleDispatch, isDesktop }) => {
  function setLocale(newLocale) {
    setCookie({
      name: APP_LOCALE,
      value: newLocale,
      options: { neverExpires: true, defaultPath: true, allowSubdomains: true },
    });

    const path = window.location.pathname + window.location.hash;

    changeLocaleDispatch(newLocale);
    setTimeout(() => createdHistory.push(path), 0);
  }

  if (process.env.MULTI_LANG === 'false') return null;

  return (
    <>
      {!isDesktop && (
        <ChangeLocalePopup
          setLocale={setLocale}
          locale={locale}
          title={
            translationMessages[locale][commonMessages.changeLocaleTitle.id]
          }
        />
      )}
      {isDesktop && (
        <ChangeLocaleDropdown setLocale={setLocale} locale={locale} />
      )}
    </>
  );
};

ChangeLocale.propTypes = {
  changeLocaleDispatch: PropTypes.func,
  locale: PropTypes.string,
  isDesktop: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

export function mapDispatchToProps(dispatch) {
  return {
    changeLocaleDispatch: bindActionCreators(changeLocale, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ChangeLocale);
