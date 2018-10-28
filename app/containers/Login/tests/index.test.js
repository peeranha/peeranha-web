import {
  NO_SCATTER,
  NO_SELECTED_SCATTER_ACCOUNTS,
  USER_IS_ABSENT_IN_SYSTEM_AND_LOGIN,
} from 'containers/SignUp/constants';

import { Login, mapDispatchToProps } from '../index';
import { SHOW_DEFAULT_LOGIN_MODAL, COMPLETE_LOGIN } from '../constants';

const cmp = new Login();
cmp.props = {
  content: '',
  forgetIdentityDispatch: jest.fn(),
  reloadAppDispatch: jest.fn(),
  showModal: true,
  userIsInSystem: true,
  hideLoginModalDispatch: jest.fn(),
  showLoginModalDispatch: jest.fn(),
};

describe('mapDispatchToProps', () => {
  it('mapDispatchToProps test', () => {
    const test = 'test';
    const obj = {};
    const dispatch = () => test;

    expect(typeof mapDispatchToProps(dispatch) === 'object').toBe(true);
    expect(mapDispatchToProps(dispatch).dispatch).toBe(dispatch);
    expect(mapDispatchToProps(dispatch).reloadAppDispatch()).toBe(test);
    expect(mapDispatchToProps(dispatch).loginSignupDispatch(obj)).toBe(test);
    expect(mapDispatchToProps(dispatch).showLoginModalDispatch()).toBe(test);
    expect(mapDispatchToProps(dispatch).showSignUpModalDispatch()).toBe(test);
    expect(mapDispatchToProps(dispatch).hideLoginModalDispatch()).toBe(test);
    expect(mapDispatchToProps(dispatch).forgetIdentityDispatch()).toBe(test);
  });
});

describe('<Login />', () => {
  describe('render', () => {
    it('NO_SCATTER', () => {
      cmp.props.content = NO_SCATTER;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('NO_SELECTED_SCATTER_ACCOUNTS', () => {
      cmp.props.content = NO_SELECTED_SCATTER_ACCOUNTS;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('USER_IS_ABSENT_IN_SYSTEM_AND_LOGIN', () => {
      cmp.props.content = USER_IS_ABSENT_IN_SYSTEM_AND_LOGIN;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('SHOW_DEFAULT_LOGIN_MODAL', () => {
      cmp.props.content = SHOW_DEFAULT_LOGIN_MODAL;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('COMPLETE_LOGIN', () => {
      cmp.props.content = COMPLETE_LOGIN;
      expect(cmp.render()).toMatchSnapshot();
    });
  });
});

describe('openSignUpWindow', () => {
  const hideLoginModalDispatch = jest.fn();
  const showSignUpModalDispatch = jest.fn();

  cmp.props.hideLoginModalDispatch = hideLoginModalDispatch;
  cmp.props.showSignUpModalDispatch = showSignUpModalDispatch;

  expect(hideLoginModalDispatch).toHaveBeenCalledTimes(0);
  expect(showSignUpModalDispatch).toHaveBeenCalledTimes(0);

  cmp.openSignUpWindow();

  expect(hideLoginModalDispatch).toHaveBeenCalledTimes(1);
  expect(showSignUpModalDispatch).toHaveBeenCalledTimes(1);
});

describe('backToOptions', () => {
  const showLoginModalDispatch = jest.fn();
  cmp.props.showLoginModalDispatch = showLoginModalDispatch;

  expect(showLoginModalDispatch).toHaveBeenCalledTimes(0);
  cmp.backToOptions();
  expect(showLoginModalDispatch).toHaveBeenCalledTimes(1);
});

describe('continueLogin', () => {
  const loginSignupDispatch = jest.fn();
  cmp.props.loginSignupDispatch = loginSignupDispatch;

  expect(loginSignupDispatch).toHaveBeenCalledTimes(0);
  cmp.continueLogin();
  expect(loginSignupDispatch).toHaveBeenCalledTimes(1);
});

describe('componentDidUpdate', () => {
  cmp.props.showLoginModalDispatch = jest.fn();

  it('COMPLETE_LOGIN is not in localStorage', () => {
    localStorage.clear();

    expect(cmp.props.showLoginModalDispatch).toHaveBeenCalledTimes(0);
    cmp.componentDidUpdate();
    expect(cmp.props.showLoginModalDispatch).toHaveBeenCalledTimes(0);
  });

  it('COMPLETE_LOGIN is in localStorage', () => {
    localStorage.setItem(COMPLETE_LOGIN, true);
    localStorage.setItem('scrollTo', 800);

    window.scrollTo = jest.fn();
    localStorage.clear = jest.fn();

    expect(cmp.props.showLoginModalDispatch).toHaveBeenCalledTimes(0);
    expect(window.scrollTo).toHaveBeenCalledTimes(0);

    cmp.componentDidUpdate();

    expect(cmp.props.showLoginModalDispatch).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });
});
