import { call, put, select, takeLatest } from 'redux-saga/effects';
import ReactGA from 'react-ga4';
import { communities as communitiesRoute, feed } from 'routes-config';
import createdHistory from 'createdHistory';

import {
  editCommunity,
  freezeCommunity,
  unfreezeCommunity,
  getAllCommunities,
  isSingleCommunityWebsite,
} from 'utils/communityManagement';
import { isSuiBlockchain } from 'utils/constants';
import { uploadImg } from 'utils/profileManagement';
import { getActualId } from 'utils/properties';
import { delay } from 'utils/reduxUtils';
import { getCommunityById } from 'utils/queries/ethereumService';
import { waitForTransactionConfirmation } from 'utils/sui/sui';
import { updateSuiCommunity } from 'utils/sui/communityManagement';
import { getFileUrl } from 'utils/ipfs';

import { selectSuiWallet } from 'containers/SuiProvider/selectors';
import { getCommunitiesSuccess } from 'containers/DataCacheProvider/actions';
import { selectStat } from 'containers/DataCacheProvider/selectors';
import {
  transactionCompleted,
  transactionFailed,
  transactionInitialised,
  transactionInPending,
} from 'containers/EthereumProvider/actions';

import { HASH_CHARS_LIMIT } from 'components/FormFields/AvatarField';

import {
  editCommunityError,
  editCommunitySuccess,
  getCommunityError,
  getCommunitySuccess,
  freezeCommunityError,
  freezeCommunitySuccess,
} from './actions';

import { EDIT_COMMUNITY, GET_COMMUNITY, FREEZE_COMMUNITY } from './constants';

import { selectCommunity } from './selectors';
import { selectEthereum } from '../EthereumProvider/selectors';

export function* getCommunityWorker({ communityId }) {
  try {
    const community = yield call(getCommunityById, communityId);
    yield put(getCommunitySuccess(community));
  } catch (error) {
    yield put(getCommunityError(error));
  }
}

export function* editCommunityWorker({ communityId, communityData }) {
  try {
    ReactGA.event({
      category: 'Users',
      action: 'update_community_started',
    });
    if (communityData.avatar.length > HASH_CHARS_LIMIT) {
      const { imgHash } = yield call(uploadImg, communityData.avatar);
      communityData.avatar = isSuiBlockchain ? getFileUrl(imgHash) : imgHash;
    }

    if (communityData.banner && communityData.banner.length > HASH_CHARS_LIMIT) {
      const { imgHash } = yield call(uploadImg, communityData.banner);
      communityData.banner = isSuiBlockchain ? getFileUrl(imgHash) : imgHash;
    }

    const communityDataCurrent = yield select(selectCommunity());
    const isSingleCommunityMode = !!isSingleCommunityWebsite();
    const isEqual = Object.keys(communityData).every((key) =>
      !(key === 'isBlogger') ? communityData[key] === communityDataCurrent[key] : true,
    );

    if (!isEqual) {
      if (isSuiBlockchain) {
        yield put(transactionInitialised());
        const wallet = yield select(selectSuiWallet());
        const txResult = yield call(
          updateSuiCommunity,
          wallet,
          getActualId(communityId),
          communityData,
        );
        yield put(transactionInPending(txResult.digest));
        yield call(waitForTransactionConfirmation, txResult.digest);
        yield put(transactionCompleted());
        const communities = yield call(getAllCommunities);
        yield put(getCommunitiesSuccess(communities));
      } else {
        const ethereumService = yield select(selectEthereum);
        const selectedAccount = yield call(ethereumService.getSelectedAccount);

        yield call(editCommunity, ethereumService, selectedAccount, communityId, communityData);

        const stat = yield select(selectStat());
        const communities = yield call(getAllCommunities, ethereumService, stat.communitiesCount);
        yield put(getCommunitiesSuccess(communities));
      }
    } else {
      yield call(delay, 1e3);
    }

    yield put(editCommunitySuccess());
    ReactGA.event({
      category: 'Users',
      action: 'update_community_completed',
    });
    if (window.location.pathname === `/communities/${communityId}/edit`) {
      yield call(createdHistory.push, `${isSingleCommunityMode ? feed() : communitiesRoute()}`);
    }
  } catch (error) {
    yield put(editCommunityError(error));
  }
}

export function* freezeCommunityWorker({ isFrozen, communityId }) {
  try {
    ReactGA.event({
      category: 'Users',
      action: 'freeze_community_started',
    });

    const isSingleCommunityMode = !!isSingleCommunityWebsite();
    const ethereumService = yield select(selectEthereum);
    const account = yield call(ethereumService.getSelectedAccount);

    yield call(
      isFrozen ? unfreezeCommunity : freezeCommunity,
      ethereumService,
      account,
      communityId,
    );
    const stat = yield select(selectStat());
    const communities = yield call(getAllCommunities, ethereumService, stat.communitiesCount);

    yield put(getCommunitiesSuccess(communities));

    yield put(freezeCommunitySuccess());
    ReactGA.event({
      category: 'Users',
      action: 'freeze_community_completed',
    });
    if (window.location.pathname === `/communities/${communityId}/edit`) {
      yield call(createdHistory.push, `${isSingleCommunityMode ? feed() : communitiesRoute()}`);
    }
  } catch (error) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(error));
    }
    yield put(freezeCommunityError(error));
  }
}

export default function* defaultSaga() {
  yield takeLatest(GET_COMMUNITY, getCommunityWorker);
  yield takeLatest(EDIT_COMMUNITY, editCommunityWorker);
  yield takeLatest(FREEZE_COMMUNITY, freezeCommunityWorker);
}
