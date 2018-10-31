import renderer from 'react-test-renderer';
import 'jest-styled-components';

import renderTextInput, { WarningMessage } from '../renderTextInput';

describe('renderTextInput test', () => {
  it('test by snapshots', () => {
    const renderedComponent = renderer
      .create(
        renderTextInput({
          input: {},
          label: 'string',
          sendProps: {},
          meta: {},
        }),
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('WarningMessage', () => {
    expect(WarningMessage(false, {}, true, true)).toMatchSnapshot();
    expect(WarningMessage(true, {}, true, true)).toMatchSnapshot();
    expect(WarningMessage(true, {}, true, false)).toMatchSnapshot();
    expect(WarningMessage(true, {}, false, true)).toMatchSnapshot();
  });
});
