import React from 'react';
import PropTypes from 'prop-types';

import EditButton from './EditButton';
import RecordingDate from './RecordingDate';
import UserInfo from './UserInfo';

const Comment = item => (
  <div className="comment-body">
    <UserInfo
      avatar={item.userInfo.ipfs_avatar}
      name={item.userInfo.display_name}
      rating={item.userInfo.rating}
      account={item.userInfo.owner}
    />
    <div className="comment-content">
      <RecordingDate postTime={item.post_time} />
      <p
        className="comment-text"
        dangerouslySetInnerHTML={{ __html: item.content }}
      />
      <p className="option-edit">
        <EditButton
          isItWrittenByMe={item.isItWrittenByMe}
          editContent={item.editContent}
          translations={item.translations}
        />
      </p>
    </div>
  </div>
);

const Comments = props => (
  <div className="comments">
    {props.comments.map(item => (
      <Comment {...item} {...props} key={`comment${item.id}`} />
    ))}
  </div>
);

Comments.propTypes = {
  comments: PropTypes.array,
};

export { Comment };
export default Comments;
