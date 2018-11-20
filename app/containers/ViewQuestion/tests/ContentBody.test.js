import ContentBody from '../ContentBody';

describe('ContentBody', () => {
  it('test', () => {
    const props = {};
    expect(ContentBody(props)).toMatchSnapshot();
  });
});
