import React from 'react';
import { ErrorBoundary } from '../index';

const children = <div>Children</div>;
React.Children.only = jest.fn().mockImplementation(() => children);

const cmp = new ErrorBoundary();

cmp.state = {
  error: {},
  errorInfo: {},
};

cmp.props = {
  locale: 'en',
  children: 'children',
};

describe('<ErrorBoundary />', () => {
  describe('snapshot test', () => {
    it('error is null', () => {
      cmp.state.error = null;
      cmp.state.errorInfo = null;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('error is not null', () => {
      cmp.state.error = {};
      cmp.state.errorInfo = {};
      expect(cmp.render()).toMatchSnapshot();
    });
  });

  describe('reloadApp', () => {
    it('test', () => {
      cmp.reloadApp();
      expect(window.location.pathname).toBe('/');
    });
  });

  describe('componentDidCatch', () => {
    const error = {};
    const errorInfo = {};
    cmp.setState = jest.fn();

    expect(cmp.setState).toHaveBeenCalledTimes(0);

    cmp.componentDidCatch(error, errorInfo);
    expect(cmp.setState).toHaveBeenCalledTimes(1);
    expect(cmp.setState).toHaveBeenCalledWith({ error, errorInfo });
  });
});
