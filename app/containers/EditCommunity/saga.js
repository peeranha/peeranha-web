import { call, put, select, takeLatest } from 'redux-saga/effects';

import { communities as communitiesRoute, feed } from 'routes-config';
import createdHistory from 'createdHistory';

import { HASH_CHARS_LIMIT } from 'components/FormFields/AvatarField';
import { selectSuiWallet } from 'containers/SuiProvider/selectors';

import { getCommunitiesSuccess } from 'containers/DataCacheProvider/actions';

import { selectStat } from 'containers/DataCacheProvider/selectors';

import {
  editCommunity,
  getAllCommunities,
  isSingleCommunityWebsite,
} from 'utils/communityManagement';
import { uploadImg } from 'utils/profileManagement';
import { delay } from 'utils/reduxUtils';
import { getCommunityById } from 'utils/theGraph';
import { isSuiBlockchain, waitForTransactionConfirmation } from 'utils/sui/sui';
import { updateSuiCommunity } from 'utils/sui/communityManagement';
import { getFileUrl } from 'utils/ipfs';

import {
  editCommunityError,
  editCommunitySuccess,
  getCommunityError,
  getCommunitySuccess,
} from './actions';

import { EDIT_COMMUNITY, GET_COMMUNITY } from './constants';

import { selectCommunity } from './selectors';
import { selectEthereum } from '../EthereumProvider/selectors';
import {
  transactionCompleted,
  transactionFailed,
  transactionInitialised,
  transactionInPending,
} from 'containers/EthereumProvider/actions';

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
          communityDataCurrent.suiId,
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

    yield call(createdHistory.push, `${isSingleCommunityMode ? feed() : communitiesRoute()}`);
  } catch (error) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(error));
    }
    yield put(editCommunityError(error));
  }
}

export default function* defaultSaga() {
  yield takeLatest(GET_COMMUNITY, getCommunityWorker);
  yield takeLatest(EDIT_COMMUNITY, editCommunityWorker);
}
