import renderer from 'react-test-renderer';
import 'jest-styled-components';

import TextareaField from '../TextareaField';
jest.mock('react-intl');

const props = {
  input: {},
  label: 'label',
  disabled: false,
  meta: {},
};

describe('TextareaField test', () => {
  describe('test by snapshots', () => {
    it('default', () => {
      const rendered = renderer.create(TextareaField(props)).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });
});
