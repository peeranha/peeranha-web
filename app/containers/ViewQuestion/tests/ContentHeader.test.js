import ContentHeader from '../ContentHeader';

describe('ContentHeader', () => {
  it('test', () => {
    const props = {
      userInfo: {
        id: 1,
      },
    };
    expect(ContentHeader(props)).toMatchSnapshot();
  });
});
