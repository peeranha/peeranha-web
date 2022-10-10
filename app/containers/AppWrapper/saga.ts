import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getDocumentationMenuSuccess,
  getDocumentationMenuError,
} from './actions';
import {
  getCommunityDocumentationNotIncluded,
  getDocumentationMenu,
} from 'utils/theGraph';
import { GET_DOCUMENTATION_MENU } from 'containers/AppWrapper/constants';
import { ASK_QUESTION_SUCCESS } from 'containers/AskQuestion/constants';
import { DocumentationSection } from 'containers/DocumentationPage/types';

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

    console.log('documentationMenu', documentationMenu);
    const { pinnedPost } = documentationMenu;
    pinnedPost.children = [];

    // Documentation tree to ids array
    // Remove after documentation architecture change
    const documentationTraversal = (
      documentationArray: Array<DocumentationSection>,
    ): any =>
      documentationArray.reduce(
        (acc: string | any[], documentationSection: DocumentationSection) => {
          if (documentationSection.children.length) {
            return acc
              .concat(documentationSection.id)
              .concat(documentationTraversal(documentationSection.children));
          }
          return acc.concat(documentationSection.id);
        },
        [],
      );

    // DocumentationPage type questions not included in the menu
    // Remove after documentation architecture change
    const menuIds = documentationTraversal(documentationMenu.documentations);

    const documentationNotIncluded: Array<{
      id: string;
      title: string;
    }> = yield call(
      getCommunityDocumentationNotIncluded,
      props.communityId,
      menuIds,
    );
    const notIncludedObject = documentationNotIncluded.length
      ? {
          id: documentationNotIncluded[0].id,
          title: 'Draft',
          children: documentationNotIncluded
            .slice(1)
            .map((documentationSection) => ({
              id: documentationSection.id,
              title: documentationSection.title,
              children: [],
            })),
        }
      : undefined;

    yield put(
      getDocumentationMenuSuccess(
        [...documentationMenu.documentations],
        notIncludedObject,
      ),
    );
  } catch (err) {
    yield put(getDocumentationMenuError(err));
  }
}

export default function* () {
  yield takeLatest(
    [GET_DOCUMENTATION_MENU, ASK_QUESTION_SUCCESS],
    getDocumentationMenuWorker,
  );
}
