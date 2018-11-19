import Content from '../Content';

describe('Content', () => {
  it('test', () => {
    const props = {};
    expect(Content(props)).toMatchSnapshot();
  });
});
