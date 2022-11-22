import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, compose, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { RouteComponentProps } from 'react-router-dom';

import { DAEMON } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { css } from '@emotion/react';

import ViewContent from 'components/Documentation/components/ViewContent';
import Loader from 'components/Documentation/components/Loader';

import { redirectToEditQuestionPage } from 'containers/EditQuestion/actions';
import { getArticleDocumentation } from './actions';
import reducer from './reducer';
import saga from './saga';
import { selectDocumentation, selectDocumentationLoading } from './selectors';
import {
  DocumentationArticle,
  OutputSelector,
  RouterDocumentetion,
} from './types';
import { getBytes32FromIpfsHash } from 'utils/ipfs';

interface DocumentationProps extends RouteComponentProps<RouterDocumentetion> {
  getArticleDocumentationDispatch: (id: string) => void;
  documentation: Array<DocumentationArticle>;
  isArticleLoading: boolean;
}

export const DocumentationPage: React.FC<DocumentationProps> = ({
  match,
  getArticleDocumentationDispatch,
  documentation,
  isArticleLoading,
}) => {
  const ipfsHasgBytes32 = getBytes32FromIpfsHash(match.params.sectionId);

  useEffect(() => {
    getArticleDocumentationDispatch(ipfsHasgBytes32);
  }, [ipfsHasgBytes32, getArticleDocumentationDispatch]);

  const documentationSection = documentation.find(
    (item) => item.id === ipfsHasgBytes32,
  );

  if (!documentation) {
    return null;
  }

  return documentationSection?.id !== '' ? (
    <div
      css={css`
        flex-grow: 1;
      `}
    >
      {isArticleLoading ? (
        <Loader />
      ) : (
        <ViewContent documentationArticle={documentationSection} />
      )}
    </div>
  ) : null;
};

export default compose(
  injectReducer({ key: 'documentationReducer', reducer }),
  injectSaga({ key: 'documentationReducer', saga, mode: DAEMON }),

  connect(
    createStructuredSelector<any, OutputSelector>({
      documentation: selectDocumentation(),
      isArticleLoading: selectDocumentationLoading(),
    }),
    (dispatch: Dispatch<AnyAction>) => ({
      getArticleDocumentationDispatch: bindActionCreators(
        getArticleDocumentation,
        dispatch,
      ),
      redirectToEditQuestionPageDispatch: bindActionCreators(
        redirectToEditQuestionPage,
        dispatch,
      ),
    }),
  ),
)(DocumentationPage);
