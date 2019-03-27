import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { getFormattedDate } from 'utils/datetime';
import messages from './messages';

export const ChangesHistory = /* istanbul ignore next */ ({
  lastEditedDate,
  postTime,
  locale,
}) => (
  <p className="recording-date">
    {getFormattedDate(postTime)}

    {lastEditedDate && (
      <span>
        <FormattedMessage {...messages.lastEdited} />
        <span>{`: ${getFormattedDate(lastEditedDate, locale)}`}</span>
      </span>
    )}
  </p>
);

ChangesHistory.propTypes = {
  postTime: PropTypes.number,
  locale: PropTypes.string,
  lastEditedDate: PropTypes.number,
};

export default React.memo(ChangesHistory);
