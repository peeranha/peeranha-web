import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, compose, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { RouteComponentProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { DAEMON } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { css } from '@emotion/react';

import ViewContent from 'components/Documentation/components/ViewContent';
import Loader from 'components/Documentation/components/Loader';
import Seo from 'components/Seo';

import { redirectToEditQuestionPage } from 'containers/EditQuestion/actions';
import { getArticleDocumentation } from './actions';
import reducer from './reducer';
import saga from './saga';
import { selectDocumentation, selectDocumentationLoading } from './selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectDocumentationMenu } from 'containers/AppWrapper/selectors';
import {
  selectDocumentationMenu,
  selectPinnedItemMenu,
} from 'containers/AppWrapper/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import {
  DocumentationArticle,
  OutputSelector,
  RouterDocumentetion,
  DocumentationItemMenuType,
  PinnedArticleType,
} from './types';
import { getBytes32FromIpfsHash } from 'utils/ipfs';

interface DocumentationProps extends RouteComponentProps<RouterDocumentetion> {
  getArticleDocumentationDispatch: (id: string) => void;
  documentation: Array<DocumentationArticle>;
  isArticleLoading: boolean;
  pinnedItemMenu: PinnedArticleType;
  documentationMenu: Array<DocumentationItemMenuType>;
  locale: string;
}

export const DocumentationPage: React.FC<DocumentationProps> = ({
  match,
  getArticleDocumentationDispatch,
  documentation,
  isArticleLoading,
  pinnedItemMenu,
  documentationMenu,
  locale,
}) => {
  const { t } = useTranslation();
  const ipfsHash = pinnedItemMenu?.id || documentationMenu[0]?.id;
  const ipfsHasgBytes32 = match.params.sectionId
    ? getBytes32FromIpfsHash(match.params.sectionId)
    : ipfsHash;

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
    <>
      <Seo
        title={t('common.documentation')}
        description={t('common.description')}
        language={locale}
      />
      <div
        css={css`
          flex-grow: 1;
        `}
      >
        {isArticleLoading || !documentationSection ? (
          <Loader />
        ) : (
          <ViewContent documentationArticle={documentationSection} />
        )}
      </div>
    </>
  ) : null;
};

export default compose(
  injectReducer({ key: 'documentationReducer', reducer }),
  injectSaga({ key: 'documentationReducer', saga, mode: DAEMON }),

  connect(
    createStructuredSelector<any, OutputSelector>({
      documentation: selectDocumentation(),
      isArticleLoading: selectDocumentationLoading(),
      pinnedItemMenu: selectPinnedItemMenu(),
      documentationMenu: selectDocumentationMenu(),
      locale: makeSelectLocale(),
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
