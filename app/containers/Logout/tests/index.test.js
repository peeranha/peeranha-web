import { Logout } from '../index';

const props = {
  logoutDispatch: jest.fn(),
  children: null,
};

describe('<Logout />', () => {
  it('render snapshot', () => {
    expect(Logout(props)).toMatchSnapshot();
  });
});
