import ContentBody from '../ContentBody';

describe('ContentBody', () => {
  it('test', () => {
    const props = {
      translations: {},
    };

    expect(ContentBody(props)).toMatchSnapshot();
  });
});
