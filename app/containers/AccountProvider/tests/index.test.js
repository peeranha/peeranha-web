import React from 'react';

import { mapDispatchToProps, AccountProvider } from '../index';

describe('<AccountProvider />', () => {
  it('componentDidMount', async () => {
    const cmp = new AccountProvider();

    cmp.props = {};
    cmp.props.getCurrentAccountDispatch = jest.fn();

    await cmp.componentDidMount();
    expect(cmp.props.getCurrentAccountDispatch).toHaveBeenCalled();
  });

  it('render', () => {
    const cmp = new AccountProvider();
    const children = [];

    cmp.props = {};
    React.Children.toArray = jest.fn().mockImplementationOnce(() => children);
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
