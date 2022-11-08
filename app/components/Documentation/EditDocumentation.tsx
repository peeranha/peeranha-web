import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, compose, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { DAEMON } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  getArticleDocumentation,
  saveMenuDraft,
  updateDocumentationMenu,
  setEditArticle,
  setViewArticle,
  pinnedArticleMenuDraft,
  removeArticle,
  saveDraftsIds,
} from 'pages/Documentation/actions';
import reducer from 'pages/Documentation/reducer';
import saga from 'pages/Documentation/saga';
import { OutputSelector } from 'pages/Documentation/types';
import {
  selectDocumentation,
  selectDocumentationMenuDraft,
  selectDocumentationLoading,
  selectEditArticle,
  selectViewArticle,
  selectDraftsIds,
} from 'pages/Documentation/selectors';
import { selectDocumentationMenu } from 'containers/AppWrapper/selectors';
import Header from './components/Header';

import DocumentationMenu from 'containers/LeftMenu/Documentation/Documentation';
import DraftsMenu from './components/RightMenu/Drafts/Drafts';
import DocumentationForm from './components/DocumentationForm';
import ViewContent from './components/ViewContent';
import LoaderDocumentation from './components/Loader';
import Empty from './components/Empty';
import {
  getSavedDrafts,
  saveDraft,
  animationDocumentation,
  clearSavedDrafts,
  getSavedDraftsIds,
} from './helpers';
import { EditDocumentationProps } from './types';
import { styled } from './EditDocumentation.styled';

