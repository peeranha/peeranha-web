import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects';
import { getCommunityDocumentation } from 'utils/theGraph';
import { saveText, getText } from 'utils/ipfs';

import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { selectEthereum } from 'containers/EthereumProvider/selectors';
import { updateDocumentationTree } from 'utils/questionsManagement';
import {
  getDocumentationError,
  getDocumentationSuccess,
  updateDocumentationMenuSuccess,
  updateDocumentationMenuFailed,
} from './actions';
import { GET_DOCUMENTATION, UPDATE_DOCUMENTATION_MENU } from './constants';

import { selectDocumentation } from './selectors';

type DocumentationSection = {
  id: number;
  postType: number;
  communityId: number;
  title: string;
  content: string;
  isDeleted: boolean;
};

export function* getDocumentationSectionWorker({ section }): Generator<any> {
  try {
    const documentationFromStore = yield select(selectDocumentation());
    if (
      (documentationFromStore as Array<DocumentationSection>).find(
        (documentationSection: DocumentationSection) =>
          documentationSection.id === section,
      )
    ) {
      yield put(getDocumentationSuccess());
    } else {
      const documentationSection = yield call(getText, section);

      yield put(
        getDocumentationSuccess({
          id: section,
          ...JSON.parse(documentationSection),
        }),
      );
    }
  } catch (err) {
    yield put(getDocumentationError(err));
  }
}

export function* updateDocumentationWorker(documentationMenu): Generator<any> {
  try {
    console.log('updateDocumentationWorker', documentationMenu);
    const ethereumService = yield select(selectEthereum);
    console.log('updateDocumentationWorker2', ethereumService);
    const selectedAccount = yield select(makeSelectAccount());

    console.log('updateDocumentationWorker3', selectedAccount);
    const communityId = isSingleCommunityWebsite();

    const documentationJSON = {
      pinnedId: '',
      documentations: documentationMenu,
    };

    console.log('documentationJSON', documentationJSON);

    // const result = yield call(
    //   updateDocumentationTree,
    //   selectedAccount,
    //   communityId,
    //   documentationJSON,
    //   ethereumService,
    // );

    console.log('result', result);

    // updateDocumentationMenuSuccess();
  } catch (err) {
    console.log('result err', err);
    // updateDocumentationMenuFailed();
  }
}

export default function* documentationWorker(): Generator<any> {
  try {
    yield takeLatest(GET_DOCUMENTATION, getDocumentationSectionWorker);
    yield takeEvery(UPDATE_DOCUMENTATION_MENU, updateDocumentationWorker);
  } catch (error) {}
}
