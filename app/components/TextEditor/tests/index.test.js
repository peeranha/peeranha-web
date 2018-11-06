import TextEditor from '../index';

const props = {
  input: {},
  content: 'content',
  height: 400,
  handleEditorChange: jest.fn(),
};

describe('<TextEditor />', () => {
  describe('snapshot test', () => {
    it('@content is null, @height is null', () => {
      props.content = null;
      props.height = null;
      expect(TextEditor(props)).toMatchSnapshot();
    });

    it('@content is not null, @height is not null', () => {
      props.content = 'content';
      props.height = 400;
      expect(TextEditor(props)).toMatchSnapshot();
    });
  });
});
