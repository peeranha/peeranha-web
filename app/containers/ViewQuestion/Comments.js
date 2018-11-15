import React from 'react';
import PropTypes from 'prop-types';

import EditButton from './EditButton';
import RecordingDate from './RecordingDate';
import UserInfo from './UserInfo';

const Comment = item => (
  <div className="comment-body">
    <UserInfo
      avatar={item.userInfo.savedProfileImg}
      name={item.userInfo.eos.display_name}
      rating={item.userInfo.eos.rating}
      account={item.userInfo.eos.owner}
    />
    <div className="comment-content">
      <RecordingDate postTime={item.post_time} />
      <p
        className="comment-text"
        dangerouslySetInnerHTML={{ __html: item.content }}
      />
      <p className="option-edit">
        <EditButton isItWrittenByMe={item.isItWrittenByMe} />
      </p>
    </div>
  </div>
);

const Comments = props => (
  <div className="comments">
    {props.comments.map(item => (
      <Comment key={`comment${item.id}`} {...item} />
    ))}
  </div>
);

Comments.propTypes = {
  comments: PropTypes.array,
};

export default Comments;
