import { VoteForNewCommunityButton } from '../index';
import { UPVOTE_METHOD, DOWNVOTE_METHOD } from '../constants';

const cmp = new VoteForNewCommunityButton();

cmp.props = {
  communityId: 1,
  clickMethod: UPVOTE_METHOD,
  render: jest.fn(),
  suggestedCommunities: [],
  account: 'user1',
  id: 'uniq_id',
  upVoteDispatch: jest.fn(),
  downVoteDispatch: jest.fn(),
};

describe('<VoteForNewCommunityButton />', () => {
  it('downVote', () => {
    cmp[DOWNVOTE_METHOD]();
    expect(cmp.props.downVoteDispatch).toHaveBeenCalledWith(
      cmp.props.communityId,
      cmp.props.id,
    );
  });

  it('upVote', () => {
    cmp[UPVOTE_METHOD]();
    expect(cmp.props.upVoteDispatch).toHaveBeenCalledWith(
      cmp.props.communityId,
      cmp.props.id,
    );
  });
});
