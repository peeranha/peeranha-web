import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { IntlProvider } from 'react-intl';
import { translationMessages } from 'i18n';

import NoAccess from '../index';

describe('<NoAccess />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <IntlProvider locale="en" key="en" messages={translationMessages.en}>
          <NoAccess />
        </IntlProvider>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
