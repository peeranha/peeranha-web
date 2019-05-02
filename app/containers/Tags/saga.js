import { call, put, takeLatest, select } from 'redux-saga/effects';
import _ from 'lodash';

import { getSuggestedTags, getExistingTags } from 'utils/communityManagement';

import { selectEos } from 'containers/EosioProvider/selectors';

import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import { GET_SUGGESTED_TAGS, GET_EXISTING_TAGS } from './constants';

import {
  getSuggestedTagsSuccess,
  getSuggestedTagsErr,
  getExistingTagsSuccess,
  getExistingTagsErr,
} from './actions';

import {
  selectSorting,
  selectLimit,
  selectText,
  selectSuggestedTags,
  selectExistingTags,
} from './selectors';

export function* getSuggestedTagsWorker({ communityId, loadMore }) {
  try {
    const eosService = yield select(selectEos);
    const storedTags = yield select(selectSuggestedTags());
    const limit = yield select(selectLimit());

    // Lower bound - is ID of tag
    let lowerBound = 0;

    if (loadMore) {
      lowerBound = yield storedTags[storedTags.length - 1]
        ? +storedTags[storedTags.length - 1].id + 1
        : 0;
    }

    const suggestedTags = yield call(() =>
      getSuggestedTags(eosService, communityId, lowerBound, limit),
    );

    yield put(getSuggestedTagsSuccess(suggestedTags, loadMore));
  } catch (err) {
    yield put(getSuggestedTagsErr(err.message));
  }
}

export function* getExistingTagsWorker({ communityId, loadMore }) {
  try {
    const limit = yield select(selectLimit());
    const text = yield select(selectText());
    const storedTags = yield select(selectExistingTags());

    const sorting = yield select(selectSorting());
    const communities = yield select(selectCommunities());

    const sliceStart = yield loadMore ? storedTags.length : 0;

    const { tags } = communities.filter(x => x.id === +communityId)[0];

    const tagsByInput = tags.filter(x =>
      JSON.stringify(x)
        .toLowerCase()
        .match(text.toLowerCase()),
    );

    const sortedTags = _.orderBy(tagsByInput, x => x[sorting], ['desc']).slice(
      sliceStart,
      sliceStart + limit,
    );

    const existingTags = yield call(() => getExistingTags(sortedTags));

    yield put(getExistingTagsSuccess(existingTags, loadMore));
  } catch (err) {
    yield put(getExistingTagsErr(err.message));
  }
}

export default function*() {
  yield takeLatest(GET_SUGGESTED_TAGS, getSuggestedTagsWorker);
  yield takeLatest(GET_EXISTING_TAGS, getExistingTagsWorker);
}
