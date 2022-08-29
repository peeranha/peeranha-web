/**
 *
 * Faq
 *
 */
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { redirectToEditQuestionPage } from 'containers/EditQuestion/actions';
import { getDocumentation } from 'containers/Documentation/actions';
import reducer from 'containers/Documentation/reducer';
import saga from 'containers/Documentation/saga';
import { selectDocumentation } from 'containers/Documentation/selectors';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, compose, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';

import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { DAEMON } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import Banner from 'components/AskQuestionBanner';
import {
  getPermissions,
  hasCommunityModeratorRole,
} from 'utils/properties';
import { css } from '@emotion/react';

type User = {
  id: string;
  avatar: string;
  displayName: string;
  ratings: Array<{ communityId: number; rating: number }>;
  company: string;
  position: string;
  location: string;
  about: string;
  creationTime: number;
  achievements: Array<{ id: number }>;
};

type DocumentationProps = {
  match: {params: {sectionId: number}};
  locale: string;
  profileInfo: User;
  getFaqDispatch: Function;
  deleteQuestionDispatch: Function;
  redirectToEditQuestionPageDispatch: Function;
  addModeratorDispatch: Function;
  getDocumentationDispatch: Function;
  documentation: Array<{ id: number, content: string }> | undefined;
};

export const Documentation: React.FC<DocumentationProps> = /* istanbul ignore next */ ({
   match,
   locale,
   profileInfo,
   getFaqDispatch,
   deleteQuestionDispatch,
   redirectToEditQuestionPageDispatch,
   getDocumentationDispatch,
   documentation,
 }) => {
  useEffect(() => {
    if (single) {
      getDocumentationDispatch(match.params.sectionId);
    }
  }, [match.params.sectionId]);

  if (!documentation) {
    return null;
  }

  const documentationSection = documentation.find((documentationSection => documentationSection.id === match.params.sectionId));

  const single = isSingleCommunityWebsite();

  const isCommunityModerator = single
    ? hasCommunityModeratorRole(getPermissions(profileInfo), single)
    : false;

  return (
    // prettier-ignore
    <div className='df jcc' css={css``}>
      <div className='flex-grow-1'>
        {/*<Header />*/}
        {documentationSection?.content}
        {/*<Content*/}
        {/*  content={[]}*/}
        {/*  route={routes.faq}*/}
        {/*  getSectionCode={getSectionCode.bind(null, SECTION_ID)}*/}
        {/*  getQuestionCode={getQuestionCode.bind(null, SECTION_ID)}*/}
        {/*  isCommunityModerator={isCommunityModerator}*/}
        {/*  editItem={*/}
        {/*    isCommunityModerator*/}
        {/*      ? [redirectToEditQuestionPageDispatch, routes.questionEdit]*/}
        {/*      : [null, null]*/}
        {/*  }*/}
        {/*  deleteItem={isCommunityModerator ? deleteQuestionDispatch : null}*/}
        {/*/>*/}
        <Banner />
      </div>
    </div>
  );
};

export default compose(
  injectReducer({ key: 'documentationReducer', reducer }),
  injectSaga({ key: 'documentationReducer', saga, mode: DAEMON }),
  connect(
    createStructuredSelector({
      locale: makeSelectLocale(),
      profileInfo: makeSelectProfileInfo(),
      documentation: selectDocumentation(),
    }),
    (dispatch: Dispatch<AnyAction>) => ({
      getDocumentationDispatch: bindActionCreators(getDocumentation, dispatch),
      redirectToEditQuestionPageDispatch: bindActionCreators(
        redirectToEditQuestionPage,
        dispatch,
      ),
    }),
  ),
)(Documentation);
// .prettier-ignore
