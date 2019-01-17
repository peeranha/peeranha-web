import { SuggestedCommunities } from '../index';

const cmp = new SuggestedCommunities();

cmp.props = {
  locale: 'en',
  communities: [],
  communitiesLoading: false,
  getSuggestedCommunitiesDispatch: jest.fn(),
  upVoteDispatch: jest.fn(),
  downVoteDispatch: jest.fn(),
};

const ev = {
  currentTarget: {
    dataset: {
      communityid: null,
    },
    id: null,
  },
};

describe('<SuggestedCommunities />', () => {
  it('componentDidMount', () => {
    cmp.componentDidMount();
    expect(cmp.props.getSuggestedCommunitiesDispatch).toHaveBeenCalled();
  });

  it('downVote', () => {
    const communityid = 'communityid';
    const id = 'id';

    ev.currentTarget.dataset.communityid = communityid;
    ev.currentTarget.id = id;

    cmp.downVote(ev);
    expect(cmp.props.downVoteDispatch).toHaveBeenCalledWith(communityid, id);
  });

  it('upVote', () => {
    const communityid = 'communityid';
    const id = 'id';

    ev.currentTarget.dataset.communityid = communityid;
    ev.currentTarget.id = id;

    cmp.upVote(ev);
    expect(cmp.props.upVoteDispatch).toHaveBeenCalledWith(communityid, id);
  });

  describe('render', () => {
    it('communitiesLoading TRUE', () => {
      cmp.props.communitiesLoading = true;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('communitiesLoading FALSE', () => {
      cmp.props.communitiesLoading = false;
      expect(cmp.render()).toMatchSnapshot();
    });
  });
});
