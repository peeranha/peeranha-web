import React from 'react';
import PropTypes from 'prop-types';
import { getFormattedDate } from 'utils/datetime';

const RecordingDate = props => (
  <p className="recording-date">{getFormattedDate(props.postTime)}</p>
);

RecordingDate.propTypes = {
  postTime: PropTypes.number,
};

export default RecordingDate;
