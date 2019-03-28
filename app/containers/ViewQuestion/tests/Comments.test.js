import React from 'react';
import { Comment, CommentEdit, CommentView, Comments } from '../Comments';

React.useState = jest.fn().mockImplementation(() => [false, jest.fn()]);

describe('Comments', () => {
  it('test1, Comments', () => {
    const props = {
      comments: [
        {
          id: 1,
          userInfo: {},
        },
        {
          id: 2,
          userInfo: {},
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

  describe('CommentView', () => {
    const props = {
      buttonParams: {},
      translations: {},
      userInfo: {},
    };

    expect(CommentView(props)).toMatchSnapshot();
  });

  describe('CommentEdit', () => {
    const props = {
      buttonParams: {},
      translations: {},
      userInfo: {},
    };

    expect(CommentEdit(props)).toMatchSnapshot();
  });
});
