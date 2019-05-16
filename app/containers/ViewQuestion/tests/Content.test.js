import { Content } from '../Content';

describe('Content', () => {
  it('test', () => {
    const props = {
      questionData: {},
    };

    expect(Content(props)).toMatchSnapshot();
  });
});
