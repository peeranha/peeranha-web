/**
 *
 * ChangeLocale
 *
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import { TEXT_SECONDARY } from 'style-constants';

import { appLocales } from 'i18n';
import * as routes from 'routes-config';

import createdHistory from 'createdHistory';

import { setCookie } from 'utils/cookie';

import { APP_LOCALE } from 'containers/LanguageProvider/constants';
import { changeLocale } from 'containers/LanguageProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import Span from 'components/Span';
import Dropdown from 'components/Dropdown';

import { Flag, Li } from './Styled';

/* eslint global-require: 0 */
export const ChangeLocale = ({ locale, changeLocaleDispatch, withTitle }) => {
  const { t } = useTranslation();

  function setLocale(newLocale) {
    setCookie({
      name: APP_LOCALE,
      value: newLocale,
      options: { neverExpires: true, defaultPath: true, allowSubdomains: true },
    });

    const path = window.location.pathname + window.location.hash;

    createdHistory.push(routes.preloaderPage());
    changeLocaleDispatch(newLocale);
    setTimeout(() => createdHistory.push(path), 0);
  }
  if (process.env.MULTI_LANG === 'false') return null;

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
            {withTitle && t(`common.${locale}`)}
          </Span>
        </React.Fragment>
      }
      menu={
        <ul>
          {appLocales.map(item => (
            <Li
              key={item}
              role="presentation"
              onClick={() => setLocale(item)}
              isBold={item === locale}
            >
              <Flag src={require(`images/${item}_lang.png`)} alt="language" />
              {t(`common.${item}`)}
            </Li>
          ))}
        </ul>
      }
      id="choose-language-dropdown"
      isArrowed
      isMenuLabelMobile
      isArrowMarginMobile
    />
  );
};

ChangeLocale.propTypes = {
  changeLocaleDispatch: PropTypes.func,
  locale: PropTypes.string,
  withTitle: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

export function mapDispatchToProps(dispatch) {
  return {
    changeLocaleDispatch: bindActionCreators(changeLocale, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ChangeLocale);
