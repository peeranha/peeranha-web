import { call, put, select, takeEvery } from 'redux-saga/effects';

import {
  ADD_ROLE,
  ADD_ROLE_SUCCESS,
  GET_MODERATORS,
  REVOKE_ROLE,
  REVOKE_ROLE_SUCCESS,
} from 'containers/Administration/constants';
import {
  addRoleSuccess,
  addRoleError,
  getModeratorsError,
  getModeratorsSuccess,
  revokeRoleError,
  revokeRoleSuccess,
} from 'containers/Administration/actions';

import { getModerators } from 'utils/theGraph';
import { getActualId, getCommunityRole, getNetwork } from 'utils/properties';
import { COMMUNITY_ADMIN_ROLE, COMMUNITY_MODERATOR_ROLE } from 'utils/constants';
import { giveRolePermission, revokeRolePermission } from 'utils/accountManagement';
import { makeSelectAccount, makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { selectEthereum } from 'containers/EthereumProvider/selectors';
import { isSuiBlockchain, waitForTransactionConfirmation } from 'utils/sui/sui';
import {
  giveSuiRolePermission,
  revokeSuiRolePermission,
  getSuiUserObject,
} from 'utils/sui/accountManagement';
import {
  transactionCompleted,
  transactionFailed,
  transactionInitialised,
  transactionInPending,
} from 'containers/EthereumProvider/actions';
import { selectSuiWallet } from 'containers/SuiProvider/selectors';

export function* getModeratorsWorker(props: { communityId: string }): Generator<{}> {
  try {
    const moderatorRole = getCommunityRole(
      COMMUNITY_MODERATOR_ROLE,
      getActualId(props.communityId),
      getNetwork(props.communityId),
    );
    const adminRole = getCommunityRole(
      COMMUNITY_ADMIN_ROLE,
      getActualId(props.communityId),
      getNetwork(props.communityId),
    );
    const moderators: any = yield call(getModerators, [
      moderatorRole,
      moderatorRole,
      adminRole,
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
  isUserHasRole?: boolean;
}): Generator<any> {
  try {
    if (isSuiBlockchain) {
      yield put(transactionInitialised());
      const wallet = yield select(selectSuiWallet());
      const profile = yield select(makeSelectProfileInfo());
      // const suiUserObject = yield call(getSuiUserObject, props.userAddress);
      // @ts-ignore
      const txResult = yield call(
        giveSuiRolePermission,
        wallet,
        profile.id,
        props.userAddress,
        props.role,
        props.communityId,
      );
      yield put(transactionInPending(txResult.digest));
      yield call(waitForTransactionConfirmation, txResult.digest);
      yield put(transactionCompleted());
    } else {
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
    }
    yield put(addRoleSuccess(props.communityId));
  } catch (err) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
    yield put(revokeRoleError(err));
  }
}

export function* revokeRoleWorker(props: {
  userAddress: string;
  role: number;
  communityId: number;
}): Generator<any> {
  try {
    if (isSuiBlockchain) {
      yield put(transactionInitialised());
      const wallet = yield select(selectSuiWallet());
      const profile = yield select(makeSelectProfileInfo());
      // const suiUserObject = yield call(getSuiUserObject, props.userAddress);
      // @ts-ignore
      const txResult = yield call(
        revokeSuiRolePermission,
        wallet,
        profile.id,
        props.userAddress,
        props.role,
        props.communityId,
      );
      yield put(transactionInPending(txResult.digest));
      yield call(waitForTransactionConfirmation, txResult.digest);
      yield put(transactionCompleted());
    } else {
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
    }
    yield put(revokeRoleSuccess(props.communityId));
  } catch (err) {
    if (isSuiBlockchain) {
      yield put(transactionFailed(err));
    }
    yield put(revokeRoleError(err));
  }
}

export default function* () {
  // @ts-ignore
  yield takeEvery([GET_MODERATORS, ADD_ROLE_SUCCESS, REVOKE_ROLE_SUCCESS], getModeratorsWorker);
  // @ts-ignore
  yield takeEvery(ADD_ROLE, addRoleWorker);
  // @ts-ignore
  yield takeEvery(REVOKE_ROLE, revokeRoleWorker);
}
