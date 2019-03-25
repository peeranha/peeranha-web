import renderer from 'react-test-renderer';
import 'jest-styled-components';

import TextEditorField from '../TextEditorField';

jest.mock('react-intl');
jest.mock('react-simplemde-editor');
jest.mock('simplemde/dist/simplemde.min.css');

const props = {
  input: {},
  handleEditorChange: jest.fn(),
  label: 'label',
  disabled: false,
  meta: {},
};

describe('TextEditorField test', () => {
  describe('test by snapshots', () => {
    it('default', () => {
      const rendered = renderer.create(TextEditorField(props)).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });
});
