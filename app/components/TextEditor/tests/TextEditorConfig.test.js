import TextEditorConfig from '../TextEditorConfig';

describe('TextEditorConfig', () => {
  it('snapshot test', () => {
    expect(TextEditorConfig).toMatchSnapshot();
  });
});
