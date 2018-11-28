import Comments, {
  Comment,
  CommentVision,
  CommentEdit,
  CommentView,
} from '../Comments';

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

  describe('CommentVision', () => {
    const props = {
      id: 1,
      answerId: 1,
      editCommentState: {
        answerid: 1,
        commentid: 1,
      },
    };

    it('answerid == item.answerId && commentid == item.id', () => {
      props.id = 1;
      props.answerId = 1;
      props.editCommentState.answerid = 1;
      props.editCommentState.commentid = 1;
      expect(CommentVision(props)).toMatchSnapshot();
    });

    it('answerid != item.answerId && commentid != item.id', () => {
      props.id = 11111;
      props.answerId = 11111;
      expect(CommentVision(props)).toMatchSnapshot();
    });
  });

  describe('CommentView', () => {
    const props = {
      buttonParams: {},
      translations: {},
    };

    expect(CommentView(props)).toMatchSnapshot();
  });

  describe('CommentEdit', () => {
    const props = {
      buttonParams: {},
      translations: {},
    };

    expect(CommentEdit(props)).toMatchSnapshot();
  });
});
