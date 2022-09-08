import { call, put, takeEvery } from 'redux-saga/effects';
import {
  getDocumentationMenuSuccess,
  getDocumentationMenuError,
} from './actions';
import { getDocumentationMenu } from 'utils/theGraph';
import { GET_DOCUMENTATION_MENU } from 'containers/AppWrapper/constants';

type CommunityDocumentation = {
  documentationJSON: string;
};

export function* getDocumentationMenuWorker(props: {
  communityId: number;
}): Generator<{}> {
  try {
    const documentation = yield call(getDocumentationMenu, props.communityId);
    const documentationMenu = JSON.parse(
      (documentation as CommunityDocumentation).documentationJSON,
    );

    const pinnedPost = documentationMenu.pinnedPost;
    pinnedPost.children = [];
    yield put(
      getDocumentationMenuSuccess([
        // pinnedPost,
        ...documentationMenu.documentations,
      ]),
    );
  } catch (err) {
    yield put(getDocumentationMenuError(err));
  }
}

export default function*() {
  // @ts-ignore
  yield takeEvery(GET_DOCUMENTATION_MENU, getDocumentationMenuWorker);
}
