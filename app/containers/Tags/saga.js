import { put, takeLatest, select } from 'redux-saga/effects';
import orderBy from 'lodash/orderBy';

import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import { GET_EXISTING_TAGS } from './constants';

import { getExistingTagsSuccess, getExistingTagsErr } from './actions';

import {
  selectSorting,
  selectLimit,
  selectText,
  selectExistingTags,
} from './selectors';

export function* getExistingTagsWorker({ communityId, loadMore }) {
  try {
    const limit = yield select(selectLimit());
    const text = yield select(selectText());
    const storedTags = yield select(selectExistingTags());

    const sorting = yield select(selectSorting());
    const communities = yield select(selectCommunities());

    const sliceStart = yield loadMore ? storedTags.length : 0;

    const { tags } = communities.filter((x) => x.id === +communityId)[0] || {
      tags: [],
    };

    const tagsByInput = tags.filter((x) =>
      `${x.name} ${x.description}`.toLowerCase().match(text.toLowerCase()),
    );

    const existingTags = orderBy(tagsByInput, (x) => x[sorting], [
      'desc',
    ]).slice(sliceStart, sliceStart + limit);

    // const existingTags = yield call(getExistingTags, sortedTags);

    yield put(getExistingTagsSuccess(existingTags, loadMore));
  } catch (err) {
    yield put(getExistingTagsErr(err.message));
  }
}

export default function* () {
  yield takeLatest(GET_EXISTING_TAGS, getExistingTagsWorker);
}
