import React, { memo, useEffect } from 'react';
import { translationMessages } from 'i18n';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import * as routes from 'routes-config';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getQuestionCode, getSectionCode } from 'utils/mdManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import Seo from 'components/Seo';
import AsideBox from 'components/Base/Aside';

import Content from 'containers/Faq/Content';
import Aside from 'containers/Faq/Aside';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { getPrivacyPolicy } from './actions';

import Header from './Header';
import { SECTION_ID } from './constants';

export const PrivacyPolicy = ({
  locale,
  privacyPolicy,
  getPrivacyPolicyDispatch,
}) => {
  useEffect(() => {
    getPrivacyPolicyDispatch();
  }, []);

  const translations = translationMessages[locale];

  if (!privacyPolicy) return null;

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
          route={(x) => routes.privacyPolicy(getSectionCode(SECTION_ID, x))}
        />
      </AsideBox>
    </div>
  );
};

PrivacyPolicy.propTypes = {
  getPrivacyPolicyDispatch: PropTypes.func,
  locale: PropTypes.string,
  privacyPolicy: PropTypes.object,
};

export default memo(
  compose(
    injectReducer({ key: 'privacyPolicy', reducer }),
    injectSaga({ key: 'privacyPolicy', saga }),
    connect(
      createStructuredSelector({
        locale: makeSelectLocale(),
        privacyPolicy: selectors.selectPrivacyPolicy(),
      }),
      (dispatch) => ({
        getPrivacyPolicyDispatch: bindActionCreators(
          getPrivacyPolicy,
          dispatch,
        ),
      }),
    ),
  )(PrivacyPolicy),
);
