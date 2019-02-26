import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { createTagValidator } from '../validate';
import { Tags } from '../index';

const cmp = new Tags();

cmp.props = {
  communities: [],
  locale: 'en',
  profile: null,
  showLoginModalDispatch: jest.fn(),
  match: {
    params: {
      communityid: '1',
    },
  },
};

jest.mock('../validate', () => ({
  createTagValidator: jest.fn(),
}));

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('<Tags />', () => {
  describe('goToCreateTagScreen', () => {
    it('profile NULL', () => {
      cmp.props.profile = null;

      expect(cmp.goToCreateTagScreen()).toBe(null);
      expect(cmp.props.showLoginModalDispatch).toHaveBeenCalled();
    });

    it('profile is {}, isValid = true', () => {
      const isValid = true;
      cmp.props.profile = {};

      createTagValidator.mockImplementation(() => isValid);
      expect(createdHistory.push).toHaveBeenCalledTimes(0);

      expect(cmp.goToCreateTagScreen()).not.toBe(null);

      expect(createdHistory.push).toHaveBeenCalledWith(
        routes.tagsCreate(cmp.props.match.params.communityid),
      );
      expect(createdHistory.push).toHaveBeenCalledTimes(1);
    });

    it('profile is {}, isValid = false', () => {
      const isValid = false;
      cmp.props.profile = {};

      createTagValidator.mockImplementation(() => isValid);
      expect(cmp.goToCreateTagScreen()).toBe(null);
    });
  });

  describe('render', () => {
    it('communities []', () => {
      cmp.props.communities = [];
      expect(cmp.render()).toMatchSnapshot();
    });

    it('communities [{ id: 1 }]', () => {
      cmp.props.communities = [{ id: 1, tags: [] }];
      expect(cmp.render()).toMatchSnapshot();
    });
  });
});
