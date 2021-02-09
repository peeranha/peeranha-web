import { call, put, select, takeLatest } from 'redux-saga/effects';
import _isEqual from 'lodash/isEqual';

import { communities as communitiesRoute } from 'routes-config';
import createdHistory from 'createdHistory';

import { HASH_CHARS_LIMIT } from 'components/FormFields/AvatarField';

import { getCommunitiesWithTagsSuccess } from 'containers/DataCacheProvider/actions';

import {
  selectCommunities,
  selectStat,
} from 'containers/DataCacheProvider/selectors';
import { selectEos } from 'containers/EosioProvider/selectors';

import {
  editCommunity,
  getAllCommunities,
  getCommunityById,
} from 'utils/communityManagement';
import { uploadImg } from 'utils/profileManagement';
import { delay } from 'utils/reduxUtils';

import {
  editCommunityError,
  editCommunitySuccess,
  getCommunityError,
  getCommunitySuccess,
} from './actions';

import { EDIT_COMMUNITY, GET_COMMUNITY } from './constants';

import { selectCommunity } from './selectors';

export function* getCommunityWorker({ communityId }) {
  try {
    const cachedCommunities = yield select(selectCommunities());

    let community = cachedCommunities.find(c => c.id === communityId);

    if (!community) {
      const eosService = yield select(selectEos);

      community = yield call(getCommunityById, eosService, communityId);
    }

    yield put(getCommunitySuccess(community));
  } catch (error) {
    yield put(getCommunityError(error));
  }
}

export function* editCommunityWorker({ communityId, communityData }) {
  try {
    if (communityData.avatar.length > HASH_CHARS_LIMIT) {
      const { imgHash } = yield call(uploadImg, communityData.avatar);

      // eslint-disable-next-line no-param-reassign
      communityData.avatar = imgHash;
    }

    // if (communityData.banner.length > HASH_CHARS_LIMIT) {
    //   const { imgHash } = yield call(uploadImg, communityData.banner);
    //
    //   // eslint-disable-next-line no-param-reassign
    //   communityData.banner = imgHash;
    // }

    const communityDataCurrent = yield select(selectCommunity());

    if (!_isEqual(communityDataCurrent, communityData)) {
      const eosService = yield select(selectEos);

      const selectedAccount = yield call(eosService.getSelectedAccount);

      yield call(
        editCommunity,
        eosService,
        selectedAccount,
        communityId,
        communityData,
      );

      const cachedCommunities = yield select(selectCommunities());

      const community = cachedCommunities.find(c => c.id === communityId);

      if (community) {
        try {
          const stat = yield select(selectStat());

          const communities = yield call(
            getAllCommunities,
            eosService,
            stat.communities_count,
          );

          yield put(getCommunitiesWithTagsSuccess(communities));
        } catch {}
      }
    } else {
      yield call(delay, 1e3);
    }

    yield put(editCommunitySuccess());

    yield call(createdHistory.push, communitiesRoute());
  } catch (error) {
    yield put(editCommunityError(error));
  }
}

export default function* defaultSaga() {
  yield takeLatest(GET_COMMUNITY, getCommunityWorker);
  yield takeLatest(EDIT_COMMUNITY, editCommunityWorker);
}
