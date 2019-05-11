import { VoteForNewTagButton } from '../index';
import { UPVOTE_METHOD, DOWNVOTE_METHOD } from '../constants';

const cmp = new VoteForNewTagButton();

cmp.props = {
  communityId: 1,
  tagId: 1,
  buttonId: 1,
  upVoteDispatch: jest.fn(),
  downVoteDispatch: jest.fn(),
  suggestedTags: [
    { id: 1, upvotes: ['user1'], downvotes: [] },
    { id: 2, upvotes: [], downvotes: ['user1'] },
  ],
  account: 'user1',
  clickMethod: UPVOTE_METHOD,
  render: jest.fn(),
};

describe('<VoteForNewTagButton />', () => {
  it('downVote', () => {
    cmp[DOWNVOTE_METHOD]();
    expect(cmp.props.downVoteDispatch).toHaveBeenCalledWith(
      cmp.props.communityId,
      cmp.props.tagId,
      cmp.props.buttonId,
    );
  });

  it('upVote', () => {
    cmp[UPVOTE_METHOD]();
    expect(cmp.props.upVoteDispatch).toHaveBeenCalledWith(
      cmp.props.communityId,
      cmp.props.tagId,
      cmp.props.buttonId,
    );
  });

  describe('render', () => {
    it('test', () => {
      expect(cmp.render()).toMatchSnapshot();
    });
  });
});
