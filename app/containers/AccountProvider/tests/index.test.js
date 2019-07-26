import { AccountProvider } from '../index';

const cmp = new AccountProvider();
cmp.props = {
  getCurrentAccountDispatch: jest.fn(),
};

describe('<AccountProvider />', () => {
  it('componentDidMount', async () => {
    await cmp.componentDidMount();
    expect(cmp.props.getCurrentAccountDispatch).toHaveBeenCalled();
  });

  it('render', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
