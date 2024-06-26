import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TEXT_PRIMARY } from 'style-constants';
import { showPopover } from 'utils/popover';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

const Wrapper = styled.span`
  position: relative;
  display: inline-block;
  width: ${(props) => (props.width ? props.width : '100%')};
  height: 7px;
  background-color: var(--color-gray-light);
  border-radius: 7px;
  overflow: hidden;
`;

const Progress = styled.span`
  width: ${(props) => (props.progress ? `${props.progress}%` : 0)};
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  height: 7px;
  background-color: ${colors.textColor || TEXT_PRIMARY};
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
    pointsToNext === 1 ? `${pointsToNext} ${messageSingle}` : `${pointsToNext} ${messageMultiple}`;

  const showTooltip = () =>
    currentMessage && pointsToNext > 0 ? showPopover(id, currentMessage) : null;

  return (
    <Wrapper id={id} width={width} onMouseEnter={showTooltip}>
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
