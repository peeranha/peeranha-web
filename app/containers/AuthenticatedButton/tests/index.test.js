import { AuthenticatedButton, mapDispatchToProps } from '../index';

const cmp = new AuthenticatedButton();

describe('<AuthenticatedButton />', () => {
  const buttonAction = 'buttonAction';
  const showLoginModalDispatch = 'showLoginModalDispatch';

  cmp.props = {
    buttonContent: 'Login',
    buttonClass: 'btn',
    buttonAction: () => buttonAction,
    showLoginModalDispatch: () => showLoginModalDispatch,
  };

  it('clickHandler, userIsInSystem === false', () => {
    const userIsInSystem = false;
    cmp.props.userIsInSystem = userIsInSystem;
    expect(cmp.clickHandler()).toEqual(showLoginModalDispatch);
  });

  it('clickHandler, userIsInSystem === true', () => {
    const userIsInSystem = true;
    cmp.props.userIsInSystem = userIsInSystem;
    expect(cmp.clickHandler()).toEqual(buttonAction);
  });

  it('render', () => {
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
