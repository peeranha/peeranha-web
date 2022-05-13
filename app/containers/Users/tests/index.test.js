import Users from '../index';

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
    eosService: null,
    stat: {},
  };
});

describe('Users', () => {
  describe('componentDidMount', () => {
    it('fetcher was initialized', () => {
      cmp.props.eosService = {};

      expect(cmp.props.getUsersDispatch).toHaveBeenCalledTimes(0);
      cmp.componentDidMount();
      expect(cmp.props.getUsersDispatch).toHaveBeenCalledWith({
        loadMore: false,
        fetcher: cmp.fetcher,
      });
    });

    it('fetcher was NOT initialized', () => {
      cmp.eosService = null;

      expect(cmp.props.getUsersDispatch).toHaveBeenCalledTimes(0);
      cmp.componentDidMount();
      expect(cmp.props.getUsersDispatch).toHaveBeenCalledTimes(0);
    });
  });

  describe('initFetcher', () => {
    it('fetcher, eosService are null => it will not be init', () => {
      cmp.props.eosService = null;
      cmp.fetcher = null;

      cmp.componentDidMount();
      expect(cmp.fetcher).toBe(null);
    });

    it('fetcher is null, eosService is TRUE => it will be init', () => {
      cmp.props.eosService = {};
      cmp.fetcher = null;

      cmp.componentDidMount();
      expect(!!cmp.fetcher).toBe(true);
    });
  });

  describe('getMoreUsers', () => {
    it('fetcher is true', () => {
      cmp.props.eosService = {};

      expect(cmp.props.getUsersDispatch).toHaveBeenCalledTimes(0);
      cmp.getMoreUsers();
      expect(cmp.props.getUsersDispatch).toHaveBeenCalledWith({
        loadMore: true,
        fetcher: cmp.fetcher,
      });
    });

    it('fetcher is false', () => {
      cmp.eosService = null;

      expect(cmp.props.getUsersDispatch).toHaveBeenCalledTimes(0);
      cmp.componentDidMount();
      expect(cmp.props.getUsersDispatch).toHaveBeenCalledTimes(0);
    });
  });

  describe('dropdownFilter', () => {
    it('fetcher was initialized', () => {
      const sorting = 'rating';

      cmp.props.eosService = {};

      cmp.dropdownFilter(sorting);
      expect(cmp.props.getUsersDispatch).toHaveBeenCalledWith({
        sorting,
        fetcher: cmp.fetcher,
      });
    });

    it('fetcher was not init', () => {
      const sorting = 'rating';

      cmp.props.eosService = null;

      cmp.dropdownFilter(sorting);
      expect(cmp.props.getUsersDispatch).toHaveBeenCalledTimes(0);
    });
  });

  it('render', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
