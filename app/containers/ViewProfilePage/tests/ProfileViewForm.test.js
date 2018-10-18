import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import 'jest-styled-components';

import ProfileViewForm from '../ProfileViewForm';

describe('ProfileViewForm test', () => {
  it('test by snapshots', () => {
    const renderedComponent = renderer
      .create(
        <BrowserRouter>
          <IntlProvider locale="en">
            {ProfileViewForm({
              profile: {},
              match: { params: {} },
            })}
          </IntlProvider>
        </BrowserRouter>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
