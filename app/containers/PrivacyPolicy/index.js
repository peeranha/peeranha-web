import React from 'react';
import { translationMessages } from 'i18n';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import * as routes from 'routes-config';

import { getQuestionCode, getSectionCode, parseMD } from 'utils/mdManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import Seo from 'components/Seo';
import AsideBox from 'components/Base/Aside';

import Content from 'containers/Faq/Content';
import Aside from 'containers/Faq/Aside';

import messages from './messages';

import Header from './Header';
import { SECTION_ID } from './constants';
import privacyPolicyEn from '../../privacy-policy/en.md';
import privacyPolicyRu from '../../privacy-policy/ru.md';

export const PrivacyPolicy = ({ locale }) => {
  const translations = translationMessages[locale];
  const privacyPolicy = parseMD(
    locale === 'en' ? privacyPolicyEn : privacyPolicyRu,
  );

  return (
    <div className="d-flex justify-content-center">
      <Seo
        title={translations[messages.title.id]}
        description={translations[messages.description.id]}
        language={locale}
        index={false}
      />

      <div className="flex-grow-1">
        <Header />
        <Content
          content={privacyPolicy}
          route={routes.privacyPolicy}
          getSectionCode={getSectionCode.bind(null, SECTION_ID)}
          getQuestionCode={getQuestionCode.bind(null, SECTION_ID)}
        />
      </div>

      <AsideBox className="d-none d-xl-block">
        <Aside
          content={privacyPolicy}
          route={x => routes.privacyPolicy(getSectionCode(SECTION_ID, x))}
        />
      </AsideBox>
    </div>
  );
};

PrivacyPolicy.propTypes = {
  locale: PropTypes.string,
};

const enhance = compose(
  connect(
    createStructuredSelector({
      locale: makeSelectLocale(),
    }),
    null,
  ),
);

export default enhance(PrivacyPolicy);
