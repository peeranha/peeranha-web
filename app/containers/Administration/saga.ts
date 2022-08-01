import { call, put, select, takeEvery } from 'redux-saga/effects';

import {
  ADD_MODERATOR,
  ADD_MODERATOR_SUCCESS,
  GET_MODERATORS,
  REVOKE_MODERATOR,
  REVOKE_MODERATOR_SUCCESS,
} from 'containers/Administration/constants';
import {
  addModeratorError,
  addModeratorSuccess,
  getModeratorsError,
  getModeratorsSuccess,
  revokeModeratorError,
  revokeModeratorSuccess,
} from 'containers/Administration/actions';

import { getModerators } from 'utils/theGraph';
import { getCommunityRole } from 'utils/properties';
import {
  COMMUNITY_ADMIN_ROLE,
  COMMUNITY_MODERATOR_ROLE,
} from 'utils/constants';
import {
  giveCommunityModeratorPermission,
  revokeCommunityModeratorPermission,
} from 'utils/accountManagement';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { selectEthereum } from 'containers/EthereumProvider/selectors';

export function* getModeratorsWorker(props: {
  communityId: number;
}): Generator<{}> {
  try {
    const moderatorRole = getCommunityRole(
      COMMUNITY_MODERATOR_ROLE,
      props.communityId,
    );
    const adminRole = getCommunityRole(COMMUNITY_ADMIN_ROLE, props.communityId);
    const moderators: any = yield call(getModerators, [
      moderatorRole,
      adminRole,
    ]);

    yield put(getModeratorsSuccess(moderators.sort()));
  } catch (err) {
    yield put(getModeratorsError(err));
  }
}

export function* addModeratorWorker(props: {
  userAddress: string;
  communityId: number;
}): Generator<{}> {
  try {
    const ethereumService = yield select(selectEthereum);
    const account = yield select(makeSelectAccount());
    yield call(
      giveCommunityModeratorPermission,
      account,
      props.userAddress,
      props.communityId,
      ethereumService,
    );

    yield put(addModeratorSuccess());
  } catch (err) {
    yield put(addModeratorError(err));
  }
}

export function* revokeModeratorWorker(props: {
  userAddress: string;
  communityId: number;
}): Generator<{}> {
  try {
    const ethereumService = yield select(selectEthereum);
    const account = yield select(makeSelectAccount());
    yield call(
      revokeCommunityModeratorPermission,
      account,
      props.userAddress,
      props.communityId,
      ethereumService,
    );

    yield put(revokeModeratorSuccess());
  } catch (err) {
    yield put(revokeModeratorError(err));
  }
}

export default function*() {
  // @ts-ignore
  yield takeEvery(
    [GET_MODERATORS, ADD_MODERATOR_SUCCESS, REVOKE_MODERATOR_SUCCESS],
    getModeratorsWorker,
  );
  // @ts-ignore
  yield takeEvery(ADD_MODERATOR, addModeratorWorker);
  // @ts-ignore
  yield takeEvery(REVOKE_MODERATOR, revokeModeratorWorker);
}
