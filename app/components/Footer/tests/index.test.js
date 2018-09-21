import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Footer from '../index';

describe('<Footer />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <BrowserRouter>
          <IntlProvider locale="en">
            <Footer />
          </IntlProvider>
        </BrowserRouter>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
