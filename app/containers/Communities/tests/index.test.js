import React from 'react';

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

beforeEach(() => {
  jest.clearAllMocks();
});

describe('<Communities />', () => {
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
