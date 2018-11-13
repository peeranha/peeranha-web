import React from 'react';

import ContentRating from './ContentRating';
import ContentBody from './ContentBody';

const Content = props => (
  <div className="content">
    <ContentRating {...props} />
    <ContentBody {...props} />
  </div>
);

export default Content;
