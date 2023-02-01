import { t } from 'i18next';
import { takeLatest, put, call } from 'redux-saga/effects';

import { changeCredentialsComplete } from 'utils/web_integration/src/wallet/change-credentials/change-credentials';

import { WebIntegrationError } from 'utils/errors';

import { getCookie } from 'utils/cookie';
import { AUTOLOGIN_DATA } from 'containers/Login/constants';
import {
  CHANGE_PASSWORD,
  NEW_PASSWORD_FIELD,
  OLD_PASSWORD_FIELD,
} from './constants';

import { changePasswordSuccess, changePasswordErr } from './actions';

export function* changePasswordWorker({ resetForm, values }) {
  try {
    const { email } = JSON.parse(getCookie(AUTOLOGIN_DATA));

    const oldPassword = values[OLD_PASSWORD_FIELD];
    const newPassword = values[NEW_PASSWORD_FIELD];

    const changeCredentialsCompleteResponse = yield call(
      changeCredentialsComplete,
      email,
      oldPassword,
      newPassword,
    );

    if (
      !changeCredentialsCompleteResponse.OK ||
      !changeCredentialsCompleteResponse.body.success
    ) {
      throw new WebIntegrationError(
        t(`webIntegration.${changeCredentialsCompleteResponse?.errorCode}`),
      );
    }

    yield put(changePasswordSuccess());
    yield call(resetForm);
  } catch (err) {
    yield put(changePasswordErr(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(CHANGE_PASSWORD, changePasswordWorker);
}
