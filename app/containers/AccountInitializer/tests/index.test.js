import { AccountInitializer } from '../index';

describe('<AccountInitializer />', () => {
  const account = {
    eosAccount: 'user1',
  };
  it('componentDidMount method has to return some object', () => {
    const mock = jest.fn().mockImplementation(() => account);
    AccountInitializer.props = jest.fn().mockImplementation(() => {});
    AccountInitializer.props.reviewAccountDispatch = mock;
    expect(AccountInitializer.componentDidMount()).toEqual(account);
  });
});
