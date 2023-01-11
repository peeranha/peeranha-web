import { takeEvery, call, put, select } from 'redux-saga/effects';
import { getIpfsHashFromBytes32, getText } from 'utils/ipfs';

import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { selectEthereum } from 'containers/EthereumProvider/selectors';
import { selectPinnedArticleDraft, selectDocumentation } from './selectors';
import { updateDocumentationTree } from 'utils/questionsManagement';
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

export function* getArticleDocumentationWorker({
  articleId,
}: {
  articleId: string;
}): Generator<any> {
  try {
    const documentationFromStore = yield select(selectDocumentation());
    const ipfsHash = getIpfsHashFromBytes32(articleId);
    if (
      (documentationFromStore as Array<DocumentationArticle>).find(
        (item) => item.id === articleId,
      )
    ) {
      yield put(getArticleDocumentationSuccess());
    } else {
      const documentationArticle = yield call(getText, ipfsHash);

      yield put(
        getArticleDocumentationSuccess({
          id: articleId,
          ...JSON.parse(documentationArticle as string),
        }),
      );
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
