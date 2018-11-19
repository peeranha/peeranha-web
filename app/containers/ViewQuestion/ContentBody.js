import React from 'react';
import PropTypes from 'prop-types';

import TextBlock from './TextBlock';
import ContentOptions from './ContentOptions';
import AddCommentForm from './AddCommentForm';
import Comments from './Comments';

import { ADD_COMMENT_FORM } from './constants';

const ContentBody = props => (
  <div className="content-body">
    <TextBlock content={props.content} />
    <ContentOptions
      translations={props.translations}
      isItWrittenByMe={props.isItWrittenByMe}
    />
    <Comments comments={props.comments} />
    <AddCommentForm
      form={`${ADD_COMMENT_FORM}${props.answerId}`}
      translations={props.translations}
      postCommentLoading={props.postCommentLoading}
      postComment={props.postComment}
      answerId={props.answerId}
    />
  </div>
);

ContentBody.propTypes = {
  content: PropTypes.string,
  translations: PropTypes.object,
  isItWrittenByMe: PropTypes.bool,
  postCommentLoading: PropTypes.bool,
  comments: PropTypes.array,
  postComment: PropTypes.func,
  answerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ContentBody;
