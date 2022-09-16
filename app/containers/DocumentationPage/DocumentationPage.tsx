import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { redirectToEditQuestionPage } from 'containers/EditQuestion/actions';
import { getDocumentation } from 'containers/DocumentationPage/actions';
import reducer from 'containers/DocumentationPage/reducer';
import saga from 'containers/DocumentationPage/saga';
import { selectDocumentation } from 'containers/DocumentationPage/selectors';
import React, { useEffect } from 'react';
// @ts-ignore
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, compose, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';

import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { DAEMON } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { css } from '@emotion/react';

import TextBlock from 'components/FormFields/TextBlock';
import * as routes from 'routes-config';

// @ts-ignore
import faqPageHeader from 'images/faqPageHeader.svg?inline';
import { MediumImageStyled } from 'components/Img/MediumImage';
import H3 from 'components/H3';
import Wrapper  from 'components/Header/Simple';
import { DocumentationSection, OutputSelector } from 'containers/DocumentationPage/types';

type DocumentationProps = {
  match: {params: {sectionId: string}};
  getDocumentationDispatch: Function;
  documentation: Array<DocumentationSection>;
  history: { push: Function };
};

export const DocumentationPage: React.FC<DocumentationProps> = /* istanbul ignore next */ ({
   match,
   getDocumentationDispatch,
   documentation,
   history,
 }) => {
  const single = isSingleCommunityWebsite();

  useEffect(() => {
    if (single) {
      getDocumentationDispatch(match.params.sectionId);
    }
  }, [match.params.sectionId]);

  const documentationSection = documentation.find((documentationSection => documentationSection.id === match.params.sectionId));
  if (!documentation) {
    return null;
  }

  if (documentationSection && documentationSection.isDeleted) {
    history.push(routes.notFound());
  }

  return (documentationSection && !documentationSection.isDeleted) ? (
    <div css={css`flex-grow: 1`}>
      <Wrapper className="mb-to-sm-0 mb-from-sm-3">
        <H3>
          <MediumImageStyled src={faqPageHeader} alt="documentation-header" />
          <span className="d-none d-md-inline-block">
           {documentationSection?.title}
          </span>
        </H3>
      </Wrapper>

      <Wrapper>
          <TextBlock content={documentationSection?.content} />
      </Wrapper>
    </div>
  ) : null;
};

export default compose(
  injectReducer({ key: 'documentationReducer', reducer }),
  injectSaga({ key: 'documentationReducer', saga, mode: DAEMON }),
  connect(
    createStructuredSelector<any, OutputSelector>({
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
// @ts-ignore
)(DocumentationPage);
