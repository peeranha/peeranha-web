import { call, put, takeLatest } from 'redux-saga/effects';

import { pinnedArticleMenuDraft } from 'pages/Documentation/actions';
import { getDocumentationMenu } from 'utils/queries/ethereumService';
import { GET_DOCUMENTATION_MENU } from 'containers/AppWrapper/constants';
import { ASK_QUESTION_SUCCESS } from 'containers/AskQuestion/constants';

import {
  getDocumentationMenuSuccess,
  getDocumentationMenuError,
  setPinnedItemMenu,
} from './actions';

type CommunityDocumentationMenu = {
  documentationJson: string;
};

export function* getDocumentationMenuWorker(props: { communityId: number }): Generator<any> {
  try {
    const documentation = props.communityId
      ? yield call(getDocumentationMenu, props.communityId)
      : undefined;
    if (!documentation) {
      yield put(setPinnedItemMenu({ id: '', title: '' }));
      yield put(getDocumentationMenuSuccess([]));
      return;
    }

    const documentationMenu = JSON.parse(
      (documentation as CommunityDocumentationMenu).documentationJson,
    );

    const clearDocumentationMenu = documentationMenu.documentations.filter(
      (item) => item.id !== '' && item.title !== '',
    );

    yield put(setPinnedItemMenu(documentationMenu.pinnedPost));
    yield put(pinnedArticleMenuDraft(documentationMenu.pinnedPost));
    yield put(getDocumentationMenuSuccess(clearDocumentationMenu));
  } catch (err) {
    yield put(getDocumentationMenuError(err));
  }
}

export default function* (): Generator<any> {
  try {
    yield takeLatest([GET_DOCUMENTATION_MENU, ASK_QUESTION_SUCCESS], getDocumentationMenuWorker);
  } catch (error) {}
}
