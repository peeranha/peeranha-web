import renderer from 'react-test-renderer';
import 'jest-styled-components';

import renderFileInput from '../renderFileInput';

describe('renderFileInput test', () => {
  it('test by snapshots', () => {
    const renderedComponent = renderer
      .create(
        renderFileInput({
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
