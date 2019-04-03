import React from 'react';
import { Wrapper } from '../Wrapper';

const props = {
  children: <div>123</div>,
  tip: 'tip',
  label: 'label',
  meta: {},
};

describe('Wrapper', () => {
  it('test', () => {
    expect(Wrapper(props)).toMatchSnapshot();
  });
});
