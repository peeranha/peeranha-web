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

import { TEXT_SECONDARY } from 'style-constants';

import { appLocales } from 'i18n';
import * as routes from 'routes-config';

import createdHistory from 'createdHistory';
import commonMessages from 'common-messages';

import { changeLocale } from 'containers/LanguageProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import Span from 'components/Span';
import Dropdown from 'components/Dropdown';

import { Flag, Li } from './Styled';

/* eslint global-require: 0 */
export const ChangeLocale = ({ locale, changeLocaleDispatch }) => {
  function setLocale(newLocale) {
    localStorage.setItem('locale', newLocale);

    const path = window.location.pathname + window.location.hash;

    // ReactIntl && Redux Saga conflict => redirect solution
    createdHistory.push(routes.preloaderPage());
    changeLocaleDispatch(newLocale);
    setTimeout(() => createdHistory.push(path), 0);
  }

  return (
    <Dropdown
      className="mr-3"
      button={
        <React.Fragment>
          <Span
            className="d-flex align-items-center mr-1"
            fontSize="16"
            lineHeight="20"
            color={TEXT_SECONDARY}
          >
            <Flag src={require(`images/${[locale]}_lang.png`)} alt="country" />
            <FormattedMessage {...commonMessages[locale]} />
          </Span>
        </React.Fragment>
      }
      menu={
        <ul>
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
      }
      id="choose-language-dropdown"
      isArrowed
    />
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
