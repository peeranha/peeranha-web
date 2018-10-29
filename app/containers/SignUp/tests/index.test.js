import createdHistory from 'createdHistory';
import { SignUp, mapDispatchToProps } from '../index';

import {
  COMPLETE_SIGNUP,
  SHOW_DEFAULT_SIGNUP_MODAL,
  USER_IS_ABSENT_IN_SYSTEM_AND_SIGNUP,
  USER_IS_IN_SYSTEM_AND_SIGNUP,
  NO_SELECTED_SCATTER_ACCOUNTS,
  NO_SCATTER,
} from '../constants';

const cmp = new SignUp();
cmp.props = {
  loading: false,
  error: null,
  account: 'user',
  locale: 'en',
  content: null,
  showModal: true,
  hideSignUpModalDispatch: jest.fn(),
};

jest.mock('createdHistory');
createdHistory.push.mockImplementation(res => res);

describe('mapDispatchToProps', () => {
  it('mapDispatchToProps test', () => {
    const test = 'test';
    const obj = {};
    const dispatch = () => test;

    expect(typeof mapDispatchToProps(dispatch) === 'object').toBe(true);
    expect(mapDispatchToProps(dispatch).dispatch).toBe(dispatch);
    expect(mapDispatchToProps(dispatch).registerUserDispatch(obj)).toBe(test);
    expect(mapDispatchToProps(dispatch).setReducerDefaultDispatch()).toBe(test);
    expect(mapDispatchToProps(dispatch).loginSignupDispatch(obj)).toBe(test);
    expect(mapDispatchToProps(dispatch).reloadAppDispatch()).toBe(test);
    expect(mapDispatchToProps(dispatch).showSignUpModalDispatch()).toBe(test);
    expect(mapDispatchToProps(dispatch).hideSignUpModalDispatch()).toBe(test);
    expect(mapDispatchToProps(dispatch).hideSignUpModalDispatch()).toBe(test);
    expect(mapDispatchToProps(dispatch).showLoginModalDispatch()).toBe(test);
  });
});

describe('SignUp', () => {
  describe('snapshot render testing', () => {
    it('case 1: content === SHOW_DEFAULT_SIGNUP_MODAL', () => {
      cmp.props.content = SHOW_DEFAULT_SIGNUP_MODAL;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('case 2: content === USER_IS_ABSENT_IN_SYSTEM_AND_SIGNUP', () => {
      cmp.props.content = USER_IS_ABSENT_IN_SYSTEM_AND_SIGNUP;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('case 3: content === USER_IS_IN_SYSTEM_AND_SIGNUP', () => {
      cmp.props.content = USER_IS_IN_SYSTEM_AND_SIGNUP;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('case 4: content === NO_SELECTED_SCATTER_ACCOUNTS', () => {
      cmp.props.content = NO_SELECTED_SCATTER_ACCOUNTS;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('case 5: content === NO_SCATTER', () => {
      cmp.props.content = NO_SCATTER;
      expect(cmp.render()).toMatchSnapshot();
    });
  });
});

describe('openLoginWindow', () => {
  const hideSignUpModalDispatch = jest.fn();
  const showLoginModalDispatch = jest.fn();

  cmp.props.hideSignUpModalDispatch = hideSignUpModalDispatch;
  cmp.props.showLoginModalDispatch = showLoginModalDispatch;

  expect(hideSignUpModalDispatch).toHaveBeenCalledTimes(0);
  expect(showLoginModalDispatch).toHaveBeenCalledTimes(0);

  cmp.openLoginWindow();

  expect(hideSignUpModalDispatch).toHaveBeenCalledTimes(1);
  expect(showLoginModalDispatch).toHaveBeenCalledTimes(1);
});

describe('backToOptions', () => {
  const showSignUpModalDispatch = jest.fn();
  cmp.props.showSignUpModalDispatch = showSignUpModalDispatch;

  expect(showSignUpModalDispatch).toHaveBeenCalledTimes(0);
  cmp.backToOptions();
  expect(showSignUpModalDispatch).toHaveBeenCalledTimes(1);
});

describe('continueSignUp', () => {
  const loginSignupDispatch = jest.fn();
  cmp.props.loginSignupDispatch = loginSignupDispatch;

  expect(loginSignupDispatch).toHaveBeenCalledTimes(0);
  cmp.continueSignUp();
  expect(loginSignupDispatch).toHaveBeenCalledTimes(1);
});

describe('registerUser', () => {
  const newMap = new Map();
  const registerUserDispatch = jest.fn();
  cmp.props.registerUserDispatch = registerUserDispatch;

  expect(registerUserDispatch).toHaveBeenCalledTimes(0);
  cmp.registerUser(newMap);
  expect(registerUserDispatch).toHaveBeenCalledTimes(1);
});

describe('componentWillUnmount', () => {
  const setReducerDefaultDispatch = jest.fn();
  cmp.props.setReducerDefaultDispatch = setReducerDefaultDispatch;

  expect(setReducerDefaultDispatch).toHaveBeenCalledTimes(0);
  cmp.componentWillUnmount();
  expect(setReducerDefaultDispatch).toHaveBeenCalledTimes(1);
});

describe('componentDidUpdate', () => {
  cmp.props.showSignUpModalDispatch = jest.fn();

  it('COMPLETE_SIGNUP is not in localStorage', () => {
    localStorage.clear();

    expect(cmp.props.showSignUpModalDispatch).toHaveBeenCalledTimes(0);
    cmp.componentDidUpdate();
    expect(cmp.props.showSignUpModalDispatch).toHaveBeenCalledTimes(0);
  });

  it('COMPLETE_SIGNUP is in localStorage', () => {
    localStorage.setItem(COMPLETE_SIGNUP, true);
    localStorage.setItem('scrollTo', 800);

    window.scrollTo = jest.fn();
    localStorage.clear = jest.fn();

    expect(cmp.props.showSignUpModalDispatch).toHaveBeenCalledTimes(0);
    expect(window.scrollTo).toHaveBeenCalledTimes(0);

    cmp.componentDidUpdate();

    expect(cmp.props.showSignUpModalDispatch).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });

  it('case: @registered is false', () => {
    cmp.props.registered = false;

    expect(createdHistory.push).toHaveBeenCalledTimes(0);
    cmp.componentDidUpdate();
    expect(createdHistory.push).toHaveBeenCalledTimes(0);
  });

  it('case: @registered is true', () => {
    cmp.props.registered = true;

    expect(createdHistory.push).toHaveBeenCalledTimes(0);
    cmp.componentDidUpdate();
    expect(createdHistory.push).toHaveBeenCalledTimes(1);
  });
});
