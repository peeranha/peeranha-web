import { call, put, takeLatest, select } from 'redux-saga/effects';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { uploadImg } from 'utils/profileManagement';
import { createCommunity } from 'utils/communityManagement';

import { selectEos } from 'containers/EosioProvider/selectors';

import {
  successToastHandlingWithDefaultText,
  errorToastHandlingWithDefaultText,
} from 'containers/Toast/saga';

import {
  uploadImageFileSuccess,
  uploadImageFileError,
  createCommunitySuccess,
  createCommunityErr,
} from './actions';

import {
  UPLOAD_IMAGE_FILE,
  CREATE_COMMUNITY,
  CREATE_COMMUNITY_SUCCESS,
  CREATE_COMMUNITY_ERROR,
} from './constants';

export function* uploadImageFileWorker({ file }) {
  try {
    const img = yield call(() => uploadImg(file));
    yield put(uploadImageFileSuccess(img.imgUrl, img.imgHash));
  } catch (err) {
    yield put(uploadImageFileError(err.message));
  }
}

export function* createCommunityWorker({ community, reset }) {
  try {
    const eosService = yield select(selectEos);
    const selectedAccount = yield call(() => eosService.getSelectedAccount());

    yield call(() => createCommunity(eosService, selectedAccount, community));

    yield put(createCommunitySuccess());

    yield call(reset);

    yield call(() =>
      createdHistory.push(`${routes.communitiesCreate()}#banner`),
    );
  } catch (err) {
    yield put(createCommunityErr(err.message));
  }
}

export default function*() {
  yield takeLatest(UPLOAD_IMAGE_FILE, uploadImageFileWorker);
  yield takeLatest(CREATE_COMMUNITY, createCommunityWorker);
  yield takeLatest(
    CREATE_COMMUNITY_SUCCESS,
    successToastHandlingWithDefaultText,
  );
  yield takeLatest(CREATE_COMMUNITY_ERROR, errorToastHandlingWithDefaultText);
}
