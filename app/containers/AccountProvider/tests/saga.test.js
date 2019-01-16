/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { select } from 'redux-saga/effects';

import { isUserInSystem } from 'utils/accountManagement';

import {
  COMPLETE_SIGNUP,
  SHOW_SIGN_UP_MODAL,
  HIDE_SIGN_UP_MODAL,
} from 'containers/SignUp/constants';

import {
  COMPLETE_LOGIN,
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
} from 'containers/Login/constants';

import defaultSaga, {
  forgetIdentityWorker,
  getCurrentAccountWorker,
  setLoginSignupModalState,
  closeModals,
  loginSignupWorker,
} from '../saga';

import {
  FORGET_IDENTITY,
  FORGET_IDENTITY_SUCCESS,
  FORGET_IDENTITY_ERROR,
  GET_CURRENT_ACCOUNT,
  GET_CURRENT_ACCOUNT_SUCCESS,
  GET_CURRENT_ACCOUNT_ERROR,
  LOGIN_SIGNUP,
  LOGIN_SIGNUP_SUCCESS,
  LOGIN_SIGNUP_ERROR,
} from '../constants';

const account = 'user1';
const profileInfo = true;

jest.mock('redux-saga/effects', () => ({
  select: jest.fn().mockImplementation(() => {}),
  call: jest.fn().mockImplementation(func => func()),
  put: jest.fn().mockImplementation(res => res),
  takeEvery: jest.fn().mockImplementation(res => res),
}));

jest.mock('utils/accountManagement');
isUserInSystem.mockImplementation(() => profileInfo);

describe('getCurrentAccountWorker', () => {
  const generator = getCurrentAccountWorker();
  const scatter = {
    scatterInstalled: true,
    initialized: true,
    getSelectedAccount: () => account,
  };

  it('selectDescriptor step1', () => {
    select.mockImplementationOnce(() => scatter);
    const selectDescriptor = generator.next();
    expect(selectDescriptor.value).toEqual(scatter);
  });

  it('selectedScatterAccount step2', () => {
    const selectedScatterAccount = generator.next(scatter);
    expect(selectedScatterAccount.value).toEqual(account);
  });

  it('profileInfo step3', () => {
    const user = generator.next(account);
    expect(user.value).toEqual(profileInfo);
  });

  it('putDescriptor step4', () => {
    const putDescriptor = generator.next();
    expect(putDescriptor.value.type).toEqual(GET_CURRENT_ACCOUNT_SUCCESS);
  });

  it('errorHandling step5', () => {
    const err = new Error('Some error');
    const putDescriptor = generator.throw(err).value;
    expect(putDescriptor.type).toEqual(GET_CURRENT_ACCOUNT_ERROR);
  });
});

describe('setLoginSignupModalState', () => {
  const message = 'some message';

  describe('COMPLETE_SIGNUP type', () => {
    const generator = setLoginSignupModalState(COMPLETE_SIGNUP, message);

    it('hideLoginModal', () => {
      const hideLoginModal = generator.next();
      expect(hideLoginModal.value.type).toBe(HIDE_LOGIN_MODAL);
    });

    it('showSignUpModal', () => {
      const showSignUpModal = generator.next();
      expect(showSignUpModal.value.type).toBe(SHOW_SIGN_UP_MODAL);
    });
  });

  describe('COMPLETE_LOGIN type', () => {
    const generator = setLoginSignupModalState(COMPLETE_LOGIN, message);

    it('hideSignUpModal', () => {
      const hideSignUpModal = generator.next();
      expect(hideSignUpModal.value.type).toBe(HIDE_SIGN_UP_MODAL);
    });

    it('showLoginModal', () => {
      const showLoginModal = generator.next();
      expect(showLoginModal.value.type).toBe(SHOW_LOGIN_MODAL);
    });
  });
});

describe('closeModals', () => {
  const generator = closeModals();

  it('hideSignUpModal', () => {
    const hideSignUpModal = generator.next();
    expect(hideSignUpModal.value.type).toBe(HIDE_SIGN_UP_MODAL);
  });

  it('hideLoginModal', () => {
    const hideLoginModal = generator.next();
    expect(hideLoginModal.value.type).toBe(HIDE_LOGIN_MODAL);
  });
});

describe('loginSignupWorker scatterInstalled: false', () => {
  const sendObj = {
    methods: {
      type: COMPLETE_SIGNUP,
    },
  };
  const generator = loginSignupWorker(sendObj);
  const scatter = {
    scatterInstalled: false,
  };

  it('selectEos step1', () => {
    select.mockImplementationOnce(() => scatter);
    const selectEos = generator.next();
    expect(selectEos.value).toBe(scatter);
  });

  it('scatterInstalled: false', () => {
    const isScatterInstalled = generator.next(scatter);
    /* eslint no-underscore-dangle: 1 */
    expect(!!isScatterInstalled.value._invoke).toBe(true);

    const nextStep = generator.next();
    expect(nextStep.done).toBe(true);
  });
});

