import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Footer from '../index';

describe('<Footer />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<Footer />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
