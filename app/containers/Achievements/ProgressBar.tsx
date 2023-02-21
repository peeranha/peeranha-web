import React from 'react';
import { TEXT_PRIMARY } from 'style-constants';
import { showPopover } from 'utils/popover';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

type ProgressBarType = {
  achievementId: number;
  progress: number;
  pointsToNext: number;
  groupType: string;
  messageSingle: string;
  messageMultiple: string;
};

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

export default ProgressBar;
