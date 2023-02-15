import { put, takeLatest, select } from 'redux-saga/effects';
import orderBy from 'lodash/orderBy';

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

    const sliceStart = yield loadMore ? storedTags.length : 0;

    const tags = Array.isArray(storedTags)
      ? storedTags
      : storedTags[communityId];
    const tagsByInput = tags.filter((tag) =>
      `${tag.name} ${tag.description}`.toLowerCase().match(text.toLowerCase()),
    );

    const existingTags = orderBy(tagsByInput, (tag) => tag[sorting], [
      'desc',
    ]).slice(sliceStart, sliceStart + limit);

    yield put(getExistingTagsSuccess(existingTags, loadMore));
  } catch (err) {
    yield put(getExistingTagsErr(err.message));
  }
}

export default function* () {
  yield takeLatest(GET_EXISTING_TAGS, getExistingTagsWorker);
}
