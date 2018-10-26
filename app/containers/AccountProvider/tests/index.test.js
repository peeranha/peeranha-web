import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { memoryHistory } from 'react-router-dom';
import configureStore from 'configureStore';

import { mapDispatchToProps, AccountProvider } from '../index';

describe('<AccountProvider />', () => {
  it('render test', async () => {
    const children = <h1>Children</h1>;
    const store = configureStore({}, memoryHistory);
    const renderedComponent = shallow(
      <Provider store={store}>
        <AccountProvider>{children}</AccountProvider>
      </Provider>,
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('componentDidMount', async () => {
    const user = 'user1';
    const cmp = new AccountProvider();

    cmp.props = {};
    cmp.props.getCurrentAccountDispatch = () => user;

    expect(await cmp.componentDidMount()).toBe(user);
  });

  it('render', () => {
    const cmp = new AccountProvider();
    const children = <div>Children</div>;

    cmp.props = {};
    React.Children.only = jest.fn().mockImplementationOnce(() => children);
    expect(cmp.render()).toEqual([children]);
  });

  it('mapDispatchToProps test', () => {
    const test = 'test';
    const dispatch = () => test;

    expect(typeof mapDispatchToProps(dispatch) === 'object').toBe(true);
    expect(mapDispatchToProps(dispatch).dispatch).toBe(dispatch);
    expect(mapDispatchToProps(dispatch).getCurrentAccountDispatch()).toBe(test);
  });
});
