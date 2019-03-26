import { TextBlock } from '../TextBlock';

describe('TextBlock', () => {
  it('test', () => {
    const props = {
      content: '<p>Content</p>',
    };

    expect(TextBlock(props)).toMatchSnapshot();
  });
});
