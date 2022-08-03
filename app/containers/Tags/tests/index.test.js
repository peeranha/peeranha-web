import { Tags } from '../index';

const cmp = new Tags();

beforeEach(() => {
  cmp.props = {
    locale: 'en',
    sorting: 'id',
    profile: {},
    showLoginModalDispatch: jest.fn(),
    getSuggestedTagsDispatch: jest.fn(),
    getExistingTagsDispatch: jest.fn(),
    Aside: null,
    Content: null,
    sortTags: jest.fn(),
    tagsNumber: 10,
    currentCommunity: {
      tags: [],
    },
    communities: [],
    communityId: 1,
  };
});

describe('<Tags />', () => {
  it('componentDidMount', () => {
    const {
      communityId,
      getSuggestedTagsDispatch,
      getExistingTagsDispatch,
    } = cmp.props;

    expect(getExistingTagsDispatch).toHaveBeenCalledTimes(0);
    expect(getSuggestedTagsDispatch).toHaveBeenCalledTimes(0);

    cmp.componentDidMount();

    expect(getExistingTagsDispatch).toHaveBeenCalledWith({ communityId });
    expect(getSuggestedTagsDispatch).toHaveBeenCalledWith({ communityId });
  });

  describe('componentDidUpdate', () => {
    it('communities.length is 0', () => {
      cmp.props.communities = [];
      cmp.componentDidUpdate({
        communities: [],
      });

      expect(cmp.props.getExistingTagsDispatch).toHaveBeenCalledTimes(0);
    });

    it('communities.length is 0', () => {
      cmp.props.communities = [{ id: 1 }];
      cmp.componentDidUpdate({
        communities: [],
      });

      expect(cmp.props.getExistingTagsDispatch).toHaveBeenCalledWith({
        communityId: cmp.props.communityId,
      });
    });
  });
});
