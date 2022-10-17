import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, compose, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { DAEMON } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  getDocumentation,
  setEditDocumentation,
  saveMenuDraft,
  viewArticle,
} from 'pages/Documentation/actions';
import reducer from 'pages/Documentation/reducer';
import saga from 'pages/Documentation/saga';
import {
  DocumentationSection,
  OutputSelector,
  RouterDocumentetion,
} from 'pages/Documentation/types';
import {
  selectDocumentation,
  selectDocumentationMenuDraft,
} from 'pages/Documentation/selectors';
import { updateDocumentationMenuDraft } from 'containers/AppWrapper/actions';
import { selectDocumentationMenu } from 'containers/AppWrapper/selectors';
import Header from './components/Header';

import DocumentationMenu from 'containers/LeftMenu/Documentation/Documentation';
import DocumentationForm from './components/DocumentationForm';
import ViewContent from './components/ViewContent';
import {
  addArticle,
  getSavedDrafts,
  updateMenuDraft,
  animationDocumentation,
} from './helpers';

const EditDocumentation: React.FC<any> = ({
  documentationMenu,
  toggleEditDocumentation,
  editArticle,
  getDocumentationDispatch,
  documentation,
  setEditDocumentationDispatch,
  updateDocumentationMenuDraftDispatch,
  saveMenuDraftDispatch,
  documentationMenuDraft,
  viewArticleDispatch,
}) => {
  const refOverlay = useRef<HTMLDivElement>(null);
  const [paddingLeft, setPaddingLeft] = useState<number>(86);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (refOverlay?.current) {
      setPaddingLeft((refOverlay.current.offsetWidth - 1366) / 2);
    }
  }, [refOverlay]);

  useEffect(() => {
    if (editArticle.id !== '') {
      getDocumentationDispatch(editArticle.id);
    }
  }, [editArticle.id]);

  useEffect(() => {
    if (editArticle.id !== '') {
      getDocumentationDispatch(editArticle.id);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const drafts = getSavedDrafts();
    let copyDocumentationMenu = [...documentationMenu];

    drafts.forEach((draft) => {
      if (draft.id === draft.prevId) {
        copyDocumentationMenu = addArticle(copyDocumentationMenu, draft);
      } else {
        copyDocumentationMenu = updateMenuDraft(copyDocumentationMenu, draft);
      }
    });

    saveMenuDraftDispatch(copyDocumentationMenu);

    setIsLoading(false);
  }, []);

  console.log('documentation', documentationMenuDraft);

  const documentationArticle = documentation.find(
    (item) => item.id === editArticle.id,
  );

  console.log('documentationSection', editArticle, documentationArticle);

  const toggleEditDocumentationHandler = () => {
    toggleEditDocumentation();
    saveMenuDraftDispatch(documentationMenu);
  };

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
        <Header toggleEditDocumentation={toggleEditDocumentationHandler} />
        <section
          className="dg"
          css={{
            height: '100%',
            gridTemplateColumns: '262px 1fr',
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
              documentationMenu={documentationMenuDraft}
              isModeratorModeSingleCommunity
              match={{ params: { sectionId: '' } }}
              isEditDocumentation
              editArticle={editArticle}
              isMenu={false}
              setEditDocumentation={setEditDocumentationDispatch}
              viewArticle={viewArticleDispatch}
            />
          </div>
          <div css={{ overflow: 'auto' }}>
            {/* {!editArticle?.parentId && !editArticle?.id && (
              <div
                css={{
                  padding: 24,
                  fontSize: 20,
                }}
              >
                {
                  "There aren't any articles yet. Would you like to add your first one?"
                }
              </div>
            )} */}
            {!editArticle?.parentId && editArticle?.id && (
              <ViewContent documentationSection={documentationArticle} />
            )}
            {editArticle?.parentId && !editArticle?.id && (
              <DocumentationForm
                documentationMenu={documentationMenuDraft}
                documentationArticle={documentationArticle}
                articleParentId={editArticle.parentId}
                updateDocumentationMenuDraft={
                  updateDocumentationMenuDraftDispatch
                }
                setEditDocumentation={setEditDocumentationDispatch}
              />
            )}
          </div>
          {/* <div css={{ background: '#FAFAFA', height: '100%' }}></div> */}
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
      documentationMenuDraft: selectDocumentationMenuDraft(),
      documentationMenu: selectDocumentationMenu(),
    }),
    (dispatch: Dispatch<AnyAction>) => ({
      getDocumentationDispatch: bindActionCreators(getDocumentation, dispatch),
      setEditDocumentationDispatch: bindActionCreators(
        setEditDocumentation,
        dispatch,
      ),
      updateDocumentationMenuDraftDispatch: bindActionCreators(
        updateDocumentationMenuDraft,
        dispatch,
      ),
      saveMenuDraftDispatch: bindActionCreators(saveMenuDraft, dispatch),
      viewArticleDispatch: bindActionCreators(viewArticle, dispatch),
    }),
  ),
)(EditDocumentation);
