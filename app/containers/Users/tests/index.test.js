import { Users } from '../index';

const cmp = new Users();

beforeEach(() => {
  cmp.props = {
    locale: 'en',
    getUsersDispatch: jest.fn(),
    users: [],
    usersLoading: false,
    isLastFetch: false,
    sorting: 'id',
    searchText: 'user1',
    limit: 10,
    ethereumService: null,
    stat: {},
  };
});

describe('Users', () => {
  describe('componentDidMount', () => {
    it('fetcher was initialized', () => {
      cmp.props.ethereumService = {};

      expect(cmp.props.getUsersDispatch).toHaveBeenCalledTimes(0);
      cmp.componentDidMount();
      expect(cmp.props.getUsersDispatch).toHaveBeenCalledWith({
        loadMore: false,
        fetcher: cmp.fetcher,
      });
    });

    it('fetcher was NOT initialized', () => {
      cmp.ethereumService = null;

      expect(cmp.props.getUsersDispatch).toHaveBeenCalledTimes(0);
      cmp.componentDidMount();
      expect(cmp.props.getUsersDispatch).toHaveBeenCalledTimes(0);
    });
  });

  describe('initFetcher', () => {
    it('fetcher, ethereumService are null => it will not be init', () => {
      cmp.props.ethereumService = null;
      cmp.fetcher = null;

      cmp.componentDidMount();
      expect(cmp.fetcher).toBe(null);
    });

    it('fetcher is null, ethereumService is TRUE => it will be init', () => {
      cmp.props.ethereumService = {};
      cmp.fetcher = null;

      cmp.componentDidMount();
      expect(!!cmp.fetcher).toBe(true);
    });
  });

  describe('getMoreUsers', () => {
    it('fetcher is true', () => {
      cmp.props.ethereumService = {};

      expect(cmp.props.getUsersDispatch).toHaveBeenCalledTimes(0);
      cmp.getMoreUsers();
      expect(cmp.props.getUsersDispatch).toHaveBeenCalledWith({
        loadMore: true,
        fetcher: cmp.fetcher,
      });
    });

    it('fetcher is false', () => {
      cmp.ethereumService = null;

      expect(cmp.props.getUsersDispatch).toHaveBeenCalledTimes(0);
      cmp.componentDidMount();
      expect(cmp.props.getUsersDispatch).toHaveBeenCalledTimes(0);
    });
  });

  describe('dropdownFilter', () => {
    it('fetcher was initialized', () => {
      const sorting = 'rating';

      cmp.props.ethereumService = {};

      cmp.dropdownFilter(sorting);
      expect(cmp.props.getUsersDispatch).toHaveBeenCalledWith({
        sorting,
        fetcher: cmp.fetcher,
      });
    });

    it('fetcher was not init', () => {
      const sorting = 'rating';

      cmp.props.ethereumService = null;

      cmp.dropdownFilter(sorting);
      expect(cmp.props.getUsersDispatch).toHaveBeenCalledTimes(0);
    });
  });
});
