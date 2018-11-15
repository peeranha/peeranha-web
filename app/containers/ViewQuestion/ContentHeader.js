import React from 'react';
import PropTypes from 'prop-types';

import UserInfo from './UserInfo';
import RecordingDate from './RecordingDate';

const ContentHeader = props => (
  <div className="content-header">
    <UserInfo
      avatar={props.userInfo.savedProfileImg}
      name={props.userInfo.eos.display_name}
      account={props.userInfo.eos.owner}
      rating={props.userInfo.eos.rating}
    />
    <RecordingDate postTime={props.postTime} />
  </div>
);

ContentHeader.propTypes = {
  userInfo: PropTypes.object,
  postTime: PropTypes.number,
};

export default ContentHeader;
