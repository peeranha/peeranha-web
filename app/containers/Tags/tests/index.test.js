import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { Tags, goToCreateTagScreen } from '../index';
import { createTagValidator } from '../validate';

const cmp = new Tags();

beforeEach(() => {
  cmp.props = {
    locale: 'en',
    sorting: 'id',
    profile: {},
    showLoginModalDispatch: jest.fn(),
    getSuggestedTagsDispatch: jest.fn(),
    getExistingTagsDispatch: jest.fn(),
    Aside: null,
    Content: null,
    sortTags: jest.fn(),
    tagsNumber: 10,
    currentCommunity: {
      tags: [],
    },
    communities: [],
    communityId: 1,
  };
});

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

jest.mock('../validate', () => ({
  createTagValidator: jest.fn(),
}));

describe('<Tags />', () => {
  describe('goToCreateTagScreen', () => {
    it('profile is NULL', () => {
      expect(cmp.props.showLoginModalDispatch).toHaveBeenCalledTimes(0);

      const step = goToCreateTagScreen({
        profile: null,
        showLoginModalDispatch: cmp.props.showLoginModalDispatch,
        locale: cmp.props.locale,
        communityId: cmp.props.communityId,
      });

      expect(step).toBe(null);
      expect(cmp.props.showLoginModalDispatch).toHaveBeenCalledTimes(1);
    });

    it('isValid is FALSE', () => {
      createTagValidator.mockImplementation(() => false);

      const step = goToCreateTagScreen({
        profile: {},
        showLoginModalDispatch: cmp.props.showLoginModalDispatch,
        locale: cmp.props.locale,
        communityId: cmp.props.communityId,
      });

      expect(step).toBe(null);
      expect(createTagValidator).toHaveBeenCalledTimes(1);
    });

    it('isValid is TRUE', () => {
      createTagValidator.mockImplementation(() => true);

      const step = goToCreateTagScreen({
        profile: {},
        showLoginModalDispatch: cmp.props.showLoginModalDispatch,
        locale: cmp.props.locale,
        communityId: cmp.props.communityId,
      });

      expect(step).not.toBe(null);
      expect(createdHistory.push).toHaveBeenCalledWith(
        routes.tagsCreate(cmp.props.communityId),
      );
    });
  });

  it('componentDidMount', () => {
    const {
      communityId,
      getSuggestedTagsDispatch,
      getExistingTagsDispatch,
    } = cmp.props;

    expect(getExistingTagsDispatch).toHaveBeenCalledTimes(0);
    expect(getSuggestedTagsDispatch).toHaveBeenCalledTimes(0);

    cmp.componentDidMount();

    expect(getExistingTagsDispatch).toHaveBeenCalledWith({ communityId });
    expect(getSuggestedTagsDispatch).toHaveBeenCalledWith({ communityId });
  });

  describe('componentDidUpdate', () => {
    it('communities.length is 0', () => {
      cmp.props.communities = [];
      cmp.componentDidUpdate({
        communities: [],
      });

      expect(cmp.props.getExistingTagsDispatch).toHaveBeenCalledTimes(0);
    });

    it('communities.length is 0', () => {
      cmp.props.communities = [{ id: 1 }];
      cmp.componentDidUpdate({
        communities: [],
      });

      expect(cmp.props.getExistingTagsDispatch).toHaveBeenCalledWith({
        communityId: cmp.props.communityId,
      });
    });
  });

  describe('render', () => {
    it('!currentCommunity.tags.length', () => {
      cmp.props.currentCommunity.tags = [];
      expect(cmp.render()).toMatchSnapshot();
    });

    it('currentCommunity.tags.length > 0', () => {
      cmp.props.currentCommunity.tags = Array(1).fill({});
      expect(cmp.render()).toMatchSnapshot();
    });
  });
});
