import { takeEvery, call, put, select } from 'redux-saga/effects';
import { getIpfsHashFromBytes32, getText } from 'utils/ipfs';
import { updateDocumentationTree } from 'utils/questionsManagement';
import { getQuestionFromGraph } from 'utils/theGraph';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { selectEthereum } from 'containers/EthereumProvider/selectors';
import { selectPinnedArticleDraft, selectDocumentation } from './selectors';
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

export function* getArticleDocumentationWorker({
  articleId,
}: {
  articleId: string;
}): Generator<any> {
  try {
    const documentationArticleFromGraph = yield call(
      getQuestionFromGraph,
      articleId,
    );
    yield put(
      getArticleDocumentationSuccess({
        id: articleId,
        title: (documentationArticleFromGraph as Post).title,
        content: (documentationArticleFromGraph as Post).content,
        lastmod: (documentationArticleFromGraph as Post).lastmod,
      }),
    );
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
