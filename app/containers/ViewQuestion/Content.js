import React from 'react';
import PropTypes from 'prop-types';

import ContentHeader from './ContentHeader';
import ContentRating from './ContentRating';
import ContentBody from './ContentBody';

const Content = props => (
  <div className="content">
    <ContentHeader userInfo={props.userInfo} postTime={props.postTime} />
    <div>
      <ContentRating {...props} />
      <ContentBody {...props} />
    </div>
  </div>
);

Content.propTypes = {
  userInfo: PropTypes.object,
  postTime: PropTypes.number,
};

export default Content;
