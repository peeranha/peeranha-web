import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { showPopover } from 'utils/popover';

const Wrapper = styled.span`
  position: relative;
  display: inline-block;
  width: ${props => (props.width ? props.width : '100%')};
  height: 7px;
  background-color: rgb(194, 198, 216, 0.4);
  border-radius: 7px;
  overflow: hidden;
`;

const Progress = styled.span`
  width: ${props => (props.progress ? `${props.progress}%` : 0)};
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  height: 7px;
  background-color: rgb(87, 111, 237);
  border-radius: 7px;
`;

const ProgressBar = ({
  achievementId,
  width,
  progress,
  pointsToNext,
  groupType,
  messageSingle = '',
  messageMultiple = '',
}) => {
  const id = `progress_bar_${groupType}_${achievementId}`;

  const currentMessage =
    pointsToNext === 1
      ? `${pointsToNext} ${messageSingle}`
      : `${pointsToNext} ${messageMultiple}`;

  const showTooltip = () => {
    if (currentMessage) showPopover(id, currentMessage);
  };

  return (
    <Wrapper
      id={id}
      width={width}
      onMouseEnter={showTooltip}
      onClick={showTooltip}
    >
      <Progress progress={progress} />
    </Wrapper>
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
