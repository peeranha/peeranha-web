/**
 *
 * Faq
 *
 */
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { selectFaq } from 'containers/DataCacheProvider/selectors';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translationMessages } from 'i18n';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import * as routes from 'routes-config';
import { isSingleCommunityWebsite } from 'utils/communityManagement';

import { getSectionCode, getQuestionCode } from 'utils/mdManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import Seo from 'components/Seo';
import AsideBox from 'components/Base/Aside';
import Banner from 'components/AskQuestionBanner';
import {
  getPermissions,
  hasCommunityModeratorRole,
  hasGlobalModeratorRole,
} from 'utils/properties';

import messages from 'containers/Faq/messages';

import Header from './Header';
import Content from './Content';
import Aside from './Aside';
import { SECTION_ID } from 'containers/Faq/constants';

export const Faq = /* istanbul ignore next */ ({
  locale,
  profileInfo,
  faq,
}) => {
  const single = isSingleCommunityWebsite();

  const isCommunityModerator = single
    ? hasCommunityModeratorRole(getPermissions(profileInfo), single)
    : false;

  if (!single) {
    faq.blocks.splice(7, 3);
    faq.blocks.splice(1, 1);
  }
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
        <Content
          content={faq}
          route={routes.faq}
          getSectionCode={getSectionCode.bind(null, SECTION_ID)}
          getQuestionCode={getQuestionCode.bind(null, SECTION_ID)}
          isCommunityModerator={isCommunityModerator}
        />
        <Banner />
      </div>

      <AsideBox className="d-none d-xl-block">
        <Aside
          content={faq}
          route={x => routes.faq(getSectionCode(SECTION_ID, x))}
        />
      </AsideBox>
    </div>
  );
};

Faq.propTypes = {
  locale: PropTypes.string,
  faq: PropTypes.object,
};

export default compose(
  connect(
    createStructuredSelector({
      locale: makeSelectLocale(),
      profileInfo: makeSelectProfileInfo(),
      faq: selectFaq(),
    }),
  ),
)(Faq);
