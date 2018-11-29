import React from 'react';
import PropTypes from 'prop-types';

import UserInfo from './UserInfo';
import ChangesHistory from './ChangesHistory';

const ContentHeader = props => (
  <div className="content-header">
    <UserInfo
      avatar={props.userInfo.ipfs_avatar}
      name={props.userInfo.display_name}
      account={props.userInfo.owner}
      rating={props.userInfo.rating}
    />
    <ChangesHistory
      locale={props.locale}
      postTime={props.postTime}
      lastEditedDate={props.lastEditedDate}
    />
  </div>
);

ContentHeader.propTypes = {
  userInfo: PropTypes.object,
  locale: PropTypes.string,
  lastEditedDate: PropTypes.number,
  postTime: PropTypes.number,
};

export default ContentHeader;
