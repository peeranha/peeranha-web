import { noAccess } from 'routes-config';
import { Wallet } from '../index';

const cmp = new Wallet();

beforeEach(() => {
  cmp.props = {
    balance: null,
    locale: 'en',
    account: null,
    match: { params: { id: 'id' } },
    history: { push: jest.fn() },
    getWeekStatDispatch: jest.fn(),
    weekStat: [],
    getWeekStatProcessing: false,
  };
});

describe('Wallet', () => {
  it('render', () => {
    expect(cmp.render()).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('@account is truthy', () => {
      cmp.props.account = 'account';

      expect(cmp.props.getWeekStatDispatch).toHaveBeenCalledTimes(0);
      expect(cmp.props.history.push).toHaveBeenCalledTimes(0);

      cmp.componentDidMount();

      expect(cmp.props.getWeekStatDispatch).toHaveBeenCalledTimes(1);
      expect(cmp.props.history.push).toHaveBeenCalledTimes(0);
    });

    it('@account is null', () => {
      cmp.props.account = null;

      expect(cmp.props.getWeekStatDispatch).toHaveBeenCalledTimes(0);
      expect(cmp.props.history.push).toHaveBeenCalledTimes(0);

      cmp.componentDidMount();

      expect(cmp.props.getWeekStatDispatch).toHaveBeenCalledTimes(1);
      expect(cmp.props.history.push).toHaveBeenCalledTimes(1);
      expect(cmp.props.history.push).toHaveBeenCalledWith(noAccess());
    });
  });
});
