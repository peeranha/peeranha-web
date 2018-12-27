import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

const ViewFormListItem = props => (
  <div className="view-form-item">
    <h6>
      <FormattedMessage {...props.label} />
    </h6>
    <p>{props.message}</p>
  </div>
);

ViewFormListItem.propTypes = {
  message: PropTypes.string,
  label: PropTypes.object,
};

export default ViewFormListItem;
