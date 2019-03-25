import React from 'react';
import ContainedButton from '../ContainedButton';

const props = {
  disabled: false,
  change: () => {},
  content: <span />,
  onClick: () => {},
};

describe('ContainedButton', () => {
  it('test1', () => {
    expect(ContainedButton(props)).toMatchSnapshot();
  });
});
