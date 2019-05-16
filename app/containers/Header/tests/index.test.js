import { Header } from '../index';

const cmp = new Header();

cmp.props = {
  account: 'account',
  profileInfo: {},
  showSignUpModalDispatch: jest.fn(),
  showLoginModalDispatch: jest.fn(),
  isMenuVisible: false,
  showMenu: jest.fn(),
  expandLeftMenuNavigation: jest.fn(),
};

describe('<Header />', () => {
  it('snapshot test', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
