import { takeLatest, call, put, select } from 'redux-saga/effects';
import { getCommunityDocumentation } from 'utils/theGraph';
import { saveText, getText } from 'utils/ipfs';
import { getDocumentationError, getDocumentationSuccess } from './actions';
import { GET_DOCUMENTATION, SAVE_ARTICLE_TO_IPFS } from './constants';

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

export function* saveArticleToIpfsWorker({ title, content }): Generator<any> {
  try {
    const ipfsHash = yield saveText(JSON.stringify(profile));
  } catch (err) {
    // yield put(getDocumentationError(err));
  }
}

export default function* () {
  // @ts-ignore
  yield takeLatest(GET_DOCUMENTATION, getDocumentationSectionWorker);
  yield takeLatest(SAVE_ARTICLE_TO_IPFS, saveArticleToIpfsWorker);
}
