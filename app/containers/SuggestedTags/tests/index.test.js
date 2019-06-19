import { SuggestedTags } from '../index';

const cmp = new SuggestedTags();

const ev = {
  currentTarget: {
    dataset: {
      key: 'key',
    },
  },
};

beforeEach(() => {
  cmp.props = {
    locale: 'en',
    communities: [{ id: 1, tags: [] }, { id: 2, tags: [] }],
    isLastFetch: false,
    suggestedTagsLoading: false,
    existingTags: [{ id: 1 }, { id: 2 }],
    match: { params: { communityid: 1 } },
    emptyCommunity: { tags: [] },
    getSuggestedTagsDispatch: jest.fn(),
  };
});

describe('SuggestedTags', () => {
  it('sortTags', () => {
    expect(cmp.props.getSuggestedTagsDispatch).toHaveBeenCalledTimes(0);

    cmp.render();
    cmp.sortTags(ev);

    expect(cmp.props.getSuggestedTagsDispatch).toHaveBeenCalledWith({
      sorting: ev.currentTarget.dataset.key,
      communityId: cmp.currentCommunity.id,
    });
  });

  it('loadMoreTags', () => {
    expect(cmp.props.getSuggestedTagsDispatch).toHaveBeenCalledTimes(0);

    cmp.render();
    cmp.loadMoreTags();

    expect(cmp.props.getSuggestedTagsDispatch).toHaveBeenCalledWith({
      loadMore: true,
      communityId: cmp.currentCommunity.id,
    });
  });

  it('render', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