const EditDocumentation: React.FC<EditDocumentationProps> = ({
  documentationMenu,
  toggleEditDocumentation,
  editArticle,
  getArticleDocumentationDispatch,
  documentation,
  setEditArticleDispatch,
  saveMenuDraftDispatch,
  saveDraftsIdsDispatch,
  documentationMenuDraft,
  updateDocumentationMenuDispatch,
  isArticleLoading,
  viewArticleId,
  setViewArticleDispatch,
  pinnedArticleMenuDraftDispatch,
  removeArticleDispatch,
  draftsIds,
}): JSX.Element => {
  const refOverlay = useRef<HTMLDivElement>(null);
  const [paddingLeft, setPaddingLeft] = useState<number>(86);

  useEffect(() => {
    if (refOverlay?.current) {
      setPaddingLeft((refOverlay.current.offsetWidth - 1366) / 2);
    }
  }, [refOverlay]);

  useEffect(() => {
    if (editArticle.id !== '' || viewArticleId !== '') {
      getArticleDocumentationDispatch(editArticle.id || viewArticleId);
    }
  }, [editArticle.isEditArticle, viewArticleId]);

  useEffect(() => {
    const drafts = getSavedDrafts();
    const savedDraftsIds = getSavedDraftsIds();

    if (drafts.length === 0) {
      saveDraft(documentationMenu);
      saveMenuDraftDispatch(documentationMenu);
    } else {
      saveMenuDraftDispatch(drafts);
    }

    saveDraftsIdsDispatch(savedDraftsIds);

    if (documentationMenu.length > 0) {
      setViewArticleDispatch(documentationMenu[0].id);
    }
  }, []);

  const editDocumentationArticle = documentation.find(
    (item) => item.id === editArticle.id,
  );

  const viewDocumentationArticle = documentation.find(
    (item) => item.id === viewArticleId,
  );

  const toggleEditDocumentationHandler = () => {
    toggleEditDocumentation();
    setEditArticleDispatch({
      id: '',
      parentId: '',
      isEditArticle: false,
    });
    setViewArticleDispatch('');
  };

  const saveDocumentationMenu = () => {
    updateDocumentationMenuDispatch(documentationMenuDraft);
    toggleEditDocumentation();
  };

  const onClickAddArticle = () => {
    setEditArticleDispatch({
      id: '',
      parentId: '1',
      isEditArticle: true,
    });
  };

  const discardDrafts = () => {
    toggleEditDocumentation();
    clearSavedDrafts();
    setEditArticleDispatch({
      id: '',
      parentId: '',
      isEditArticle: false,
    });
    setViewArticleDispatch('');
  };

  return (
    <>
      {document.querySelector('header') &&
        ReactDOM.createPortal(
          <div ref={refOverlay} css={styled.background} />,
          document.querySelector('header'),
        )}
      <div
        css={{
          ...styled.container,
          animation: `${animationDocumentation(
            paddingLeft,
          )} 1s ease-in forwards`,
          width:
            refOverlay?.current &&
            refOverlay?.current.clientWidth - paddingLeft - 86,
        }}
      >
        <Header
          toggleEditDocumentation={toggleEditDocumentationHandler}
          saveDocumentationMenu={saveDocumentationMenu}
          discardDrafts={discardDrafts}
        />
        <section className="dg" css={styled.main}>
          <div css={styled.leftSection}>
            <DocumentationMenu
              documentationMenu={documentationMenuDraft}
              isModeratorModeSingleCommunity
              match={{ params: { sectionId: '' } }}
              isEditDocumentation
              editArticle={editArticle}
              isMenu={false}
              setEditArticle={setEditArticleDispatch}
              setViewArticle={setViewArticleDispatch}
              pinnedArticleMenuDraft={pinnedArticleMenuDraftDispatch}
              removeArticle={removeArticleDispatch}
            />
          </div>
          <div css={styled.centerSection}>
            {!editArticle.isEditArticle &&
              (viewArticleId === '' || documentationMenuDraft.length === 0) && (
                <Empty onClickAddArticle={onClickAddArticle} />
              )}
            {isArticleLoading ? (
              <LoaderDocumentation />
            ) : (
              <>
                {!editArticle.isEditArticle && viewArticleId !== '' && (
                  <ViewContent
                    documentationArticle={viewDocumentationArticle}
                    isEditDocumentation
                  />
                )}
                {editArticle.isEditArticle && (
                  <DocumentationForm
                    documentationMenu={documentationMenuDraft}
                    documentationArticle={editDocumentationArticle}
                    articleParentId={editArticle.parentId}
                    isEditArticle={
                      editArticle.isEditArticle && editArticle.id !== ''
                    }
                    updateDocumentationMenuDraft={saveMenuDraftDispatch}
                    setEditArticle={setEditArticleDispatch}
                    setViewArticle={setViewArticleDispatch}
                    updateDraftsIds={saveDraftsIdsDispatch}
                  />
                )}
              </>
            )}
          </div>
          <div css={styled.rightSection}>
            <DraftsMenu
              draftsMenu={documentationMenuDraft}
              setEditArticle={setEditArticleDispatch}
              setViewArticle={setViewArticleDispatch}
              draftsIds={draftsIds}
            />
          </div>
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
      isArticleLoading: selectDocumentationLoading(),
      editArticle: selectEditArticle(),
      viewArticleId: selectViewArticle(),
      draftsIds: selectDraftsIds(),
    }),
    (dispatch: Dispatch<AnyAction>) => ({
      getArticleDocumentationDispatch: bindActionCreators(
        getArticleDocumentation,
        dispatch,
      ),
      setEditArticleDispatch: bindActionCreators(setEditArticle, dispatch),
      saveMenuDraftDispatch: bindActionCreators(saveMenuDraft, dispatch),
      saveDraftsIdsDispatch: bindActionCreators(saveDraftsIds, dispatch),
      updateDocumentationMenuDispatch: bindActionCreators(
        updateDocumentationMenu,
        dispatch,
      ),
      setViewArticleDispatch: bindActionCreators(setViewArticle, dispatch),
      pinnedArticleMenuDraftDispatch: bindActionCreators(
        pinnedArticleMenuDraft,
        dispatch,
      ),
      removeArticleDispatch: bindActionCreators(removeArticle, dispatch),
    }),
  ),
)(EditDocumentation);
