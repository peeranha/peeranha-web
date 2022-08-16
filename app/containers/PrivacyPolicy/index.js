import React from 'react';
import { useTranslation } from 'react-i18next';
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

import Header from './Header';
import { SECTION_ID } from './constants';
import privacyPolicyEn from '../../privacy-policy/en.md';
import privacyPolicyRu from '../../privacy-policy/ru.md';

export const PrivacyPolicy = ({ locale }) => {
  const { t } = useTranslation();
  const privacyPolicy = parseMD(
    locale === 'en' ? privacyPolicyEn : privacyPolicyRu,
  );

  return (
    <div className="d-flex justify-content-center">
      <Seo
        title={t('common.privacyPolicyDesc.title')}
        description={t('common.privacyPolicyDesc.description')}
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
          collapsedMenu={false}
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
