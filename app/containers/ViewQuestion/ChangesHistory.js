import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { getFormattedDate } from 'utils/datetime';
import messages from './messages';

const ChangesHistory = props => (
  <p className="recording-date">
    {getFormattedDate(props.postTime)}
    {props.lastEditedDate && (
      <span className="last-edited-date">
        <FormattedMessage {...messages.lastEdited} />
        <span>
          {`: ${getFormattedDate(props.lastEditedDate, props.locale)}`}
        </span>
      </span>
    )}
  </p>
);

ChangesHistory.propTypes = {
  postTime: PropTypes.number,
  locale: PropTypes.string,
  lastEditedDate: PropTypes.number,
};

export default ChangesHistory;
