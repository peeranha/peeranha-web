import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TEXT_PRIMARY } from 'style-constants';
import { showPopover } from 'utils/popover';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

const ProgressBar = ({
  achievementId,
  progress,
  pointsToNext,
  groupType,
  messageSingle = '',
  messageMultiple = '',
}): JSX.Element => {
  const currentMessage =
    pointsToNext === 1
      ? `${pointsToNext} ${messageSingle}`
      : `${pointsToNext} ${messageMultiple}`;

  const showTooltip = () => {
    if (currentMessage)
      showPopover(`progress_bar_${groupType}_${achievementId}`, currentMessage);
  };

  return (
    <div
      className="pr"
      css={{
        height: 4,
        background: 'rgba(53, 74, 137, 0.15)',
        borderRadius: '4px',
        width: '60%',
      }}
      onMouseEnter={showTooltip}
    >
      <div
        className="pa"
        css={{
          height: 4,
          background: colors.textColor || TEXT_PRIMARY,

          ...(progress && { width: `${progress}%` }),
        }}
      />
    </div>
  );
};

ProgressBar.propTypes = {
  width: PropTypes.string,
  progress: PropTypes.number,
  pointsToNext: PropTypes.number,
  groupType: PropTypes.string,
  messageSingle: PropTypes.string,
  messageMultiple: PropTypes.string,
};

export default ProgressBar;
