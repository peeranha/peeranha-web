import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { IntlProvider } from 'react-intl';
import { translationMessages } from 'i18n';

import renderFileInput from '../renderFileInput';

describe('renderFileInput test', () => {
  it('test by snapshots', () => {
    const renderedComponent = renderer
      .create(
        <IntlProvider locale="en" key="en" messages={translationMessages.en}>
          {renderFileInput({
            input: {},
            label: 'string',
            sendProps: {},
            meta: {},
          })}
        </IntlProvider>,
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
