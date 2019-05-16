import { TagsOfCommunity } from '../index';

const cmp = new TagsOfCommunity();

const ev = {
  target: {
    value: 'text',
  },
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
    existingTags: [{ id: 1 }, { id: 2 }],
    existingTagsLoading: false,
    isLastFetch: false,
    text: 'text',
    suggestedTags: [{ id: 12 }, { id: 23 }],
    emptyCommunity: { tags: [] },
    getExistingTagsDispatch: jest.fn(),
    match: { params: { communityid: 1 } },
  };
});

describe('<TagsOfCommunity />', () => {
  it('typeInput', () => {
    expect(cmp.props.getExistingTagsDispatch).toHaveBeenCalledTimes(0);

    cmp.render();
    cmp.typeInput(ev);

    expect(cmp.props.getExistingTagsDispatch).toHaveBeenCalledWith({
      communityId: cmp.currentCommunity.id,
      text: ev.target.value,
    });
  });

  it('sortTags', () => {
    expect(cmp.props.getExistingTagsDispatch).toHaveBeenCalledTimes(0);

    cmp.render();
    cmp.sortTags(ev);

    expect(cmp.props.getExistingTagsDispatch).toHaveBeenCalledWith({
      communityId: cmp.currentCommunity.id,
      sorting: ev.currentTarget.dataset.key,
    });
  });

  it('loadMoreTags', () => {
    expect(cmp.props.getExistingTagsDispatch).toHaveBeenCalledTimes(0);

    cmp.render();
    cmp.loadMoreTags();

    expect(cmp.props.getExistingTagsDispatch).toHaveBeenCalledWith({
      communityId: cmp.currentCommunity.id,
      loadMore: true,
    });
  });

  it('render', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
