import renderer from 'react-test-renderer';
import 'jest-styled-components';

import renderLocationField from '../renderLocationField';
import { LOCATION_FIELD } from '../constants';

describe('renderLocationField test', () => {
  it('test by snapshots', () => {
    const renderedComponent = renderer
      .create(
        renderLocationField({
          input: {},
          label: 'string',
          sendProps: {
            profile: {
              ipfs: {
                [LOCATION_FIELD]: {
                  name: '',
                },
              },
            },
          },
        }),
      )
      .toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
