import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { IntlProvider } from 'react-intl';

import ScatterInstaller from '../index';

describe('<ScatterInstaller />', () => {
  const props = {
    reloadApp: jest.fn(),
    backToOptions: jest.fn(),
  };

  it('should match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <IntlProvider locale="en" key="en" messages={{}}>
          <ScatterInstaller props={props} />
        </IntlProvider>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
