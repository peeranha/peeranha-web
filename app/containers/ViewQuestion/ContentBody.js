import React from 'react';
import PropTypes from 'prop-types';

import TextBlock from './TextBlock';
import ContentOptions from './ContentOptions';

const ContentBody = props => (
  <div className="content-body">
    <TextBlock text={props.questionData.content.content} />
    <ContentOptions {...props} />
  </div>
);

ContentBody.propTypes = {
  questionData: PropTypes.object,
};

export default ContentBody;
