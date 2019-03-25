import ContentBody from '../ContentBody';

describe('ContentBody', () => {
  it('test', () => {
    const props = {
      translations: {},
      questionData: {},
    };

    expect(ContentBody(props)).toMatchSnapshot();
  });
});
