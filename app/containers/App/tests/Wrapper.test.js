import React from 'react';
import Wrapper, { Box } from '../Wrapper';

const cmp = new Box();
cmp.props = {
  Comp: () => <div>123</div>,
  props: {},
};

describe('Box', () => {
  it('test', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});

describe('Wrapper', () => {
  const comp = () => <div>123</div>;
  const props = {};

  it('test', () => {
    expect(Wrapper(comp, props)).toMatchSnapshot();
  });
});
