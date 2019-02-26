import React from 'react';
import PropTypes from 'prop-types';
import * as routes from 'routes-config';

import ContentHeader from './ContentHeader';
import ContentRating from './ContentRating';
import ContentBody from './ContentBody';

const Content = props => (
  <div className="content" id={routes.uniqueAnswerId(props.answerId)}>
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
  answerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  postTime: PropTypes.number,
  lastEditedDate: PropTypes.number,
};

export default Content;
