import { call, put, select, takeEvery } from 'redux-saga/effects';

import {
  ADD_ROLE,
  ADD_ROLE_SUCCESS,
  GET_MODERATORS,
  REVOKE_ROLE,
  REVOKE_ROLE_SUCCESS,
} from 'containers/Administration/constants';
import {
  addRoleError,
  addRoleSuccess,
  getModeratorsError,
  getModeratorsSuccess,
  revokeRoleError,
  revokeRoleSuccess,
} from 'containers/Administration/actions';

import { getModerators } from 'utils/theGraph';
import { getCommunityRole } from 'utils/properties';
import {
  COMMUNITY_ADMIN_ROLE,
  COMMUNITY_MODERATOR_ROLE,
} from 'utils/constants';
import {
  giveRolePermission,
  revokeRolePermission,
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

export function* addRoleWorker(props: {
  userAddress: string;
  role: number;
  communityId: number;
}): Generator<any> {
  try {
    const ethereumService = yield select(selectEthereum);
    const account = yield select(makeSelectAccount());
    yield call(
      giveRolePermission,
      account,
      props.userAddress,
      props.role,
      props.communityId,
      ethereumService,
    );
    yield put(addRoleSuccess());
  } catch (err) {
    yield put(addRoleError(err));
  }
}

export function* revokeRoleWorker(props: {
  userAddress: string;
  role: number;
  communityId: number;
}): Generator<any> {
  try {
    const ethereumService = yield select(selectEthereum);
    const account = yield select(makeSelectAccount());
    yield call(
      revokeRolePermission,
      account,
      props.userAddress,
      props.role,
      props.communityId,
      ethereumService,
    );

    yield put(revokeRoleSuccess());
  } catch (err) {
    yield put(revokeRoleError(err));
  }
}

export default function* () {
  // @ts-ignore
  yield takeEvery(
    [GET_MODERATORS, ADD_ROLE_SUCCESS, REVOKE_ROLE_SUCCESS],
    getModeratorsWorker,
  );
  // @ts-ignore
  yield takeEvery(ADD_ROLE, addRoleWorker);
  // @ts-ignore
  yield takeEvery(REVOKE_ROLE, revokeRoleWorker);
}
