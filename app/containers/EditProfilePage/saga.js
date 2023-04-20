import { call, put, takeLatest, select } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';
import { getBytes32FromIpfsHash, getVector8FromIpfsHash, saveText } from 'utils/ipfs';

import { uploadImg, saveProfile } from 'utils/profileManagement';

import { HASH_CHARS_LIMIT } from 'components/FormFields/AvatarField';
import { AVATAR_FIELD, DISPLAY_NAME_FIELD } from 'containers/Profile/constants';

import { isValid, isAuthorized } from 'containers/EthereumProvider/saga';
import { getUserProfileSuccess } from 'containers/DataCacheProvider/actions';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { handleMoveCall, isSuiBlockchain } from 'utils/sui';

import { saveProfileSuccess, saveProfileErr } from './actions';

import { SAVE_PROFILE, EDIT_PROFILE_BUTTON_ID, MIN_RATING_TO_EDIT_PROFILE } from './constants';
import { selectEthereum } from '../EthereumProvider/selectors';

// TODO: test
/* eslint no-param-reassign: 0 */
export function* saveProfileWorker({ profile, userKey, wallet }, isNavigateToProfile = true) {
  try {
    if (profile[AVATAR_FIELD] && profile[AVATAR_FIELD].length > HASH_CHARS_LIMIT) {
      const { imgHash } = yield call(uploadImg, profile[AVATAR_FIELD]);
      profile[AVATAR_FIELD] = imgHash;
    }
    if (isSuiBlockchain()) {
      const ipfsHash = yield call(saveText, JSON.stringify(profile));
      const transactionData = getVector8FromIpfsHash(ipfsHash);

      const packageObjectId = '0x6f5f7df4236d7516df8dd71ee58cf25aeec21cf97903fb783598c8b02c1e299b';
      const UsersRatingCollection =
        '0xbfe3ac9062970689a73b876909b8709323ebdda6292ba3a76e429e4ec0e8e3aa';

      const result = yield call(handleMoveCall, wallet, packageObjectId, 'userLib', 'createUser', [
        UsersRatingCollection,
        transactionData,
      ]);
      console.log(result);
    } else {
      const ethereumService = yield select(selectEthereum);

      yield call(saveProfile, ethereumService, userKey, profile);
    }
    const fullProfileInfo = yield select(makeSelectProfileInfo());
    const updatedProfileInfo = {
      ...fullProfileInfo,
      profile,
      displayName: profile[DISPLAY_NAME_FIELD],
    };

    yield put(getUserProfileSuccess(updatedProfileInfo));

    yield put(saveProfileSuccess());

    if (isNavigateToProfile) {
      yield call(createdHistory.push, routes.profileView(userKey));
    }
  } catch (err) {
    yield put(saveProfileErr(err));
  }
}

// TODO: test
export function* checkReadinessWorker({ buttonId }) {
  yield call(isAuthorized);

  yield call(isValid, {
    buttonId: buttonId || EDIT_PROFILE_BUTTON_ID,
    minRating: MIN_RATING_TO_EDIT_PROFILE,
  });
}

export function* redirectToEditProfilePageWorker({ buttonId, user }) {
  try {
    yield call(checkReadinessWorker, { buttonId });
    yield call(createdHistory.push, routes.profileEdit(user));
  } catch (err) {}
}

export default function* () {
  yield takeLatest(SAVE_PROFILE, saveProfileWorker);
}
