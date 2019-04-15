import React from 'react';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { createCommunityValidator } from '../validate';
import { Communities } from '../index';

const cmp = new Communities();

cmp.props = {
  locale: 'en',
  communities: [],
  communitiesLoading: true,
  suggestedCommunities: [],
  suggestedCommunitiesLoading: true,
  isLastFetch: false,
  changeSorting: jest.fn(),
  showLoginModalDispatch: jest.fn(),
  getSuggestedCommunitiesDispatch: jest.fn(),
  sorting: {},
  Content: () => <div>123</div>,
  Aside: () => <div>123</div>,
  SubHeader: () => <div>123</div>,
};

jest.mock('../validate', () => ({
  createCommunityValidator: jest.fn(),
}));

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('<Communities />', () => {
  describe('goToCreateCommunityScreen', () => {
    it('profile NULL', () => {
      cmp.props.profile = null;

      expect(cmp.goToCreateCommunityScreen()).toBe(null);
      expect(cmp.props.showLoginModalDispatch).toHaveBeenCalled();
    });

    it('profile is {}, isValid = true', () => {
      const isValid = true;
      cmp.props.profile = {};

      createCommunityValidator.mockImplementation(() => isValid);
      expect(createdHistory.push).toHaveBeenCalledTimes(0);

      expect(cmp.goToCreateCommunityScreen()).not.toBe(null);

      expect(createdHistory.push).toHaveBeenCalledWith(
        routes.communitiesCreate(),
      );
      expect(createdHistory.push).toHaveBeenCalledTimes(1);
    });

    it('profile is {}, isValid = false', () => {
      const isValid = false;
      cmp.props.profile = {};

      createCommunityValidator.mockImplementation(() => isValid);
      expect(cmp.goToCreateCommunityScreen()).toBe(null);
    });
  });

  describe('render', () => {
    it('communities []', () => {
      cmp.props.communities = [];
      expect(cmp.render()).toMatchSnapshot();
    });

    it('communities [{ id: 1 }]', () => {
      cmp.props.communities = [{ id: 1 }];
      expect(cmp.render()).toMatchSnapshot();
    });
  });

  describe('componentDidMount', () => {
    it('test', () => {
      expect(cmp.props.getSuggestedCommunitiesDispatch).toHaveBeenCalledTimes(
        0,
      );
      cmp.componentDidMount();
      expect(cmp.props.getSuggestedCommunitiesDispatch).toHaveBeenCalledTimes(
        1,
      );
    });
  });

  describe('getSuggestedCommunities', () => {
    it('test', () => {
      expect(cmp.props.getSuggestedCommunitiesDispatch).toHaveBeenCalledTimes(
        0,
      );
      cmp.getSuggestedCommunities();
      expect(cmp.props.getSuggestedCommunitiesDispatch).toHaveBeenCalledTimes(
        1,
      );
    });
  });
});
