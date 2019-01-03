import React from 'react';
import { DataCacheProvider } from '../index';

const cmp = new DataCacheProvider();

cmp.props = {
  getCommunitiesWithTagsDispatch: jest.fn(),
  children: <div>Children</div>,
};

describe('<DataCacheProvider />', () => {
  it('componentDidMount', () => {
    expect(cmp.props.getCommunitiesWithTagsDispatch).toHaveBeenCalledTimes(0);
    cmp.componentDidMount();
    expect(cmp.props.getCommunitiesWithTagsDispatch).toHaveBeenCalledTimes(1);
  });

  it('render', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
