import React from 'react';
import { DataCacheProvider } from '../index';

const cmp = new DataCacheProvider();

cmp.props = {
  getCommunitiesDispatch: jest.fn(),
  getStatDispatch: jest.fn(),
  getFaqDispatch: jest.fn(),
  children: <div>Children</div>,
};

describe('<DataCacheProvider />', () => {
  it('componentDidMount', () => {
    expect(cmp.props.getCommunitiesDispatch).toHaveBeenCalledTimes(0);
    expect(cmp.props.getStatDispatch).toHaveBeenCalledTimes(0);
    expect(cmp.props.getFaqDispatch).toHaveBeenCalledTimes(0);

    cmp.componentDidMount();

    expect(cmp.props.getStatDispatch).toHaveBeenCalledTimes(1);
    expect(cmp.props.getCommunitiesDispatch).toHaveBeenCalledTimes(1);
    expect(cmp.props.getFaqDispatch).toHaveBeenCalledTimes(1);
  });

  it('render', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
