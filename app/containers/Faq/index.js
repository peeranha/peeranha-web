/**
 *
 * Faq
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translationMessages } from 'i18n';
import { createStructuredSelector } from 'reselect';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectFaq } from 'containers/DataCacheProvider/selectors';
import { LEFT_MENU_WIDTH } from 'containers/App/constants';

import Seo from 'components/Seo';
import BaseTransparent from 'components/Base/BaseTransparent';

import messages from './messages';

import Header from './Header';
import Content from './Content';
import Aside from './Aside';
import Banner from './Banner';

const AsideWrapper = BaseTransparent.extend`
  flex: 0 0 ${LEFT_MENU_WIDTH}px;
`.withComponent('aside');

export const Faq = /* istanbul ignore next */ ({ locale, faq }) => {
  const translations = translationMessages[locale];
  const keywords = faq.blocks.map(x => x.blocks.map(y => y.h3));

  return (
    <div className="d-flex justify-content-center">
      <Seo
        title={translations[messages.title.id]}
        description={translations[messages.description.id]}
        language={locale}
        keywords={keywords}
      />

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
  faq: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  faq: selectFaq(),
});

export default connect(
  mapStateToProps,
  null,
)(Faq);
