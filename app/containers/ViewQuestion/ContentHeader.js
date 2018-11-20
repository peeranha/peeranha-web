import React from 'react';
import PropTypes from 'prop-types';

import UserInfo from './UserInfo';
import RecordingDate from './RecordingDate';

const ContentHeader = props => (
  <div className="content-header">
    <UserInfo
      avatar={props.userInfo.ipfs_avatar}
      name={props.userInfo.display_name}
      account={props.userInfo.owner}
      rating={props.userInfo.rating}
    />
    <RecordingDate postTime={props.postTime} />
  </div>
);

ContentHeader.propTypes = {
  userInfo: PropTypes.object,
  postTime: PropTypes.number,
};

export default ContentHeader;
