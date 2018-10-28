import renderer from 'react-test-renderer';
import 'jest-styled-components';

import renderTextarea, { WarningMessage } from '../renderTextarea';

describe('renderTextarea test', () => {
  it('test by snapshots', () => {
    const renderedComponent = renderer
      .create(
        renderTextarea({
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
