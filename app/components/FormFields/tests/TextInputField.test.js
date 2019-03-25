import renderer from 'react-test-renderer';
import 'jest-styled-components';

import TextInputField from '../TextInputField';
jest.mock('react-intl');

const props = {
  input: {},
  label: 'string',
  sendProps: {},
  meta: {},
};

describe('TextInputField test', () => {
  describe('test by snapshots', () => {
    it('default', () => {
      const rendered = renderer.create(TextInputField(props)).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });
});
