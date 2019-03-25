import { SuggestedTags } from '../index';

const cmp = new SuggestedTags();

cmp.props = {
  locale: 'en',
  match: {
    params: {
      communityid: 1,
    },
  },
  tags: [],
  tagsLoading: false,
  getSuggestedTagsDispatch: jest.fn(),
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

describe('<SuggestedTags />', () => {
  it('componentDidMount', () => {
    cmp.componentDidMount();
    expect(cmp.props.getSuggestedTagsDispatch).toHaveBeenCalledWith(
      cmp.props.match.params.communityid,
    );
  });

  it('downVote', () => {
    const { communityid } = cmp.props.match.params;

    const id = 'id';
    const tagid = 'tagid';

    ev.currentTarget.dataset.tagid = tagid;
    ev.currentTarget.id = id;

    cmp.downVote(ev);
    expect(cmp.props.downVoteDispatch).toHaveBeenCalledWith(
      communityid,
      tagid,
      id,
    );
  });

  it('upVote', () => {
    const { communityid } = cmp.props.match.params;

    const tagid = 'tagid';
    const id = 'id';

    ev.currentTarget.dataset.tagid = tagid;
    ev.currentTarget.id = id;

    cmp.upVote(ev);
    expect(cmp.props.upVoteDispatch).toHaveBeenCalledWith(
      communityid,
      tagid,
      id,
    );
  });

  describe('render', () => {
    it('tagsLoading TRUE', () => {
      cmp.props.tagsLoading = true;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('communitiesLoading FALSE | tags.length', () => {
      cmp.props.tagsLoading = false;
      cmp.props.tags = [{}];
      expect(cmp.render()).toMatchSnapshot();
    });

    it('communitiesLoading FALSE | !tags.length', () => {
      cmp.props.tagsLoading = false;
      cmp.props.tags = [];
      expect(cmp.render()).toMatchSnapshot();
    });
  });
});
