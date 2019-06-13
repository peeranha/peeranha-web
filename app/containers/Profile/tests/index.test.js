import React from 'react';
import { Profile } from '../index';

const children = <div>Children</div>;
React.Children.only = jest.fn().mockImplementation(() => children);

const cmp = new Profile();
cmp.props = {
  getProfileInfoDispatch: jest.fn(),
  setDefaultPropsDispatch: jest.fn(),
  isProfileLoading: false,
  locale: 'en',
  profile: {
    profile: {},
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

    it('@isProfileLoading is false && @profile is false', () => {
      cmp.props.isProfileLoading = false;
      cmp.props.profile = null;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('@isProfileLoading is false && @profile is true', () => {
      cmp.props.isProfileLoading = false;
      cmp.props.profile = { profile: {} };
      expect(cmp.render()).toMatchSnapshot();
    });
  });

  describe('componentDidMount', () => {
    it('componentDidMount call check', () => {
      cmp.getProfile = jest.fn().mockImplementation(() => 'profile1');

      expect(cmp.props.getProfileInfoDispatch).toHaveBeenCalledTimes(0);
      cmp.componentDidMount();
      expect(cmp.props.getProfileInfoDispatch).toHaveBeenCalledTimes(1);
    });
  });

  describe('componentWillReceiveProps', () => {
    describe('componentWillReceiveProps', () => {
      const props = { userId: 'user1' };
      cmp.getProfile = jest.fn().mockImplementation(() => 'profile2');

      it('case: nextProps.userId === this.props.userId', () => {
        cmp.props.userId = 'user1';

        expect(cmp.props.getProfileInfoDispatch).toHaveBeenCalledTimes(0);
        cmp.componentWillReceiveProps(props);
        expect(cmp.props.getProfileInfoDispatch).toHaveBeenCalledTimes(0);
      });

      it('case: nextProps.userId !== this.props.userId', () => {
        cmp.props.userId = 'user2';

        expect(cmp.props.getProfileInfoDispatch).toHaveBeenCalledTimes(0);
        cmp.componentWillReceiveProps(props);
        expect(cmp.props.getProfileInfoDispatch).toHaveBeenCalledTimes(1);
      });
    });
  });
});
