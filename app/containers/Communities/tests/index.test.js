import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { createCommunityValidator } from '../validate';
import { Communities } from '../index';

const cmp = new Communities();

cmp.props = {
  communities: [],
  locale: 'en',
  profile: null,
  showLoginModalDispatch: jest.fn(),
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
        routes.communities_create(),
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
});
