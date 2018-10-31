import { Header, mapDispatchToProps } from '../index';

const cmp = new Header();
cmp.props = {};
cmp.props = {
  account: 'user',
  userIsInSystem: false,
  showSignUpModalDispatch: jest.fn(),
  showLoginModalDispatch: jest.fn(),
};

describe('<Header />', () => {
  it('mapDispatchToProps test', () => {
    const test = 'test';
    const dispatch = () => test;

    expect(typeof mapDispatchToProps(dispatch) === 'object').toBe(true);
    expect(mapDispatchToProps(dispatch).dispatch).toBe(dispatch);
    expect(mapDispatchToProps(dispatch).showSignUpModalDispatch()).toBe(test);
    expect(mapDispatchToProps(dispatch).showLoginModalDispatch()).toBe(test);
  });

  it('render', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
