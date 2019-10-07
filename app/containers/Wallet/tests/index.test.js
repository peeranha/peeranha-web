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
    it('account truthy', () => {
      expect(cmp.props.getWeekStatDispatch).toHaveBeenCalledTimes(0);

      cmp.props.account = 'account';
      cmp.componentDidMount();

      expect(cmp.props.getWeekStatDispatch).toHaveBeenCalledTimes(1);
    });

    it('account falsy', () => {
      expect(cmp.props.getWeekStatDispatch).toHaveBeenCalledTimes(0);

      cmp.props.account = null;
      cmp.componentDidMount();

      expect(cmp.props.getWeekStatDispatch).toHaveBeenCalledTimes(0);
    });
  });

  describe('componentDidUpdate', () => {
    it('call getWeekStatDispatch', () => {
      const prevProps = { account: null };

      expect(cmp.props.getWeekStatDispatch).toHaveBeenCalledTimes(0);

      cmp.props.account = 'account';
      cmp.componentDidUpdate(prevProps);

      expect(cmp.props.getWeekStatDispatch).toHaveBeenCalledTimes(1);
    });

    it('account falsy', () => {
      const prevProps = { account: null };

      expect(cmp.props.getWeekStatDispatch).toHaveBeenCalledTimes(0);

      cmp.props.account = null;
      cmp.componentDidUpdate(prevProps);

      expect(cmp.props.getWeekStatDispatch).toHaveBeenCalledTimes(0);
    });

    it('prevProps account truthy', () => {
      const prevProps = { account: 'account' };

      expect(cmp.props.getWeekStatDispatch).toHaveBeenCalledTimes(0);

      cmp.props.account = 'account';
      cmp.componentDidUpdate(prevProps);

      expect(cmp.props.getWeekStatDispatch).toHaveBeenCalledTimes(0);
    });
  });
});