describe('loginSignupWorker', () => {
  const sendObj = {
    methods: {
      type: COMPLETE_SIGNUP,
    },
  };

  describe('selectedScatterAccount: null', () => {
    const generator = loginSignupWorker(sendObj);
    const selectedScatterAccountAfter = null;
    const scatter = {
      scatterInstalled: true,
      selectedScatterAccount: null,
      selectAccount: () => selectedScatterAccountAfter,
    };

    it('selectedAccount value is @selectedScatterAccountAfter', () => {
      generator.next();
      const selectedAccount = generator.next(scatter);
      expect(selectedAccount.value).toBe(selectedScatterAccountAfter);
    });

    it('invoked function', () => {
      const isSelectedAccount = generator.next();
      /* eslint no-underscore-dangle: 1 */
      expect(!!isSelectedAccount.value._invoke).toBe(true);
    });

    it('next step is finish', () => {
      const nextStep = generator.next();
      expect(nextStep.done).toBe(true);
    });
  });

  describe('selectedScatterAccount: true, scatterInstalled: true', () => {
    const generator = loginSignupWorker(sendObj);
    const scatter = {
      scatterInstalled: true,
      selectedScatterAccount: true,
    };

    it('isUser: true', () => {
      generator.next();
      generator.next(scatter);
      const isUser = generator.next();
      expect(isUser.value).toBe(profileInfo);
    });

    it('invoked function', () => {
      const isUser = generator.next();
      /* eslint no-underscore-dangle: 1 */
      expect(!!isUser.value._invoke).toBe(true);
    });

    it('next step is finish', () => {
      const nextStep = generator.next();
      expect(nextStep.done).toBe(true);
    });
  });

  describe('there is user in system and COMPLETE_LOGIN', () => {
    const sendObjLogin = {
      methods: {
        type: COMPLETE_LOGIN,
      },
    };

    const generator = loginSignupWorker(sendObjLogin);
    const scatter = {
      scatterInstalled: true,
      selectedScatterAccount: true,
    };

    it('invoked function', () => {
      isUserInSystem.mockImplementationOnce(() => true);
      generator.next();
      generator.next(scatter);
      generator.next();

      const closeMdl = generator.next(true);
      /* eslint no-underscore-dangle: 1 */
      expect(!!closeMdl.value._invoke).toBe(true);
    });

    it('loginSignupSuccess putDescriptor', () => {
      const loginSignupSuccess = generator.next();
      expect(loginSignupSuccess.value.type).toBe(LOGIN_SIGNUP_SUCCESS);
    });

    it('loginSignupErr error handling', () => {
      const err = new Error('Some error');
      const putDescriptor = generator.throw(err).value;
      expect(putDescriptor.type).toEqual(LOGIN_SIGNUP_ERROR);
    });
  });

  describe('there is no user in system USER_IS_ABSENT_IN_SYSTEM_AND_SIGNUP', () => {
    const generator = loginSignupWorker(sendObj);
    const userInSystem = null;
    const scatter = {
      scatterInstalled: true,
      selectedScatterAccount: true,
    };

    it('isUser: null', () => {
      isUserInSystem.mockImplementationOnce(() => userInSystem);
      generator.next();
      generator.next(scatter);
      const isUser = generator.next();
      expect(isUser.value).toBe(userInSystem);
    });

    it('invoked function USER_IS_ABSENT_IN_SYSTEM_AND_SIGNUP', () => {
      const check = generator.next();
      /* eslint no-underscore-dangle: 1 */
      expect(!!check.value._invoke).toBe(true);
    });

    it('next step is finish', () => {
      const nextStep = generator.next();
      expect(nextStep.done).toBe(true);
    });
  });

  describe('there is no user in system USER_IS_ABSENT_IN_SYSTEM_AND_LOGIN', () => {
    const sendObjLogin = {
      methods: {
        type: COMPLETE_LOGIN,
      },
    };

    const generator = loginSignupWorker(sendObjLogin);
    const userInSystem = null;
    const scatter = {
      scatterInstalled: true,
      selectedScatterAccount: true,
    };

    isUserInSystem.mockImplementationOnce(() => userInSystem);
    generator.next();
    generator.next(scatter);
    generator.next();

    it('invoked function USER_IS_ABSENT_IN_SYSTEM_AND_LOGIN', () => {
      const check = generator.next();
      /* eslint no-underscore-dangle: 1 */
      expect(!!check.value._invoke).toBe(true);
    });

    it('next step is finish', () => {
      const nextStep = generator.next();
      expect(nextStep.done).toBe(true);
    });
  });
});

describe('forgetIdentityWorker test', () => {
  const generator = forgetIdentityWorker();
  const forgottenIdentity = true;
  const scatter = {
    forgetIdentity: () => forgottenIdentity,
  };

  it('eosService init step1', () => {
    select.mockImplementationOnce(() => scatter);
    const service = generator.next();
    expect(service.value).toEqual(scatter);
  });

  it('forgetIdentity step2', () => {
    const forgetIdentity = generator.next(scatter);
    expect(forgetIdentity.value).toBe(forgottenIdentity);
  });

  it('loginSignupWorker step3', () => {
    const loginSignupWrk = generator.next();
    expect(!!loginSignupWrk.value._invoke).toBe(true);
  });

  it('forgetIdentitySuccess step4', () => {
    const forgetIdentity = generator.next();
    expect(forgetIdentity.value.type).toBe(FORGET_IDENTITY_SUCCESS);
  });

  it('forgetIdentityError: error handling', () => {
    const err = new Error('Some error');
    const putDescriptor = generator.throw(err).value;
    expect(putDescriptor.type).toEqual(FORGET_IDENTITY_ERROR);
  });
});

describe('defaultSaga', () => {
  const generator = defaultSaga();

  it('GET_CURRENT_ACCOUNT', () => {
    const step = generator.next();
    expect(step.value).toBe(GET_CURRENT_ACCOUNT);
  });

  it('LOGIN_SIGNUP', () => {
    const step = generator.next();
    expect(step.value).toBe(LOGIN_SIGNUP);
  });

  it('FORGET_IDENTITY', () => {
    const step = generator.next();
    expect(step.value).toBe(FORGET_IDENTITY);
  });
});
