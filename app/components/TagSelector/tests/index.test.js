import React from 'react';
import { TagSelector } from '../index';

React.useState = jest.fn().mockImplementation(() => [false, jest.fn()]);

const props = {
  input: {},
  meta: {},
  label: 'label',
  tip: 'tip',
  setTags: jest.fn(),
  disabled: false,
  options: [],
};

describe('TagSelector', () => {
  it('test', () => {
    expect(TagSelector(props)).toMatchSnapshot();
  });
});
