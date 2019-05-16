import React from 'react';
import { EosioProvider, mapDispatchToProps } from '../index';

const child = <div>children</div>;
React.Children.only = jest.fn().mockImplementation(() => child);

const cmp = new EosioProvider();
cmp.props = {
  initializing: false,
  initEosio: jest.fn(),
};

describe('<EosioProvider />', () => {
  it('render, @initializing is false', () => {
    cmp.props.initializing = false;
    expect(cmp.render()).toMatchSnapshot();
  });

  it('render, @initializing is true', () => {
    cmp.props.initializing = true;
    expect(cmp.render()).toMatchSnapshot();
  });

  it('mapDispatchToProps test', () => {
    const test = 'test';
    const dispatch = () => test;

    expect(typeof mapDispatchToProps(dispatch) === 'object').toBe(true);
    expect(mapDispatchToProps(dispatch).dispatch).toBe(dispatch);
    expect(mapDispatchToProps(dispatch).initEosio()).toBe(test);
  });

  it('componentDidMount', () => {
    cmp.componentDidMount();
    expect(cmp.props.initEosio).toHaveBeenCalled();
  });
});
