import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, compose, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { DAEMON } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { keyframes } from '@emotion/react';
import {
  getDocumentation,
  setEditDocumentation,
} from 'pages/Documentation/actions';
import reducer from 'pages/Documentation/reducer';
import saga from 'pages/Documentation/saga';
import {
  DocumentationSection,
  OutputSelector,
  RouterDocumentetion,
} from 'pages/Documentation/types';
import { selectDocumentation } from 'pages/Documentation/selectors';
import Header from './components/Header';

import DocumentationMenu from 'containers/LeftMenu/Documentation/Documentation';
import DocumentationForm from './components/DocumentationForm';

const animationDocumentation = (screenWidth) =>
  keyframes({
    '0%': {
      left: '100%',
    },
    '80%': {
      left: screenWidth + 50,
    },
    '90%': {
      left: screenWidth + 100,
    },
    '95%': {
      left: screenWidth + 75,
    },
    '100%': {
      left: screenWidth + 86,
    },
  });

const EditDocumentation: React.FC<any> = ({
  documentationMenu,
  toggleEditDocumentation,
  editArticleId,
  getDocumentationDispatch,
  documentation,
  setEditDocumentationDispatch,
}) => {
  const refOverlay = useRef<HTMLDivElement>(null);
  const [paddingLeft, setPaddingLeft] = useState<number>(86);

  useEffect(() => {
    if (refOverlay?.current) {
      setPaddingLeft((refOverlay.current.offsetWidth - 1366) / 2);
    }
  }, [refOverlay]);

  useEffect(() => {
    if (editArticleId !== '') {
      getDocumentationDispatch(editArticleId);
    }
  }, [editArticleId]);

  const documentationArticle = documentation.find(
    (item) => item.id === editArticleId,
  );

  console.log('documentationSection', documentationArticle);
  return (
    <>
      {document.querySelector('header') &&
        ReactDOM.createPortal(
          <div
            ref={refOverlay}
            css={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 100,
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.4)',
            }}
          />,
          document.querySelector('header'),
        )}
      <div
        css={{
          color: '#282828',
          position: 'fixed',
          top: 0,
          height: '100vh',
          zIndex: 101,
          background: 'var(--color-white)',
          animation: `${animationDocumentation(
            paddingLeft,
          )} 1s ease-in forwards`,
          width:
            refOverlay?.current &&
            refOverlay?.current.clientWidth - paddingLeft - 86,
          boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Header toggleEditDocumentation={toggleEditDocumentation} />
        <section
          className="dg"
          css={{
            height: '100%',
            gridTemplateColumns: '262px 1fr 262px',
            boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div
            css={{
              background: '#FAFAFA',
              height: 'calc(100% - 72px)',
              overflow: 'auto',
            }}
          >
            <DocumentationMenu
              documentationMenu={documentationMenu}
              isModeratorModeSingleCommunity
              match={{ params: { sectionId: '' } }}
              isEditDocumentation
              editArticleId={editArticleId}
              isMenu={false}
              setEditDocumentation={setEditDocumentationDispatch}
            />
          </div>
          <div css={{ overflow: 'auto' }}>
            <DocumentationForm
              editArticleId={editArticleId}
              documentationMenu={documentationMenu}
              documentationArticle={documentationArticle}
            />
          </div>
          <div css={{ background: '#FAFAFA', height: '100%' }}></div>
        </section>
      </div>
    </>
  );
};

export default compose(
  injectReducer({ key: 'documentationReducer', reducer }),
  injectSaga({ key: 'documentationReducer', saga, mode: DAEMON }),

  connect(
    createStructuredSelector<any, OutputSelector>({
      documentation: selectDocumentation(),
    }),
    (dispatch: Dispatch<AnyAction>) => ({
      getDocumentationDispatch: bindActionCreators(getDocumentation, dispatch),
      setEditDocumentationDispatch: bindActionCreators(
        setEditDocumentation,
        dispatch,
      ),
    }),
  ),
)(EditDocumentation);
