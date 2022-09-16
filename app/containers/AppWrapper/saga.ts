import { call, put, takeEvery } from 'redux-saga/effects';
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
import { DocumentationSection } from 'components/QuestionForm/SubArticleForm';

type CommunityDocumentationMenu = {
  documentationJSON: string;
};

export function* getDocumentationMenuWorker(props: {
  communityId: number;
}): Generator<{}> {
  try {
    const documentation = yield call(getDocumentationMenu, props.communityId);
    const documentationMenu = JSON.parse(
      (documentation as CommunityDocumentationMenu).documentationJSON,
    );
    const pinnedPost = documentationMenu.pinnedPost;
    pinnedPost.children = [];

    const documentationTraversal = (
      documentationArray: Array<DocumentationSection>,
    ): any => {
      return documentationArray.reduce(
        (acc: string | any[], documentationSection: DocumentationSection) => {
          if (documentationSection.children.length) {
            return acc
              .concat(documentationSection.id)
              .concat(documentationTraversal(documentationSection.children));
          } else return acc.concat(documentationSection.id);
        },
        [],
      );
    };

    //Documentation type questions not included in the menu
    //Remove after documentation architecture change
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
            .map(documentationSection => ({
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

export default function*() {
  // @ts-ignore
  yield takeEvery(
    [GET_DOCUMENTATION_MENU, ASK_QUESTION_SUCCESS],
    getDocumentationMenuWorker,
  );
}
