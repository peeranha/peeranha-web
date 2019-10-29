import { FollowCommunityButton } from '../index';

const cmp = new FollowCommunityButton();

cmp.props = {
  communityIdFilter: 0,
  followedCommunities: [],
  followHandlerDispatch: jest.fn(),
  render: jest.fn(),
};

const event = {
  preventDefault: jest.fn(),
  currentTarget: {
    dataset: { isfollowed: false },
    id: '123',
  },
};

describe('<FollowCommunityButton />', () => {
  describe('followHandler', () => {
    cmp.followHandler(event);
    expect(cmp.props.followHandlerDispatch).toHaveBeenCalledWith(
      cmp.props.communityIdFilter,
      JSON.parse(event.currentTarget.dataset.isfollowed),
      event.currentTarget.id,
    );
  });

  describe('render', () => {
    it('followedCommunities NULL', () => {
      cmp.props.followedCommunities = null;

      cmp.render();
      expect(cmp.props.render).toHaveBeenCalledWith({
        onClick: cmp.followHandler,
        isFollowed: false,
        id: `follow_community_${cmp.props.communityIdFilter}`,
      });
    });

    it('isFollowed - true, followedCommunities [1, 2]', () => {
      cmp.props.followedCommunities = [1, 2];
      cmp.props.communityIdFilter = 1;

      cmp.render();
      expect(cmp.props.render).toHaveBeenCalledWith({
        onClick: cmp.followHandler,
        isFollowed: true,
        id: `follow_community_${cmp.props.communityIdFilter}`,
      });
    });

    it('isFollowed - false, followedCommunities [1, 2]', () => {
      cmp.props.followedCommunities = [1, 2];
      cmp.props.communityIdFilter = 3;

      cmp.render();
      expect(cmp.props.render).toHaveBeenCalledWith({
        onClick: cmp.followHandler,
        isFollowed: false,
        id: `follow_community_${cmp.props.communityIdFilter}`,
      });
    });
  });
});
