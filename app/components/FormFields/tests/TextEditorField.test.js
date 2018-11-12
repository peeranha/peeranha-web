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

    it('meta.touched = true', () => {
      props.meta.touched = true;
      const rendered = renderer.create(TextEditorField(props)).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('meta.error = true', () => {
      props.meta.error = true;
      const rendered = renderer.create(TextEditorField(props)).toJSON();
      expect(rendered).toMatchSnapshot();
    });

    it('meta.warning = true', () => {
      props.meta.warning = true;
      const rendered = renderer.create(TextEditorField(props)).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });
});
