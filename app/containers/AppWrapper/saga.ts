import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getDocumentationMenuSuccess,
  getDocumentationMenuError,
} from './actions';
import { getDocumentationMenu } from 'utils/theGraph';
import { GET_DOCUMENTATION_MENU } from 'containers/AppWrapper/constants';
import { ASK_QUESTION_SUCCESS } from 'containers/AskQuestion/constants';

type CommunityDocumentationMenu = {
  documentationJSON: string;
};

export function* getDocumentationMenuWorker(props: {
  communityId: number;
}): Generator<any> {
  try {
    const documentation = yield call(getDocumentationMenu, props.communityId);
    const documentationMenu = JSON.parse(
      (documentation as CommunityDocumentationMenu).documentationJSON,
    );

    // console.log('documentationMenu', documentationMenu);
    // const { pinnedPost } = documentationMenu;
    // pinnedPost.children = [];

    // const documentationMenu = {
    //   documentations: [],
    //   pinnedPost: {
    //     id: '',
    //     title: '',
    //     children: [],
    //   },
    // };

    const clearDocumentationMenu = documentationMenu.documentations.filter(
      (item) => item.id !== '' && item.title !== '',
    );

    yield put(getDocumentationMenuSuccess(clearDocumentationMenu));
  } catch (err) {
    yield put(getDocumentationMenuError(err));
  }
}

export default function* (): Generator<any> {
  try {
    yield takeLatest(
      [GET_DOCUMENTATION_MENU, ASK_QUESTION_SUCCESS],
      getDocumentationMenuWorker,
    );
  } catch (error) {}
}
