/**
 *
 * Faq
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { translationMessages } from 'i18n';
import { createStructuredSelector } from 'reselect';

import { getFAQ } from 'utils/faqManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { LEFT_MENU_WIDTH } from 'containers/App/constants';

import BaseTransparent from 'components/Base/BaseTransparent';

import messages from './messages';

import Header from './Header';
import Content from './Content';
import Aside from './Aside';
import Banner from './Banner';

const AsideWrapper = BaseTransparent.extend`
  flex: 0 0 ${LEFT_MENU_WIDTH}px;
`.withComponent('aside');

export const Faq = /* istanbul ignore next */ ({ locale }) => {
  const faq = getFAQ(locale);
  const translations = translationMessages[locale];

  return (
    <div className="d-flex justify-content-center">
      <Helmet>
        <title>{translations[messages.title.id]}</title>
        <meta
          name="description"
          content={translations[messages.description.id]}
        />
      </Helmet>

      <div className="flex-grow-1">
        <Header />

        <div className="my-3">
          <Content faq={faq} />
          <Banner />
        </div>
      </div>

      <AsideWrapper className="d-none d-xl-block pr-0">
        <Aside faq={faq} />
      </AsideWrapper>
    </div>
  );
};

Faq.propTypes = {
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

export default connect(
  mapStateToProps,
  null,
)(Faq);
