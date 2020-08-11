/**
 *
 * Tutorial
 *
 */

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
import Banner from 'components/AskQuestionBanner';

import Content from './Content';
import Aside from './Aside';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { getTutorial } from './actions';

import Header from './Header';
import { SECTION_ID } from './constants';

export const Tutorial = ({ locale, tutorial, getTutorialDispatch }) => {
  useEffect(() => {
    getTutorialDispatch();
  }, []);

  const translations = translationMessages[locale];

  if (!tutorial) return null;

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
          content={tutorial}
          route={routes.tutorial}
          getSectionCode={getSectionCode.bind(null, SECTION_ID)}
          getQuestionCode={getQuestionCode.bind(null, SECTION_ID)}
        />
        <Banner />
      </div>

      <AsideBox className="d-none d-xl-block">
        <Aside
          content={tutorial}
          route={x => routes.tutorial(getSectionCode(SECTION_ID, x))}
        />
      </AsideBox>
    </div>
  );
};

Tutorial.propTypes = {
  getTutorialDispatch: PropTypes.func,
  locale: PropTypes.string,
  tutorial: PropTypes.object,
};

export default memo(
  compose(
    injectReducer({ key: 'tutorial', reducer }),
    injectSaga({ key: 'tutorial', saga }),
    connect(
      createStructuredSelector({
        locale: makeSelectLocale(),
        tutorial: selectors.selectTutorial(),
      }),
      dispatch => ({
        getTutorialDispatch: bindActionCreators(getTutorial, dispatch),
      }),
    ),
  )(Tutorial),
);
