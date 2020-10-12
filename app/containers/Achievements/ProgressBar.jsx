import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { showPopover, closePopover } from 'utils/popover';

const Wrapper = styled.span`
  position: relative;
  display: inline-block;
  width: ${props => (props.width ? props.width : '100%')};
  height: 7px;
  background-color: rgb(194, 198, 216, 0.4);
  border-radius: 7px;
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

const ProgressBar = ({ width, progress, message = '' }) => {
  const id = `progress_bar_${Math.floor(Math.random() * 100000)}`;

  const showTooltip = () => {
    if (message) showPopover(id, message);
  };

  const hideTooltip = () => {
    if (message) closePopover();
  };

  return (
    <Wrapper
      id={id}
      width={width}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      <Progress progress={progress} />
    </Wrapper>
  );
};

ProgressBar.propTypes = {
  width: PropTypes.string,
  progress: PropTypes.number,
  message: PropTypes.string,
};

export default ProgressBar;
