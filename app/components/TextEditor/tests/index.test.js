import TextEditor from '../index';

const cmp = new TextEditor();
cmp.props = {
  input: {},
  content: 'content',
  height: 400,
  handleEditorChange: jest.fn(),
  onChange: jest.fn(),
};

jest.mock('react-simplemde-editor');
jest.mock('simplemde/dist/simplemde.min.css');

describe('<TextEditor />', () => {
  describe('handleEditorChange', () => {
    it('test', () => {
      const txt = 'some txt';
      cmp.handleEditorChange(txt);
      expect(cmp.props.onChange).toHaveBeenCalledWith(txt);
    });
  });

  describe('snapshot test', () => {
    it('@content is null, @height is null', () => {
      cmp.props.content = null;
      cmp.props.height = null;
      expect(cmp.render()).toMatchSnapshot();
    });

    it('@content is not null, @height is not null', () => {
      cmp.props.content = 'content';
      cmp.props.height = 400;
      expect(cmp.render()).toMatchSnapshot();
    });
  });
});
