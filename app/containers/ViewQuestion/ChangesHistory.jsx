import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { getFormattedDate } from 'utils/datetime';

export const ChangesHistory = ({ lastEditedDate, postTime, locale }) => {
  const { t } = useTranslation();

  return (
    <p className="recording-date">
      {getFormattedDate(postTime)}

      {lastEditedDate && (
        <span>
          {t('post.lastEdited')}
          <span>{`: ${getFormattedDate(lastEditedDate, locale)}`}</span>
        </span>
      )}
    </p>
  );
};

ChangesHistory.propTypes = {
  postTime: PropTypes.number,
  locale: PropTypes.string,
  lastEditedDate: PropTypes.number,
};

export default React.memo(ChangesHistory);
