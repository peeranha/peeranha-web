import { takeLatest, takeEvery, put, call, select } from 'redux-saga/effects';
import { translationMessages } from 'i18n';
import { getFormValues } from 'redux-form/lib/immutable';

import _omit from 'lodash/omit';

import { WebIntegrationError } from 'utils/errors';
import { SEND_TIPS_SCATTER_APP_NAME } from 'utils/constants';
import Eosio from 'utils/eosio';
import {
  callService,
  NOTIFICATIONS_TIPS_SERVICE,
} from 'utils/web_integration/src/util/aws-connector';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import formFieldsMessages from 'components/FormFields/messages.js';

import messages, {
  getAccountNotSelectedMessageDescriptor,
} from '../Login/messages';
import { SCATTER_MODE_ERROR, USER_IS_NOT_SELECTED } from '../Login/constants';

import {
  SELECT_SCATTER_ACCOUNT,
  SELECT_KEYCAT_ACCOUNT,
  EOS_SEND_TO_ACCOUNT_FIELD,
  SEND_TIPS_NOTIFICATION,
  MAX_NOTIFICAT_ATTEMPTS,
  SEND_ANOTHER_CODE,
} from './constants';

import {
  selectScatterAccountSuccess,
  selectKeycatAccountSuccess,
  selectAccountErr,
  addScatterTipsEosService,
  addTipsKeycatEosService,
} from './actions';

import {
  selectTipsScatterEosService,
  selectTipsKeycatEosService,
} from './selectors';

import { formName } from './SendTipsForm';
import { successHandling } from '../Toast/saga';

export function* sendTipsNotificationWorker({
  data,
  questionId,
  answerId,
  transactionId,
  block,
}) {
  try {
    let attempts = 1;
    while (attempts <= MAX_NOTIFICAT_ATTEMPTS) {
      // delay before notifications tips service call
      yield new Promise((res) => {
        setTimeout(() => {
          res();
        }, 2000);
      });

      const result = yield call(callService, NOTIFICATIONS_TIPS_SERVICE, {
        ..._omit(data, 'memo'),
        questionId,
        answerId,
        transactionId,
        block,
      });

      if (result.OK) break;
      if (attempts === MAX_NOTIFICAT_ATTEMPTS) {
        console.log(
          'Error in sendTipsNotificationWorker: could not sent user tip notification',
        );
      }
      attempts += 1;
    }
  } catch (err) {
    console.log(err);
  }
}

export function* selectScatterAccountWorker() {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];
    let tipsEosService = yield select(selectTipsScatterEosService());

    if (!tipsEosService) {
      tipsEosService = new Eosio();
      yield put(addScatterTipsEosService(tipsEosService));
      yield call(
        tipsEosService.initEosioWithScatter,
        SEND_TIPS_SCATTER_APP_NAME,
      );
    } else {
      yield call(tipsEosService.forgetIdentity);
    }

    if (!tipsEosService.scatterInstalled) {
      yield call(tipsEosService.initEosioWithScatter);
      if (!tipsEosService.scatterInstalled) {
        throw new WebIntegrationError(
          translations[messages[SCATTER_MODE_ERROR].id],
        );
      }
    }

    let { selectedAccount } = tipsEosService;
    if (!selectedAccount) {
      selectedAccount = yield call(tipsEosService.selectAccount);
      if (!selectedAccount) {
        throw new WebIntegrationError(
          translations[
            getAccountNotSelectedMessageDescriptor(
              tipsEosService.isScatterExtension,
            ).id
          ],
        );
      }
    }
    const receiver = (yield select(getFormValues(formName))).get(
      EOS_SEND_TO_ACCOUNT_FIELD,
    );

    if (receiver === selectedAccount) {
      throw new WebIntegrationError(
        translations[formFieldsMessages.exactFromAndToAccounts.id],
      );
    }

    yield put(
      selectScatterAccountSuccess(
        selectedAccount.eosAccountName
          ? selectedAccount.eosAccountName
          : selectedAccount,
      ),
    );
  } catch (err) {
    yield put(selectAccountErr(err));
  }
}

export function* selectKeycatAccountWorker() {
  try {
    const locale = yield select(makeSelectLocale());
    const translations = translationMessages[locale];
    let tipsKeycatEosService = yield select(selectTipsKeycatEosService());

    if (!tipsKeycatEosService) {
      tipsKeycatEosService = new Eosio();
      yield call(tipsKeycatEosService.initEosioWithoutScatter);
      yield put(addTipsKeycatEosService(tipsKeycatEosService));
    } else {
      yield call(tipsKeycatEosService.resetKeycatUserData);
    }

    const { accountName: keycatAccount } = yield call(
      tipsKeycatEosService.keycatSignIn,
    );

    if (!keycatAccount) {
      throw new WebIntegrationError(
        translations[messages[USER_IS_NOT_SELECTED].id],
      );
    }

    const receiver = (yield select(getFormValues(formName))).get(
      EOS_SEND_TO_ACCOUNT_FIELD,
    );

    if (receiver === keycatAccount) {
      throw new WebIntegrationError(
        translations[formFieldsMessages.exactFromAndToAccounts.id],
      );
    }

    yield put(selectKeycatAccountSuccess(keycatAccount));
  } catch (err) {
    yield put(selectAccountErr(err));
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
//       SEND_TIPS_TYPE,
//     );
//
//     if (!response.OK) {
//       throw new WebIntegrationError(
//         translations[webIntegrationErrors[response.errorCode].id],
//       );
//     }
//
//     yield put(setSendTipsProcessing(false));
//     yield put(showVerifyFbModal());
//   } catch (err) {
//     yield put(sendTipsErr(err));
//   }
// }

export function* sendAnotherCodeSuccess() {
  yield call(successHandling);
}

// export function* verifyFacebookActionWorker({ verifyFormVals }) {
//   try {
//     yield put(setSendTipsProcessing(true));
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
//       SEND_TIPS_TYPE,
//     );
//
//     if (!response.OK) {
//       throw new WebIntegrationError(
//         translations[webIntegrationErrors[response.errorCode].id],
//       );
//     }
//
//     const val = yield select(selectFbSendTipsFormValues());
//     yield sendTipsWorker(val);
//
//     yield put(reduxFormReset(VERIFY_FB_ACTION_FORM));
//   } catch (err) {
//     yield put(sendTipsErr(err));
//   }
// }

export default function* defaultSaga() {
  yield takeLatest(SELECT_SCATTER_ACCOUNT, selectScatterAccountWorker);
  yield takeLatest(SELECT_KEYCAT_ACCOUNT, selectKeycatAccountWorker);
  yield takeEvery(SEND_TIPS_NOTIFICATION, sendTipsNotificationWorker);
  // yield takeEvery(
  //   [SEND_FB_VERIFICATION_EMAIL, SEND_ANOTHER_CODE],
  //   sendEmailWorker,
  // );
  yield takeEvery(SEND_ANOTHER_CODE, sendAnotherCodeSuccess);
  // yield takeLatest(VERIFY_FB_ACTION, verifyFacebookActionWorker);
}
