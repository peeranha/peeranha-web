import React from 'react';
import { InfinityLoader } from '../index';

const cmp = new InfinityLoader();
cmp.props = {
  loadNextPaginatedData: jest.fn(),
  isLoading: false,
  isLastFetch: false,
};

const children = <div>Children</div>;
React.Children.toArray = jest.fn().mockImplementation(() => children);

window.addEventListener = jest.fn();
window.removeEventListener = jest.fn();

describe('<InfinityLoader />', () => {
  describe('onScroll', () => {
    window.innerHeight = 1000;
    window.scrollY = 500;

    it('no scroll', () => {
      cmp.props.isLoading = true;
      cmp.props.isLastFetch = true;

      cmp.onScroll();
      expect(cmp.props.loadNextPaginatedData).toHaveBeenCalledTimes(0);
    });

    it('scroll', () => {
      cmp.props.isLoading = false;
      cmp.props.isLastFetch = false;

      cmp.onScroll();
      expect(cmp.props.loadNextPaginatedData).toHaveBeenCalledTimes(1);
    });
  });

  it('componentWillMount', () => {
    cmp.componentWillMount();
    expect(window.addEventListener).toHaveBeenCalledWith(
      'scroll',
      cmp.onScroll,
      false,
    );
  });

  it('componentWillUnmount', () => {
    cmp.componentWillUnmount();
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'scroll',
      cmp.onScroll,
      false,
    );
  });

  it('render, snapshot test', () => {
    expect(cmp.render()).toBe(children);
  });
});
