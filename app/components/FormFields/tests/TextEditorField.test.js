import { TextEditorField } from '../TextEditorField';

jest.mock('react-simplemde-editor');
jest.mock('simplemde/dist/simplemde.min.css');

const props = {
  input: {},
  label: 'label',
  previewLabel: 'previewLabel',
  disabled: false,
  meta: {},
  tip: 'tip',
};

describe('TextEditorField test', () => {
  it('test', () => {
    expect(TextEditorField(props)).toMatchSnapshot();
  });
});
