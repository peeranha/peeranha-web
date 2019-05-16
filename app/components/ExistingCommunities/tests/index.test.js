import React from 'react';
import { ExistingCommunities } from '../index';

React.useState = jest.fn().mockImplementation(() => [false, jest.fn()]);

describe('ExistingCommunities', () => {
  it('test', () => {
    expect(ExistingCommunities()).toMatchSnapshot();
  });
});
