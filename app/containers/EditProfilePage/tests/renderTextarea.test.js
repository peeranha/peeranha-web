import renderer from 'react-test-renderer';
import 'jest-styled-components';

import renderTextarea from '../renderTextarea';

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
});
