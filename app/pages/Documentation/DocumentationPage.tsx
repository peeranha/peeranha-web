import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, compose, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { History } from 'history';
import { RouteComponentProps } from 'react-router-dom';

import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { DAEMON } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { css } from '@emotion/react';

import TextBlock from 'components/FormFields/TextBlock';
import * as routes from 'routes-config';
import { MediumImageStyled } from 'components/Img/MediumImage';
import H3 from 'components/H3';
import Wrapper from 'components/Header/Simple';
import ViewContent from 'components/Documentation/components/ViewContent';

import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { redirectToEditQuestionPage } from 'containers/EditQuestion/actions';
import { getDocumentation } from './actions';
import reducer from './reducer';
import saga from './saga';
import { selectDocumentation } from './selectors';
import { GET_DOCUMENTATION } from './constants';
import {
  DocumentationSection,
  OutputSelector,
  RouterDocumentetion,
} from './types';

import faqPageHeader from 'images/faqPageHeader.svg?inline';

interface DocumentationProps extends RouteComponentProps<RouterDocumentetion> {
  getDocumentationDispatch: (id: string) => {
    type: typeof GET_DOCUMENTATION;
    documentationSection: string;
  };
  documentation: Array<DocumentationSection>;
  history: History;
}

export const DocumentationPage: React.FC<DocumentationProps> = ({
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
  }, [match.params.sectionId, single, getDocumentationDispatch]);

  const documentationSection = documentation.find(
    (item) => item.id === match.params.sectionId,
  );

  useEffect(() => {
    if (documentationSection?.isDeleted) {
      history.push(routes.notFound());
    }
  }, [documentationSection, history]);

  if (!documentation) {
    return null;
  }

  return documentationSection && !documentationSection.isDeleted ? (
    <div
      css={css`
        flex-grow: 1;
      `}
    >
      <ViewContent
        faqPageHeader={faqPageHeader}
        documentationSection={documentationSection}
      />
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
)(DocumentationPage);
