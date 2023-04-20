import { call, put, takeLatest, select } from 'redux-saga/effects';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';
import { getBytes32FromIpfsHash, getVector8FromIpfsHash, saveText } from 'utils/ipfs';
import { handleMoveCall } from 'utils/networkManagement';

import { uploadImg } from 'utils/profileManagement';

import { HASH_CHARS_LIMIT } from 'components/FormFields/AvatarField';
import { AVATAR_FIELD } from 'containers/Profile/constants';

import { isValid, isAuthorized } from 'containers/EthereumProvider/saga';

import { saveProfileErr } from './actions';

import { SAVE_PROFILE, EDIT_PROFILE_BUTTON_ID, MIN_RATING_TO_EDIT_PROFILE } from './constants';

// TODO: test
/* eslint no-param-reassign: 0 */
export function* saveProfileWorker({ profile, userKey, wallet }, isNavigateToProfile = true) {
  try {
    if (profile[AVATAR_FIELD] && profile[AVATAR_FIELD].length > HASH_CHARS_LIMIT) {
      const { imgHash } = yield call(uploadImg, profile[AVATAR_FIELD]);
      profile[AVATAR_FIELD] = imgHash;
    }
    const ipfsHash = yield call(saveText, JSON.stringify(profile));
    const transactionData = getVector8FromIpfsHash(ipfsHash);

    const packageObjectId = '0x002c561cf6c48141738ea386781691019b2098502814be3a86619312b34fc75b';
    const UsersRatingCollection =
      '0xadf245a95fb37c3fdf2aa71e1b74b4e4eec4d2eac1c26bcc5fccbf9f6484f6c0';
    yield call(handleMoveCall, wallet, packageObjectId, UsersRatingCollection, transactionData);
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
