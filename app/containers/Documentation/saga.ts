import { takeLatest, call, put, select } from 'redux-saga/effects';
import { getDocumentationError, getDocumentationSuccess } from './actions';
import { GET_DOCUMENTATION } from './constants';

import { getCommunityDocumentation } from 'utils/theGraph';
import { selectDocumentation } from 'containers/Documentation/selectors';

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
}): Generator<{}> {
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
