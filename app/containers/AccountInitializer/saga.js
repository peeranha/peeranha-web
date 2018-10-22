import React from 'react';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import { selectEos } from 'containers/EosioProvider/selectors';
import { isUserInSystem } from 'utils/accountManagement';
import { chooseModalContent, closeModalWindow } from 'containers/Modal/actions';

import SignUp from 'containers/SignUp';
import ScatterInstaller from 'containers/Button/ScatterInstaller';
import SelectAccount from 'containers/Button/SelectAccount';
import UserIsAbsentInSystem from 'containers/Button/UserIsAbsentInSystem';

import { COMPLETE_LOGIN, COMPLETE_SIGNUP } from 'containers/Button/constants';

import {
  GET_CURRENT_ACCOUNT,
  SELECT_ACCOUNT,
  NO_SCATTER,
  NO_SELECTED_SCATTER_ACCOUNTS,
  USER_IS_ABSENT_IN_SYSTEM_AND_LOGIN,
  USER_IS_ABSENT_IN_SYSTEM_AND_SIGNUP,
} from './constants';

import {
  getCurrentAccountSuccess,
  getCurrentAccountError,
  selectAccountSuccess,
  selectAccError,
} from './actions';

export function* getCurrentAccountWorker() {
  try {
    const eosService = yield select(selectEos);

    if (!eosService || !eosService.initialized)
      throw new Error('EOS is not initialized.');

    const selectedScatterAccount = yield eosService.scatterInstalled
      ? call(() => eosService.getSelectedAccount())
      : null;

    const userIsInSystem = yield call(() =>
      isUserInSystem(selectedScatterAccount, eosService),
    );

    const eosInit = {
      userIsInSystem,
      selectedScatterAccount,
      initialized: eosService.initialized,
      eosInstance: eosService.eosInstance,
      scatterInstance: eosService.scatterInstance,
      scatterInstalled: eosService.scatterInstalled,
    };

    yield put(getCurrentAccountSuccess(selectedScatterAccount, eosInit));
  } catch (err) {
    yield put(getCurrentAccountError(err));
  }
}

export function* selectAccountWorker(res) {
  const eosService = yield select(selectEos);
  const selectAnotherIdentity = async () => {
    await eosService.forgetIdentity();
    await eosService.selectAccount();
    res.methods.logIn();
  };

  try {
    let account;

    if (!eosService.scatterInstalled) throw new Error(NO_SCATTER);

    if (!eosService.selectedScatterAccount) {
      account = yield call(() => eosService.selectAccount());
      if (!account) throw new Error(NO_SELECTED_SCATTER_ACCOUNTS);
    }

    yield put(
      selectAccountSuccess(
        {
          selectedScatterAccount: account,
          scatterInstalled: true,
        },
        account,
      ),
    );

    const userIsInSystem = yield call(() =>
      isUserInSystem(account, eosService),
    );

    if (!userIsInSystem && res.methods.type === COMPLETE_LOGIN)
      throw new Error(USER_IS_ABSENT_IN_SYSTEM_AND_LOGIN);

    if (!userIsInSystem && res.methods.type === COMPLETE_SIGNUP)
      throw new Error(USER_IS_ABSENT_IN_SYSTEM_AND_SIGNUP);

    yield put(closeModalWindow());
    yield put(
      selectAccountSuccess(
        {
          userIsInSystem,
          selectedScatterAccount: account,
          scatterInstalled: true,
        },
        account,
      ),
    );
  } catch (err) {
    let content;
    const methods = { ...res.methods, selectAnotherIdentity };

    switch (err.message) {
      case NO_SCATTER:
        content = [ScatterInstaller, null, methods];
        break;
      case NO_SELECTED_SCATTER_ACCOUNTS:
        content = [SelectAccount, null, methods];
        break;
      case USER_IS_ABSENT_IN_SYSTEM_AND_LOGIN:
        content = [UserIsAbsentInSystem, null, methods];
        break;
      case USER_IS_ABSENT_IN_SYSTEM_AND_SIGNUP:
        content = [SignUp, null, methods];
        break;
      default:
        content = null;
        break;
    }

    const elem = React.createElement(content[0], content[1], content[2]);

    yield put(chooseModalContent(elem));
    yield put(selectAccError(err));
  }
}

export default function*() {
  yield takeEvery(GET_CURRENT_ACCOUNT, getCurrentAccountWorker);
  yield takeEvery(SELECT_ACCOUNT, selectAccountWorker);
}
