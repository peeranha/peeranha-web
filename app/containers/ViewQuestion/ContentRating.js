import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ContentRating = props => (
  <div className="content-rating text-center">
    <FontAwesomeIcon className="chevron" icon="chevron-up" />
    <span className="rating-value">{props.questionData.rating}</span>
    <FontAwesomeIcon className="chevron" icon="chevron-down" />
  </div>
);

ContentRating.propTypes = {
  questionData: PropTypes.object,
};

export default ContentRating;
