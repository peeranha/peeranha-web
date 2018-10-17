import renderer from 'react-test-renderer';
import 'jest-styled-components';

import renderTextInput from '../renderTextInput';

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
});
