import Comments, { Comment } from '../Comments';

describe('Comments', () => {
  it('test1, Comments', () => {
    const props = {
      comments: [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
    };

    expect(Comments(props)).toMatchSnapshot();
  });

  it('test2, Comment', () => {
    const props = {
      userInfo: {},
    };

    expect(Comment(props)).toMatchSnapshot();
  });
});
