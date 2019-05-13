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
  };
});

describe('Users', () => {
  it('componentDidMount', () => {
    expect(cmp.props.getUsersDispatch).toHaveBeenCalledTimes(0);
    cmp.componentDidMount();
    expect(cmp.props.getUsersDispatch).toHaveBeenCalledWith({
      loadMore: false,
    });
  });

  it('getMoreUsers', () => {
    expect(cmp.props.getUsersDispatch).toHaveBeenCalledTimes(0);
    cmp.getMoreUsers();
    expect(cmp.props.getUsersDispatch).toHaveBeenCalledWith({ loadMore: true });
  });

  it('render', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
