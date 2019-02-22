import { FollowCommunityButton } from '../index';

const cmp = new FollowCommunityButton();

cmp.props = {
  communityIdFilter: 0,
  followedCommunities: [],
  followHandlerDispatch: jest.fn(),
};

const event = {
  preventDefault: jest.fn(),
  currentTarget: {
    dataset: { isfollowed: false },
  },
};

describe('<FollowCommunityButton />', () => {
  describe('followHandler', () => {
    cmp.followHandler(event);
    expect(cmp.props.followHandlerDispatch).toHaveBeenCalledWith(
      cmp.props.communityIdFilter,
      JSON.parse(event.currentTarget.dataset.isfollowed),
    );
  });

  describe('render', () => {
    it('followedCommunities NULL', () => {
      cmp.props.followedCommunities = null;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('isFollowed - true, followedCommunities [1, 2]', () => {
      cmp.props.followedCommunities = [1, 2];
      cmp.props.communityIdFilter = 1;

      expect(cmp.render()).toMatchSnapshot();
    });

    it('isFollowed - false, followedCommunities [1, 2]', () => {
      cmp.props.followedCommunities = [1, 2];
      cmp.props.communityIdFilter = 3;

      expect(cmp.render()).toMatchSnapshot();
    });
  });
});
