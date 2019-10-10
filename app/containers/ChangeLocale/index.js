/**
 *
 * ChangeLocale
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import { appLocales } from 'i18n';
import * as routes from 'routes-config';

import createdHistory from 'createdHistory';
import commonMessages from 'common-messages';

import { changeLocale } from 'containers/LanguageProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { Box, Flag, Li } from './Styled';

/* eslint global-require: 1 */

const ChangeLocale = ({ locale, changeLocaleDispatch }) => {
  function setLocale(newLocale) {
    localStorage.setItem('locale', newLocale);

    const { pathname } = window.location;

    // ReactIntl && Redux Saga conflict => redirect solution
    createdHistory.push(routes.errorPage());
    changeLocaleDispatch(newLocale);
    setTimeout(() => createdHistory.push(pathname), 0);
  }

  return (
    <Box className="dropdown">
      <button
        type="button"
        id="dropdownMenu1"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <Flag src={require(`images/${[locale]}_lang.png`)} alt="country" />
        <FormattedMessage {...commonMessages[locale]} />
        <span className="caret">▾</span>
      </button>

      <ul className="dropdown-menu p-0" aria-labelledby="dropdownMenu1">
        {appLocales.map(x => (
          <Li
            key={x}
            role="presentation"
            onClick={() => setLocale(x)}
            isBold={x === locale}
          >
            <Flag src={require(`images/${x}_lang.png`)} alt="language" />
            <FormattedMessage {...commonMessages[x]} />
          </Li>
        ))}
      </ul>
    </Box>
  );
};

ChangeLocale.propTypes = {
  changeLocaleDispatch: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    changeLocaleDispatch: bindActionCreators(changeLocale, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ChangeLocale);
