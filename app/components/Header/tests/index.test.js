import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Header from '../index';

describe('<Header />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<Header />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
