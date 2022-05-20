import { takeLatest, put, call, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';
import { reset as reduxFormReset } from 'redux-form';

import { login } from 'utils/web_integration/src/wallet/login/login';
import webIntegrationErrors from 'utils/web_integration/src/wallet/service-errors';
import { WebIntegrationError } from 'utils/errors';

import messages from 'common-messages';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';

import {
  SEND_TOKENS,
  EOS_ACCOUNT_FIELD,
  PASSWORD_FIELD,
  SEND_TOKENS_FORM,
  SEND_ANOTHER_CODE,
} from './constants';

import {
  sendTokensSuccess,
  sendTokensErr,
  hideSendTokensModal,
} from './actions';
import { successHandling } from '../Toast/saga';

export function* sendTokensWorker({ val }) {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];

    const profile = yield select(makeSelectProfileInfo());

    const password = val[PASSWORD_FIELD];

    // check password for users which logged with email
    if (profile.loginData.email) {
      const response = yield call(
        login,
        profile.loginData.email,
        password,
        Boolean(profile.loginData.authToken),
      );

      if (!response.OK) {
        throw new WebIntegrationError(
          translations[webIntegrationErrors[response.errorCode].id],
        );
      }
    }

    if (profile.user === val[EOS_ACCOUNT_FIELD]) {
      throw new WebIntegrationError(
        translations[messages.cannotTransferToYourself.id],
      );
    }

    yield put(sendTokensSuccess());
    yield put(hideSendTokensModal());

    yield put(reduxFormReset(SEND_TOKENS_FORM));
  } catch (err) {
    yield put(sendTokensErr(err));
  }
}

// export function* sendEmailWorker() {
//   try {
//     const locale = yield select(makeSelectLocale());
//     const translations = translationMessages[locale];
//     const { id } = yield select(selectFacebookUserData());
//
//     const response = yield call(
//       sendFbVerificationCode,
//       id,
//       locale,
//       SEND_TOKENS_TYPE,
//     );
//
//     if (!response.OK) {
//       throw new WebIntegrationError(
//         translations[webIntegrationErrors[response.errorCode].id],
//       );
//     }
//
//     yield put(setSendTokensProcessing(false));
//     yield put(showVerifyFbModal());
//   } catch (err) {
//     yield put(sendTokensErr(err));
//   }
// }

export function* sendAnotherCodeSuccess() {
  yield call(successHandling);
}

// export function* verifyFacebookActionWorker({ verifyFormVals }) {
//   try {
//     yield put(setSendTokensProcessing(true));
//
//     const locale = yield select(makeSelectLocale());
//     const translations = translationMessages[locale];
//     const { email } = yield select(selectFacebookUserData());
//     const verificationCode = verifyFormVals[FB_VERIFICATION_CODE_FIELD];
//
//     const response = yield call(
//       changeCredentialsConfirm,
//       email,
//       verificationCode,
//       SEND_TOKENS_TYPE,
//     );
//
//     if (!response.OK) {
//       throw new WebIntegrationError(
//         translations[webIntegrationErrors[response.errorCode].id],
//       );
//     }
//
//     const val = yield select(selectFbSendTokensFormValues());
//     yield sendTokensWorker({ val });
//
//     yield put(reduxFormReset(VERIFY_FB_ACTION_FORM));
//   } catch (err) {
//     yield put(sendTokensErr(err));
//   }
// }

export default function* defaultSaga() {
  yield takeLatest(SEND_TOKENS, sendTokensWorker);
  // yield takeLatest(
  //   [SEND_FB_VERIFICATION_EMAIL, SEND_ANOTHER_CODE],
  //   sendEmailWorker,
  // );
  yield takeLatest(SEND_ANOTHER_CODE, sendAnotherCodeSuccess);
  // yield takeLatest(VERIFY_FB_ACTION, verifyFacebookActionWorker);
}
