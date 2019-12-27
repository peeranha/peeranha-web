import React from 'react';
import { Profile } from '../index';

const children = <div>Children</div>;
React.Children.only = jest.fn().mockImplementation(() => children);

const cmp = new Profile();
cmp.props = {
  children: null,
  userId: 'userId',
  profile: {
    profile: {},
  },
  locale: 'en',
  isProfileLoading: false,
  getUserProfileDispatch: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Profile', () => {
  it('render', () => {
    expect(cmp.render()).toMatchSnapshot();
  });

  it('componentDidMount', () => {
    const userId = 'user111';

    cmp.props.userId = userId;
    cmp.componentDidMount();
    expect(cmp.props.getUserProfileDispatch).toHaveBeenCalledWith(userId, true);
  });

  describe('componentWillReceiveProps', () => {
    it('nextProps.userId !== this.props.userId', () => {
      const nextProps = {
        userId: 'user2222',
      };

      cmp.props.userId = 'user1111';

      cmp.componentWillReceiveProps(nextProps);
      expect(cmp.props.getUserProfileDispatch).toHaveBeenCalledWith(
        nextProps.userId,
        true,
      );
    });
  });
});
