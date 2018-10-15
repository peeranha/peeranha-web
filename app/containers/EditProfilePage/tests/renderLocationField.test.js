import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { LOCATION_FIELD } from 'containers/Profile/constants';
import renderLocationField from '../renderLocationField';

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
