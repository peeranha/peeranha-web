import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import 'jest-styled-components';
import { translationMessages } from 'i18n';
import messages from 'containers/Profile/messages';

import ViewFormListItem from '../ViewFormListItem';

describe('ViewFormListItem test', () => {
  it('test by snapshots', () => {
    const renderedComponent = renderer
      .create(
        <BrowserRouter>
          <IntlProvider locale="en" key="en" messages={translationMessages.en}>
            {ViewFormListItem({
              label: messages.savingButton,
              message: 'savingButton',
            })}
          </IntlProvider>
        </BrowserRouter>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
