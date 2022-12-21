import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, compose, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { DAEMON } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { map, getFlatDataFromTree } from 'react-sortable-tree';
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
import {
  selectDocumentationMenu,
  selectPinnedItemMenu,
} from 'containers/AppWrapper/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import Header from './components/Header';
import Button from 'common-components/Button';

import DocumentationMenu from 'containers/LeftMenu/Documentation/Documentation';
import DraftsMenu from './components/Drafts/Drafts';
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
import { styles } from 'components/Documentation/components/Drafts/Drafts.styled';

import RiseUpIcon from 'icons/RiseUp';
import { translationMessages } from 'i18n';
import messages from 'common-messages';

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
  pinnedItemMenu,
  draftsIds,
  locale,
}): JSX.Element => {
  const refOverlay = useRef<HTMLDivElement>(null);
  const [paddingLeft, setPaddingLeft] = useState<number>(86);

  const treeArray = getFlatDataFromTree({
    treeData: documentationMenu?.map((node) => ({ ...node })),
    getKey: (node) => node.id,
    getNodeKey: ({ treeIndex }) => treeIndex,
    ignoreCollapsed: false,
  });
  const currentArrayIndex = treeArray.filter(
    (item) => item?.node.id == viewArticleId,
  )[0]?.treeIndex;
  const sliceTitle = (title: string): string =>
    title?.length < 26 ? title : title?.substr(0, 25) + '...';

  const isStartArticle = currentArrayIndex < 1;
  const isLastArticle = currentArrayIndex == treeArray.length - 1;

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
    document.querySelector('body').classList.remove('scroll-disabled');
    document.querySelector('body').style = '';
  };

  const saveDocumentationMenu = () => {
    updateDocumentationMenuDispatch(documentationMenuDraft);
    toggleEditDocumentation();
    document.querySelector('body').classList.remove('scroll-disabled');
    document.querySelector('body').style = '';
  };

  const onClickAddArticle = () => {
    setEditArticleDispatch({
      id: '',
      parentId: '1',
      isEditArticle: true,
    });
  };

  const onClickArticle = (id: string): void => {
    if (
      typeof setViewArticleDispatch === 'function' &&
      typeof setEditArticleDispatch === 'function'
    ) {
      setViewArticleDispatch(id);
      setEditArticleDispatch({
        id: id,
        parentId: '1',
        isEditArticle: false,
      });
    }
  };
  const onClickPrevArticle = (): void => {
    const prevArrayId = treeArray.filter(
      (item) => item?.treeIndex == currentArrayIndex - 1,
    )[0]?.node.id;
    onClickArticle(prevArrayId);
  };

  const onClickNextArticle = (): void => {
    const nextArrayId = treeArray.filter(
      (item) => item?.treeIndex == currentArrayIndex + 1,
    )[0]?.node.id;
    onClickArticle(nextArrayId);
  };

  const onClickNextTitle = (): string => {
    const nextTitle = treeArray.filter(
      (item) => item?.treeIndex == currentArrayIndex + 1,
    )[0]?.node.title;
    return sliceTitle(nextTitle);
  };

  const onClickPrevTitle = (): string => {
    const prevTitle = treeArray.filter(
      (item) => item?.treeIndex == currentArrayIndex - 1,
    )[0]?.node.title;
    return sliceTitle(prevTitle);
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
          document.querySelector('body').classList.add('scroll-disabled'),
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
          <div
            css={{
              ...styled.leftSection,
              ...styled.scroll,
            }}
          >
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
              pinnedItemMenuId={pinnedItemMenu.id}
            />
          </div>
          <div
            css={{
              ...styled.centerSection,
              ...styled.scroll,
            }}
          >
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
            <div
              className="df aic jcc full-width mb16 fww"
              css={{ '@media (min-width: 768px)': { flexWrap: 'nowrap' } }}
            >
              {!isStartArticle && (
                <div>
                  <Button
                    variant="third"
                    icon={<RiseUpIcon className="icon" stroke="#A5BCFF" />}
                    className="df aic mr16"
                    css={{
                      border: '1px solid #A5BCFF',
                      color: '#A5BCFF',
                      justifyContent: `${
                        isLastArticle ? 'space-between' : 'flex-start'
                      }`,
                      textAlign: 'start',
                      width: `${isLastArticle ? '700px' : '300px'} !important`,
                      height: '60px',
                      '@media (max-width: 768px)': { marginRight: '0px' },
                    }}
                    onClick={onClickPrevArticle}
                  >
                    <div css={{ color: 'rgba(136 153 168 / 50%);' }}>
                      {
                        translationMessages[locale][
                          messages.documentationPrev.id
                        ]
                      }
                    </div>
                    <div>{onClickPrevTitle()}</div>
                  </Button>
                </div>
              )}

              {!isLastArticle && (
                <div>
                  <Button
                    variant="third"
                    icon={
                      <RiseUpIcon
                        className="icon"
                        stroke="#A5BCFF"
                        css={{ transform: 'rotate(180deg)' }}
                      />
                    }
                    className="df aic ml16"
                    css={{
                      border: '1px solid #A5BCFF',
                      color: '#A5BCFF',
                      justifyContent: `${
                        isStartArticle ? 'space-between' : 'flex-start'
                      }`,
                      textAlign: 'start',
                      width: `${isStartArticle ? '700px' : '300px'} !important`,
                      height: '60px',
                      '@media (max-width: 768px)': { margin: '10px 0px' },
                    }}
                    onClick={onClickNextArticle}
                  >
                    <div css={{ color: 'rgba(136 153 168 / 50%);' }}>
                      {
                        translationMessages[locale][
                          messages.documentationNext.id
                        ]
                      }
                    </div>
                    <div>{onClickNextTitle()}</div>
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div
            css={{
              ...styled.rightSection,
              ...styled.scroll,
            }}
          >
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
      pinnedItemMenu: selectPinnedItemMenu(),
      draftsIds: selectDraftsIds(),
      locale: makeSelectLocale(),
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
