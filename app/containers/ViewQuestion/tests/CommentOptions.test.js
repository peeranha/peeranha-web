import React from 'react';
import { CommentOptions } from '../CommentOptions';

React.useState = jest.fn().mockImplementation(() => [false, jest.fn()]);

describe('CommentOptions', () => {
  it('test', () => {
    const props = {
      changeCommentsView: jest.fn(),
      changeAddCommentView: jest.fn(),
    };

    expect(CommentOptions(props)).toMatchSnapshot();
  });
});
