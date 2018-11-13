import React from 'react';
import PropTypes from 'prop-types';

const Comments = props => (
  <div className="comments">
    {props.comments.map(item => <div>{item.content}</div>)}
  </div>
);

Comments.propTypes = {
  comments: PropTypes.object,
};

export default Comments;
