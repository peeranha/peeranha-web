import { call, put, select, takeLatest } from 'redux-saga/effects';

import { communities as communitiesRoute } from 'routes-config';
import createdHistory from 'createdHistory';

import { HASH_CHARS_LIMIT } from 'components/FormFields/AvatarField';

import { getCommunitiesWithTagsSuccess } from 'containers/DataCacheProvider/actions';

import {
  selectCommunities,
  selectStat,
} from 'containers/DataCacheProvider/selectors';

import {
  editCommunity,
  getAllCommunities,
  getCommunityFromContract,
  getSingleCommunityDetails,
  setSingleCommunityDetailsInCookie,
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
import { selectEthereum } from '../EthereumProvider/selectors';

export function* getCommunityWorker({ communityId }) {
  try {
    const ethereumService = yield select(selectEthereum);
    const community = yield call(
      getCommunityFromContract,
      ethereumService,
      communityId,
    );

    yield put(getCommunitySuccess(community));
  } catch (error) {
    yield put(getCommunityError(error));
  }
}

export function* editCommunityWorker({ communityId, communityData }) {
  try {
    const isBloggerMode = getSingleCommunityDetails()?.isBlogger || false;
    if (communityData.avatar.length > HASH_CHARS_LIMIT) {
      const { imgHash } = yield call(uploadImg, communityData.avatar);
      communityData.avatar = imgHash;
    }

    if (
      communityData.banner &&
      communityData.banner.length > HASH_CHARS_LIMIT
    ) {
      const { imgHash } = yield call(uploadImg, communityData.banner);
      communityData.banner = imgHash;
    }

    if (isBloggerMode) {
      setSingleCommunityDetailsInCookie(communityData, communityId);
    }

    const communityDataCurrent = yield select(selectCommunity());
    const isEqual = Object.keys(communityData).every((key) =>
      !(key === 'isBlogger')
        ? communityData[key] === communityDataCurrent[key]
        : true,
    );

    if (!isEqual) {
      const ethereumService = yield select(selectEthereum);
      const selectedAccount = yield call(ethereumService.getSelectedAccount);

      yield call(
        editCommunity,
        ethereumService,
        selectedAccount,
        communityId,
        communityData,
      );

      const cachedCommunities = yield select(selectCommunities());

      const community = cachedCommunities.find((c) => c.id === communityId);

      if (community) {
        const stat = yield select(selectStat());
        const communities = yield call(
          getAllCommunities,
          ethereumService,
          stat.communitiesCount,
        );

        yield put(getCommunitiesWithTagsSuccess(communities));
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
