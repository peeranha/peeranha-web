import { takeEvery, call, put, select } from 'redux-saga/effects';
import { getIpfsHashFromBytes32, getText } from 'utils/ipfs';
import { updateDocumentationTree } from 'utils/questionsManagement';
import { getQuestionFromGraph } from 'utils/theGraph';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { selectEthereum } from 'containers/EthereumProvider/selectors';
import { selectPinnedArticleDraft, selectDocumentation, selectDraftsIds } from './selectors';
import {
  getArticleDocumentationError,
  getArticleDocumentationSuccess,
  updateDocumentationMenuSuccess,
  updateDocumentationMenuFailed,
  toggleEditDocumentation,
} from './actions';
import { getDocumentationMenu } from 'containers/AppWrapper/actions';
import { GET_ARTICLE, UPDATE_DOCUMENTATION_MENU } from './constants';
import { clearSavedDrafts } from 'components/Documentation/helpers';
import { DocumentationArticle, DocumentationItemMenuType } from './types';
import { Post } from 'containers/Search/SearchContent';
import { getNetwork } from 'utils/properties';

const single = isSingleCommunityWebsite();

export function* getArticleDocumentationWorker({
  articleId,
}: {
  articleId: string;
}): Generator<any> {
  try {
    const documentationFromStore = yield select(selectDocumentation());
    const ipfsHash = getIpfsHashFromBytes32(articleId);
    if (
      (documentationFromStore as Array<DocumentationArticle>).find((item) => item.id === articleId)
    ) {
      yield put(getArticleDocumentationSuccess());
    } else {
      const draftsIds = yield select(selectDraftsIds());
      const editedPost = (draftsIds as Array<{ draftId: string; lastmod: string }>).find(
        (item) => item.draftId === articleId,
      );
      if (editedPost) {
        const documentationArticle = yield call(getText, ipfsHash);
        yield put(
          getArticleDocumentationSuccess({
            id: articleId,
            ...JSON.parse(documentationArticle as string),
            lastmod: editedPost?.lastmod,
          }),
        );
      } else {
        const documentationArticleFromGraph = yield call(
          getQuestionFromGraph,
          `${getNetwork(single) + 1}-${articleId}`,
        );
        yield put(
          getArticleDocumentationSuccess({
            id: articleId,
            title: (documentationArticleFromGraph as Post).title,
            content: (documentationArticleFromGraph as Post).content,
            lastmod: (documentationArticleFromGraph as Post)?.lastmod,
          }),
        );
      }
    }
  } catch (err) {
    yield put(getArticleDocumentationError(err));
  }
}

export function* updateDocumentationWorker({
  menu,
}: {
  menu: Array<DocumentationItemMenuType>;
}): Generator<any> {
  try {
    const pinnedArticle = yield select(selectPinnedArticleDraft());
    const ethereumService = yield select(selectEthereum);
    const selectedAccount = yield select(makeSelectAccount());
    const communityId = isSingleCommunityWebsite();

    const documentationJSON = {
      pinnedPost: pinnedArticle,
      documentations: menu,
    };

    yield call(
      updateDocumentationTree,
      selectedAccount,
      communityId,
      documentationJSON,
      ethereumService,
    );

    yield put(updateDocumentationMenuSuccess());
    clearSavedDrafts();
    yield put(getDocumentationMenu(communityId));
  } catch (err) {
    console.warn('updateDocumentationWorker', err);

    yield put(updateDocumentationMenuFailed());
    yield put(toggleEditDocumentation());
  }
}

export default function* documentationWorker(): Generator<any> {
  try {
    yield takeEvery(GET_ARTICLE, getArticleDocumentationWorker);
    yield takeEvery(UPDATE_DOCUMENTATION_MENU, updateDocumentationWorker);
  } catch (error) {}
}
