import { call, put, select, takeLatest } from 'redux-saga/effects';
import { translationMessages } from 'i18n';
import { reset as reduxFormReset } from 'redux-form';

import {
  changeCredentialsConfirm,
  deleteFacebookAccService,
} from 'utils/web_integration/src/wallet/change-credentials/change-credentials';
import { checkFacebookIdService } from 'utils/web_integration/src/wallet/facebook/facebook';

import { DELETE_FB_DATA_TYPE } from 'utils/constants';

import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';
import { WebIntegrationError } from 'utils/errors';

import { successHandling } from 'containers/Toast/saga';

import { logout } from 'containers/Logout/actions';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectFacebookUserId, selectFbUserEmail } from './selectors';

import {
  CHECK_FACEBOOK_ID,
  ENTER_FB_USER_ID_FORM,
  CONFIRM_FB_DATA_DEL_FORM,
  CONFIRM_DELETION,
  DELETION_COMPLETED,
  CONFIRM_DATA_DELETION,
  SEND_ANOTHER_CODE,
} from './constants';
import {
  deleteFbDataError,
  resetStateToInitial,
  setProcessing,
  setStage,
  setUserEmail,
} from './actions';

export function* checkFacebookIdWorker({ facebookUserId }) {
  try {
    if (!facebookUserId) {
      throw new WebIntegrationError('There is no user id');
    }
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const response = yield call(
      checkFacebookIdService,
      facebookUserId,
      locale,
      DELETE_FB_DATA_TYPE,
    );

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    yield put(setUserEmail(response.body.email));
    yield put(setStage(CONFIRM_DELETION));
    yield put(reduxFormReset(ENTER_FB_USER_ID_FORM));
    yield put(setProcessing(false));
    yield call(successHandling);
  } catch (err) {
    yield put(deleteFbDataError(err));
  }
}

export function* ConfirmFbDataDeletionWorker({ verificationCode }) {
  try {
    const email = yield select(selectFbUserEmail());
    const id = yield select(makeSelectFacebookUserId());

    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const response = yield call(
      changeCredentialsConfirm,
      email,
      verificationCode,
      DELETE_FB_DATA_TYPE,
    );

    if (!response.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    const deleteFacebookAccResponse = yield call(deleteFacebookAccService, id);

    if (!deleteFacebookAccResponse.OK) {
      throw new WebIntegrationError(
        translations[webIntegrationErrors[response.errorCode].id],
      );
    }

    yield put(resetStateToInitial());
    yield put(logout());

    yield put(setStage(DELETION_COMPLETED));
    yield put(reduxFormReset(CONFIRM_FB_DATA_DEL_FORM));
    yield put(setProcessing(false));
    yield call(successHandling);
  } catch (err) {
    yield put(deleteFbDataError(err));
  }
}

export function* sendAnotherCodeWorker() {
  try {
    const facebookUserId = yield select(makeSelectFacebookUserId());
    yield checkFacebookIdWorker({ facebookUserId });
    yield call(successHandling);
  } catch (err) {
    yield put(deleteFbDataError(err));
  }
}

export default function*() {
  yield takeLatest(CHECK_FACEBOOK_ID, checkFacebookIdWorker);
  yield takeLatest(CONFIRM_DATA_DELETION, ConfirmFbDataDeletionWorker);
  yield takeLatest(SEND_ANOTHER_CODE, sendAnotherCodeWorker);
}
