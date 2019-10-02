import React from 'react';
import { EosioProvider } from '../index';

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

  it('componentDidMount', () => {
    cmp.componentDidMount();
    expect(cmp.props.initEosio).toHaveBeenCalled();
  });
});
