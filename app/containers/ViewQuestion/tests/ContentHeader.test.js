import { ContentHeader } from '../ContentHeader';

describe('ContentHeader', () => {
  it('test', () => {
    const props = {
      votingStatus: {},
      userInfo: {
        id: 1,
      },
    };

    expect(ContentHeader(props)).toMatchSnapshot();
  });
});
