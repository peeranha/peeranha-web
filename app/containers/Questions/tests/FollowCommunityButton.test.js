import FollowCommunityButton from '../FollowCommunityButton';

describe('FollowCommunityButton', () => {
  const props = {
    communityIdFilter: 0,
    followedCommunities: [],
    translations: {},
    followHandler: jest.fn(),
  };

  it('followedCommunities is false', () => {
    props.followedCommunities = null;
    expect(FollowCommunityButton(props)).toMatchSnapshot();
  });

  it('followedCommunities is true; communityIdFilter is 0', () => {
    props.followedCommunities = [];
    props.communityIdFilter = 0;
    expect(FollowCommunityButton(props)).toMatchSnapshot();
  });

  it('followedCommunities is true; communityIdFilter > 0', () => {
    props.followedCommunities = true;
    props.communityIdFilter = 1;
    props.followedCommunities = [1];
    expect(FollowCommunityButton(props)).toMatchSnapshot();
  });
});
