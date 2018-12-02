import React from 'react';
import PropTypes from 'prop-types';

import ContentHeader from './ContentHeader';
import ContentRating from './ContentRating';
import ContentBody from './ContentBody';

const Content = props => (
  <div className="content">
    <ContentHeader
      locale={props.locale}
      userInfo={props.userInfo}
      postTime={props.postTime}
      lastEditedDate={props.lastEditedDate}
    />
    <div>
      <ContentRating {...props} />
      <ContentBody {...props} />
    </div>
  </div>
);

Content.propTypes = {
  userInfo: PropTypes.object,
  locale: PropTypes.string,
  postTime: PropTypes.number,
  lastEditedDate: PropTypes.number,
};

export default Content;
