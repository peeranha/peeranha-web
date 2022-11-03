/**
 *
 * Faq
 *
 */
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { redirectToEditQuestionPage } from 'containers/EditQuestion/actions';
import { getFaq } from 'containers/Faq/actions';
import reducer from 'containers/Faq/reducer';
import saga from 'containers/Faq/saga';
import { selectFaqList } from 'containers/Faq/selectors';
import { deleteAnswer, deleteQuestion } from 'containers/ViewQuestion/actions';
import viewQuestionReducer from 'containers/ViewQuestion/reducer';
import viewQuestionSaga from 'containers/ViewQuestion/saga';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translationMessages } from 'i18n';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import * as routes from 'routes-config';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { DAEMON } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { getSectionCode, getQuestionCode } from 'utils/mdManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectFaq } from 'containers/DataCacheProvider/selectors';

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
  getFaqDispatch,
  faqFromGraph,
  deleteQuestionDispatch,
  redirectToEditQuestionPageDispatch,
}) => {
  const single = isSingleCommunityWebsite();

  const isCommunityModerator = single
    ? hasCommunityModeratorRole(getPermissions(profileInfo), single)
    : false;

  let faqList;

  if (single) {
    faqList = faqFromGraph.blocks ? faqFromGraph : { blocks: [] };
  } else {
    faqList = faq;
  }

  if (!single) {
    faqList.blocks.splice(5, 5);
    faqList.blocks.splice(1, 1);
  }
  const translations = translationMessages[locale];
  const keywords = faqList.blocks.map(x => x.blocks.map(y => y.h3));

  useEffect(() => {
    if (single) {
      getFaqDispatch({ communityIdFilter: single });
    }
  }, []);

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
          content={faqList}
          route={routes.faq}
          getSectionCode={getSectionCode.bind(null, SECTION_ID)}
          getQuestionCode={getQuestionCode.bind(null, SECTION_ID)}
          isCommunityModerator={isCommunityModerator}
          editItem={
            isCommunityModerator
              ? [redirectToEditQuestionPageDispatch, routes.questionEdit]
              : [null, null]
          }
          deleteItem={isCommunityModerator ? deleteQuestionDispatch : null}
        />
        <Banner />
      </div>

      <AsideBox className="d-none d-xl-block">
        <Aside
          content={faqList}
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
  injectReducer({ key: 'faqReducer', reducer }),
  injectSaga({ key: 'faqReducer', saga, mode: DAEMON }),
  injectReducer({ key: 'viewQuestion', reducer: viewQuestionReducer }),
  injectSaga({
    key: 'viewQuestion',
    saga: viewQuestionSaga,
    disableEject: true,
  }),
  connect(
    createStructuredSelector({
      locale: makeSelectLocale(),
      profileInfo: makeSelectProfileInfo(),
      faq: selectFaq(),
      faqFromGraph: selectFaqList(),
    }),
    dispatch => ({
      getFaqDispatch: bindActionCreators(getFaq, dispatch),
      deleteQuestionDispatch: bindActionCreators(deleteQuestion, dispatch),
      redirectToEditQuestionPageDispatch: bindActionCreators(
        redirectToEditQuestionPage,
        dispatch,
      ),
    }),
  ),
)(Faq);
