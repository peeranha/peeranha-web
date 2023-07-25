import { selectSuiWallet } from 'containers/SuiProvider/selectors';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import getHash from 'object-hash';

import { getAllCommunities, getCommunityTags } from 'utils/communityManagement';
import { getProfileInfo } from 'utils/profileManagement';
import { getMD } from 'utils/mdManagement';
import { getAchievements } from 'utils/achievementsManagement';
import { USER_ACHIEVEMENTS_TABLE } from 'utils/constants';

import { LOGOUT_SUCCESS } from 'containers/Logout/constants';
import { SAVE_PROFILE_SUCCESS } from 'containers/EditProfilePage/constants';
import { updateStoredQuestionsWorker } from 'containers/Questions/saga';

import { LOGIN_WITH_WALLET } from 'containers/Login/constants';

import { selectCommunities, selectUsers } from 'containers/DataCacheProvider/selectors';

import {
  getCommunities,
  getCommunitiesErr,
  getCommunitiesSuccess,
  getTagsErr,
  getTagsSuccess,
  getFaqErr,
  getFaqSuccess,
  getStatErr,
  getStatSuccess,
  getTutorialErr,
  getTutorialSuccess,
  getUserProfileErr,
  getUserProfileSuccess,
} from 'containers/DataCacheProvider/actions';

import {
  GET_COMMUNITIES,
  GET_COMMUNITY_TAGS,
  GET_FAQ,
  GET_STAT,
  GET_TUTORIAL,
  GET_USER_PROFILE,
} from 'containers/DataCacheProvider/constants';
import { selectEthereum } from 'containers/EthereumProvider/selectors';
import { getSuiProfileInfo } from 'utils/sui/profileManagement';
import { isSuiBlockchain } from 'utils/sui/sui';
import { getSuiUserById, getSuiCommunities, getSuiCommunityTags } from 'utils/sui/suiIndexer';
import { getUserStats } from 'utils/theGraph';

export function* getStatWorker() {
  try {
    if (isSuiBlockchain) {
      yield put(
        getStatSuccess({
          usersCount: 0,
          communitiesCount: 0,
        }),
      );
      yield put(getCommunities());
    } else {
      yield put(getStatSuccess({}));
      yield put(getCommunities());
    }
  } catch (err) {
    yield put(getStatErr(err));
  }
}

export function* getCommunitiesWorker() {
  try {
    if (isSuiBlockchain) {
      const communities = yield call(getSuiCommunities);
      yield put(getCommunitiesSuccess(communities));
    } else {
      const communities = yield call(getAllCommunities);

      yield put(getCommunitiesSuccess(communities));
    }
  } catch (err) {
    yield put(getCommunitiesErr(err));
  }
}

export function* getCommunityTagsWorker({ communityId }) {
  try {
    if (isSuiBlockchain) {
      const suiCommunities = yield call(getSuiCommunities);
      yield put(getCommunitiesSuccess(suiCommunities));
      const suiCommunityId = suiCommunities.find(
        (community) => String(community.id) === String(communityId),
      ).suiId;
      const tags = (yield call(getSuiCommunityTags, suiCommunityId)).map((tag) => ({
        ...tag,
        label: tag.name,
      }));

      yield put(getTagsSuccess({ [communityId]: tags }));
    } else {
      const tags = yield call(getCommunityTags, communityId);
      yield put(getTagsSuccess(tags));
    }
  } catch (err) {
    yield put(getTagsErr(err));
  }
}

export function* getFaqWorker() {
  try {
    const prefix = 'faq';
    const faq = yield call(getMD, prefix);

    yield put(getFaqSuccess(faq));
  } catch (err) {
    yield put(getFaqErr(err));
  }
}

export function* getTutorialWorker() {
  try {
    const prefix = 'tutorial';
    const tutorial = yield call(getMD, prefix);

    yield put(getTutorialSuccess(tutorial));
  } catch (err) {
    yield put(getTutorialErr(err));
  }
}

/* eslint consistent-return: 0 */
export function* getUserProfileWorker({ user, getFullProfile, communityIdForRating }) {
  try {
    if (isSuiBlockchain) {
      const wallet = yield select(selectSuiWallet());
      const isLogin = wallet.address === user;
      let updatedUserInfo;
      const communities = yield select(selectCommunities());
      if (isLogin) {
        const userFromContract = yield call(getSuiProfileInfo, wallet.address);
        updatedUserInfo = yield call(getSuiUserById, userFromContract.id, communities);
      } else {
        updatedUserInfo = yield call(getSuiUserById, user, communities);
      }
      yield put(getUserProfileSuccess({ ...updatedUserInfo }));
      return yield updatedUserInfo;
    }
    const ethereumService = yield select(selectEthereum);
    const selectedAccount = yield call(ethereumService.getSelectedAccount);
    const isLogin = selectedAccount === user;
    const cachedUserInfo = yield select(selectUsers(user));

    // take userProfile from STORE
    if (cachedUserInfo && !getFullProfile && !isLogin) {
      if (!cachedUserInfo.achievements) {
        const userAchievements = yield call(
          getAchievements,
          ethereumService,
          USER_ACHIEVEMENTS_TABLE,
          user,
        );
        const userStats = yield getUserStats(user);

        const updatedUserInfo = {
          ...cachedUserInfo,
          achievements: userAchievements,
        };
        yield put(getUserProfileSuccess({ ...updatedUserInfo, ...userStats }));
        return updatedUserInfo;
      }
      return yield cachedUserInfo;
    }

    // get userProfile and put to STORE
    const updatedUserInfo = yield call(
      getProfileInfo,
      user,
      ethereumService,
      getFullProfile,
      isLogin,
      communityIdForRating,
    );

    if (
      (updatedUserInfo && !cachedUserInfo) ||
      (updatedUserInfo && cachedUserInfo && getHash(updatedUserInfo) !== getHash(cachedUserInfo))
    ) {
      yield put(getUserProfileSuccess({ ...updatedUserInfo }));
    }

    yield put(getUserProfileSuccess());

    return yield { ...updatedUserInfo };
  } catch (err) {
    yield put(getUserProfileErr(err));
  }
}

export default function* () {
  yield takeLatest(GET_COMMUNITIES, getCommunitiesWorker);
  yield takeLatest(GET_COMMUNITY_TAGS, getCommunityTagsWorker);
  yield takeEvery(GET_USER_PROFILE, getUserProfileWorker);
  yield takeLatest(GET_STAT, getStatWorker);
  yield takeLatest(GET_FAQ, getFaqWorker);
  yield takeLatest(GET_TUTORIAL, getTutorialWorker);
  yield takeLatest(
    [LOGOUT_SUCCESS, LOGIN_WITH_WALLET, SAVE_PROFILE_SUCCESS],
    updateStoredQuestionsWorker,
  );
}
