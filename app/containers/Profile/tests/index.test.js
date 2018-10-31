import React from 'react';
import { Profile, mapDispatchToProps } from '../index';

const children = <div>Children</div>;
React.Children.only = jest.fn().mockImplementation(() => children);

const cmp = new Profile();
cmp.props = {
  getProfileInfoDispatch: jest.fn(),
  setDefaultPropsDispatch: jest.fn(),
  isProfileLoading: false,
  locale: 'en',
  profile: {
    eos: {
      display_name: 'user',
    },
  },
};

describe('Profile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('@isProfileLoading is true', () => {
      cmp.props.isProfileLoading = true;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('@isProfileLoading is false && @profile.eos is false', () => {
      cmp.props.isProfileLoading = false;
      cmp.props.profile.eos = null;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('@isProfileLoading is false && @profile.eos is true', () => {
      cmp.props.isProfileLoading = false;
      cmp.props.profile.eos = {};
      expect(cmp.render()).toMatchSnapshot();
    });
  });

  describe('mapDispatchToProps', () => {
    it('mapDispatchToProps test', () => {
      const test = 'test';
      const obj = {};
      const dispatch = () => test;

      expect(typeof mapDispatchToProps(dispatch) === 'object').toBe(true);
      expect(mapDispatchToProps(dispatch).dispatch).toBe(dispatch);
      expect(
        mapDispatchToProps(dispatch).getProfileInfoDispatch(obj, obj),
      ).toBe(test);
      expect(mapDispatchToProps(dispatch).setDefaultPropsDispatch()).toBe(test);
    });
  });

  describe('componentDidMount', () => {
    it('componentDidMount call check', () => {
      cmp.getProfile = jest.fn().mockImplementation(() => 'profile1');

      expect(cmp.getProfile).toHaveBeenCalledTimes(0);
      cmp.componentDidMount();
      expect(cmp.getProfile).toHaveBeenCalledTimes(1);
    });
  });

  describe('componentWillReceiveProps', () => {
    describe('componentWillReceiveProps', () => {
      const props = { userId: 'user1' };
      cmp.getProfile = jest.fn().mockImplementation(() => 'profile2');

      it('case: nextProps.userId === this.props.userId', () => {
        cmp.props.userId = 'user1';

        expect(cmp.getProfile).toHaveBeenCalledTimes(0);
        cmp.componentWillReceiveProps(props);
        expect(cmp.getProfile).toHaveBeenCalledTimes(0);
      });

      it('case: nextProps.userId !== this.props.userId', () => {
        cmp.props.userId = 'user2';

        expect(cmp.getProfile).toHaveBeenCalledTimes(0);
        cmp.componentWillReceiveProps(props);
        expect(cmp.getProfile).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('getProfile', () => {
    it('getProfile', () => {
      const cmp1 = new Profile();
      const profile = { id: 1 };

      cmp1.props = {};
      cmp1.props.getProfileInfoDispatch = jest
        .fn()
        .mockImplementation(() => profile);

      expect(cmp1.getProfile()).toEqual(profile);
    });
  });

  describe('componentWillUnmount', () => {
    it('componentWillUnmount test', () => {
      expect(cmp.props.setDefaultPropsDispatch).toHaveBeenCalledTimes(0);
      cmp.componentWillUnmount();
      expect(cmp.props.setDefaultPropsDispatch).toHaveBeenCalledTimes(1);
    });
  });
});
