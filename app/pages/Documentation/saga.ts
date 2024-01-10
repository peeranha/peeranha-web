import { takeEvery, call, put, select } from 'redux-saga/effects';

import { getIpfsHashFromBytes32, getText } from 'utils/ipfs';
import { updateDocumentationTree } from 'utils/questionsManagement';
import { getPost } from 'utils/queries/ethereumService';
import { updateSuiDocumentationTree } from 'utils/sui/communityManagement';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { getNetwork, getActualId } from 'utils/properties';
import { isSuiBlockchain } from 'utils/constants';
import { waitForTransactionConfirmation } from 'utils/sui/sui';

import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { selectEthereum } from 'containers/EthereumProvider/selectors';
import { getDocumentationMenu } from 'containers/AppWrapper/actions';
import { Post } from 'containers/Search/SearchContent';
import { selectSuiWallet } from 'containers/SuiProvider/selectors';
import {
  transactionCompleted,
  transactionFailed,
  transactionInitialised,
  transactionInPending,
} from 'containers/EthereumProvider/actions';
import { clearSavedDrafts } from 'components/Documentation/helpers';

import { selectPinnedArticleDraft, selectDocumentation, selectDraftsIds } from './selectors';
import {
  getArticleDocumentationError,
  getArticleDocumentationSuccess,
  updateDocumentationMenuSuccess,
  updateDocumentationMenuFailed,
  toggleEditDocumentation,
} from './actions';
import { GET_ARTICLE, UPDATE_DOCUMENTATION_MENU } from './constants';
import { DocumentationArticle, DocumentationItemMenuType } from './types';

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
          getPost,
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
    const communityId = isSingleCommunityWebsite();

    const documentationJSON = {
      pinnedPost: pinnedArticle,
      documentations: menu,
    };

    if (isSuiBlockchain) {
      yield put(transactionInitialised());
      const wallet = yield select(selectSuiWallet());
      // @ts-ignore
      const txResult = yield call(
        updateSuiDocumentationTree,
        wallet,
        getActualId(communityId),
        documentationJSON,
      );

      yield put(transactionInPending(txResult.digest));
      yield call(waitForTransactionConfirmation, txResult.digest);
      yield put(transactionCompleted());
    } else {
      const ethereumService = yield select(selectEthereum);
      const selectedAccount = yield select(makeSelectAccount());
      yield call(
        updateDocumentationTree,
        selectedAccount,
        communityId,
        documentationJSON,
        ethereumService,
      );
    }
    yield put(updateDocumentationMenuSuccess());
    clearSavedDrafts();
    yield put(getDocumentationMenu(communityId));
  } catch (err) {
    console.warn('updateDocumentationWorker', err);
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
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
