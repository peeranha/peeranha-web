/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';

import {
  changeCredentialsInit,
} from 'utils/web_integration/src/wallet/change-credentials/change-credentials';

import defaultSaga, { sendEmailWorker } from '../saga';

import {
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_ERROR,
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
} from '../constants';

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeLatest: jest.fn().mockImplementation(res => res),
}));

jest.mock(
  'utils/web_integration/src/wallet/change-credentials/change-credentials',
  () => ({
    changeCredentialsInit: jest.fn(),
    changeCredentialsConfirm: jest.fn(),
    changeCredentialsComplete: jest.fn(),
    changeCredentialsGetKeysByPwd: jest.fn(),
  }),
);

describe('deleteAccountWorker', () => {
  // const resetForm = jest.fn();
  // const locale = 'en';
  // const password = 'password';
  // const code = 'code';
  // const email = 'email';
  // const encryptionKey = 'encryptionKey';

  // const values = {
  //   [PASSWORD_FIELD]: password,
  //   [CODE_FIELD]: code,
  // };

  // describe('SUCCESS', () => {
  //   const generator = deleteAccountWorker({ resetForm, values });
  //
  //   const changeCredentialsConfirmResponse = {
  //     OK: true,
  //   };
  //
  //   const changeCredentialsGetKeysByPwdResponse = {
  //     OK: true,
  //     body: {
  //       encryptionKey,
  //     },
  //   };
  //
  //   const changeCredentialsCompleteResponse = {
  //     OK: true,
  //   };
  //
  //   changeCredentialsConfirm.mockImplementation(
  //     () => changeCredentialsConfirmResponse,
  //   );
  //
  //   changeCredentialsGetKeysByPwd.mockImplementation(
  //     () => changeCredentialsGetKeysByPwdResponse,
  //   );
  //
  //   changeCredentialsComplete.mockImplementation(
  //     () => changeCredentialsCompleteResponse,
  //   );
  //
  //   it('select email', () => {
  //     select.mockImplementation(() => email);
  //     const step = generator.next();
  //     expect(step.value).toEqual(email);
  //   });
  //
  //   it('select locale', () => {
  //     select.mockImplementation(() => locale);
  //     const step = generator.next(email);
  //     expect(step.value).toEqual(locale);
  //   });
  //
  //   it('call changeCredentialsConfirm', () => {
  //     generator.next(locale);
  //     expect(changeCredentialsConfirm).toHaveBeenCalledWith(email, code);
  //   });
  //
  //   it('call changeCredentialsGetKeysByPwd', () => {
  //     generator.next(changeCredentialsConfirmResponse);
  //     expect(changeCredentialsGetKeysByPwd).toHaveBeenCalledWith(
  //       email,
  //       password,
  //       code,
  //     );
  //   });
  //
  //   it('call changeCredentialsComplete', () => {
  //     generator.next(changeCredentialsGetKeysByPwdResponse);
  //     expect(changeCredentialsComplete).toHaveBeenCalledWith(
  //       null,
  //       email,
  //       encryptionKey,
  //     );
  //   });
  //
  //   it('logout', () => {
  //     const step = generator.next(changeCredentialsCompleteResponse);
  //     expect(step.value.type).toBe(LOGOUT);
  //   });
  //
  //   it('deleteAccountSuccess', () => {
  //     const step = generator.next();
  //     expect(step.value.type).toBe(DELETE_ACCOUNT_SUCCESS);
  //   });
  //
  //   it('call resetForm', () => {
  //     expect(resetForm).toHaveBeenCalledTimes(0);
  //     generator.next();
  //     expect(resetForm).toHaveBeenCalledTimes(1);
  //   });
  // });
  //
  // describe('FAILED, trying to get keys', () => {
  //   const generator = deleteAccountWorker({ resetForm, values });
  //
  //   const changeCredentialsConfirmResponse = {
  //     OK: true,
  //   };
  //
  //   const changeCredentialsGetKeysByPwdResponse = {
  //     OK: false,
  //     errorCode: 1,
  //   };
  //
  //   changeCredentialsConfirm.mockImplementation(
  //     () => changeCredentialsConfirmResponse,
  //   );
  //
  //   changeCredentialsGetKeysByPwd.mockImplementation(
  //     () => changeCredentialsGetKeysByPwdResponse,
  //   );
  //
  //   generator.next();
  //   generator.next(email);
  //   generator.next(locale);
  //   generator.next(changeCredentialsConfirmResponse);
  //
  //   it('error handling', () => {
  //     const step = generator.next(changeCredentialsConfirmResponse);
  //     expect(step.value.type).toBe(DELETE_ACCOUNT_ERROR);
  //   });
  // });
  //
  // describe('FAILED, verification code is Wrong', () => {
  //   const generator = deleteAccountWorker({ resetForm, values });
  //
  //   const changeCredentialsConfirmResponse = {
  //     OK: false,
  //     errorCode: 1,
  //   };
  //
  //   changeCredentialsConfirm.mockImplementation(
  //     () => changeCredentialsConfirmResponse,
  //   );
  //
  //   generator.next();
  //   generator.next(email);
  //   generator.next(locale);
  //
  //   it('error handling', () => {
  //     const step = generator.next(changeCredentialsConfirmResponse);
  //     expect(step.value.type).toBe(DELETE_ACCOUNT_ERROR);
  //   });
  // });
});

describe('sendEmailWorker', () => {
  const resetForm = jest.fn();
  const email = 'email';
  const locale = 'en';

  describe('sendEmailWorker FAILED', () => {
    const generator = sendEmailWorker({ resetForm, email });

    const response = {
      OK: false,
      errorCode: 1,
    };

    changeCredentialsInit.mockImplementation(() => response);

    it('select locale', () => {
      select.mockImplementation(() => locale);
      const step = generator.next();
      expect(step.value).toEqual(locale);
    });

    it('call changeCredentialsInit', () => {
      generator.next(locale);
      expect(changeCredentialsInit).toHaveBeenCalledWith(email);
    });

    it('error handling with talking toast', () => {
      const step = generator.next(response);
      expect(step.value.type).toBe(SEND_EMAIL_ERROR);
    });
  });

  describe('sendEmailWorker SUCCESS', () => {
    const generator = sendEmailWorker({ resetForm, email });

    const response = {
      OK: true,
    };

    changeCredentialsInit.mockImplementation(() => response);

    generator.next();
    generator.next(locale);

    it('finish with @sendEmailSuccess', () => {
      const step = generator.next(response);
      expect(step.value.type).toBe(SEND_EMAIL_SUCCESS);
    });

    it('resetForm', () => {
      expect(resetForm).toHaveBeenCalledTimes(0);
      generator.next();
      expect(resetForm).toHaveBeenCalledTimes(1);
    });
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('DELETE_ACCOUNT', () => {
    const step = generator.next();
    expect(step.value).toBe(DELETE_ACCOUNT);
  });

  it('SEND_EMAIL', () => {
    const step = generator.next();
    expect(step.value).toBe(SEND_EMAIL);
  });

  it('DELETE_ACCOUNT_ERROR', () => {
    const step = generator.next();
    expect(step.value).toEqual([SEND_EMAIL_ERROR, DELETE_ACCOUNT_ERROR]);
  });
});
