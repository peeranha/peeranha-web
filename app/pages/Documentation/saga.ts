import { takeLatest, call, put, select } from 'redux-saga/effects';
import { getCommunityDocumentation } from 'utils/theGraph';
import { getDocumentationError, getDocumentationSuccess } from './actions';
import { GET_DOCUMENTATION } from './constants';

import { selectDocumentation } from './selectors';

type DocumentationSection = {
  id: number;
  postType: number;
  communityId: number;
  title: string;
  content: string;
  isDeleted: boolean;
};

export function* getDocumentationSectionWorker(props: {
  section: number;
}): Generator<any> {
  try {
    const documentationFromStore = yield select(selectDocumentation());
    if (
      (documentationFromStore as Array<DocumentationSection>).find(
        (documentationSection: DocumentationSection) =>
          documentationSection.id === props.section,
      )
    ) {
      yield put(getDocumentationSuccess());
    } else {
      // Rewrite after documentation architecture change
      // Will need to get content from ipfs
      const documentationSection = yield call(
        getCommunityDocumentation,
        props.section,
      );
      yield put(getDocumentationSuccess(documentationSection));
    }
  } catch (err) {
    yield put(getDocumentationError(err));
  }
}

export default function*() {
  // @ts-ignore
  yield takeLatest(GET_DOCUMENTATION, getDocumentationSectionWorker);
}
