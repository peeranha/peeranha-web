import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Wrapper from '../Wrapper';

describe('<Wrapper />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<Wrapper />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
