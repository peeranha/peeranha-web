import React from 'react';
import { ProgressBarType } from './types';
import { showPopover } from 'utils/popover';
import { styles } from './Achievements.styled';

const ProgressBar: React.FC<ProgressBarType> = ({
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
    <div css={styles.progressBar} onMouseEnter={showTooltip}>
      <div
        css={{
          ...styles.progressBarLine,
          ...(progress && { width: `${progress}%` }),
          ...(progress === 100 && styles.progressBarLineFull),
        }}
      />
    </div>
  );
};

export default ProgressBar;
