import { AuthenticatedButton, mapDispatchToProps } from '../index';

const cmp = new AuthenticatedButton();
cmp.props = {
  buttonAction: jest.fn(),
  showLoginModalDispatch: jest.fn(),
  className: 'btn',
  type: 'submit',
  content: 'content',
  profileInfo: true,
  isLoading: false,
};

describe('<AuthenticatedButton />', () => {
  it('clickHandler, profileInfo === false', () => {
    cmp.props.profileInfo = false;
    expect(cmp.props.showLoginModalDispatch).toHaveBeenCalledTimes(0);

    cmp.clickHandler();
    expect(cmp.props.showLoginModalDispatch).toHaveBeenCalledTimes(1);
  });

  it('clickHandler, @profileInfo, @buttonAction are true', () => {
    cmp.props.profileInfo = true;
    cmp.props.buttonAction = jest.fn();
    expect(cmp.props.buttonAction).toHaveBeenCalledTimes(0);

    cmp.clickHandler();
    expect(cmp.props.buttonAction).toHaveBeenCalledTimes(1);
  });

  it('render, @loading is true', () => {
    cmp.props.isLoading = true;
    expect(cmp.render()).toMatchSnapshot();
  });

  it('render, @loading is false', () => {
    cmp.props.isLoading = false;
    expect(cmp.render()).toMatchSnapshot();
  });

  it('mapDispatchToProps test', () => {
    const test = 'test';
    const dispatch = () => test;

    expect(typeof mapDispatchToProps(dispatch) === 'object').toBe(true);
    expect(mapDispatchToProps(dispatch).dispatch).toBe(dispatch);
    expect(mapDispatchToProps(dispatch).showLoginModalDispatch()).toBe(test);
  });
});
