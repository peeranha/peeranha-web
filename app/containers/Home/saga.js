/* eslint func-names: 0, array-callback-return: 0, no-param-reassign: 0 */
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import { HASH_CHARS_LIMIT } from 'components/FormFields/AvatarField';

import { selectEos } from 'containers/EosioProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';
import {
  isSingleCommunityWebsite,
  getSingleCommunityDetails,
} from 'utils/communityManagement';
import { getUserAvatar } from 'utils/profileManagement';

import { getCommunityById } from 'utils/theGraph';
import {
  GET_COMMUNITY,
  GET_LOGO,
  REDIRECT_TO_EDIT_COMMUNITY_PAGE,
  FOLLOW_HANDLER,
} from './constants';
import {
  getCommunitySuccess,
  getCommunityError,
  getLogoSuccess,
  getLogoError,
} from './actions';
import { selectCommunity } from './selectors';
import createdHistory from '../../createdHistory';
import * as routes from '../../routes-config';
import { followHandlerWorker } from '../FollowCommunityButton/saga';

export function* getCommunityWorker({ id }) {
  try {
    const cachedCommunities = yield select(selectCommunities());

    let community = cachedCommunities.find((c) => c.id === id);

    if (!community) {
      const eosService = yield select(selectEos);

      community = yield call(getCommunityById, eosService, id);
    }

    yield put(getCommunitySuccess(community));
  } catch (err) {
    yield put(getCommunityError(err));
  }
}

export function* getLogoWorker() {
  try {
    let logo = '';

    const single = isSingleCommunityWebsite();
    if (single) {
      yield call(getCommunityWorker, { id: single });

      const community = yield select(selectCommunity());

      const isBloggerMode = getSingleCommunityDetails()?.isBlogger || false;

      if (isBloggerMode) {
        const { avatar } = community;

        logo =
          avatar && avatar.length > HASH_CHARS_LIMIT
            ? avatar
            : getUserAvatar(avatar, true, true);
      }
    }

    yield put(getLogoSuccess(logo));
  } catch (err) {
    yield put(getLogoError(err));
  }
}
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
export function* redirectToEditCommunityPageWorker({ id }) {
  try {
    yield call(createdHistory.push, routes.communitiesEdit(id));
  } catch (err) {}
}

export default function* () {
  yield takeEvery(GET_COMMUNITY, getCommunityWorker);
  yield takeEvery(GET_LOGO, getLogoWorker);
  yield takeLatest(
    REDIRECT_TO_EDIT_COMMUNITY_PAGE,
    redirectToEditCommunityPageWorker,
  );
  yield takeEvery(FOLLOW_HANDLER, followHandlerWorker);
}
