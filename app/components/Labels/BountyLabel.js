import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TEXT_PRIMARY, BORDER_RADIUS_M } from 'style-constants';

const SIZE_CONFIG = {
  sm: {
    height: 20,
    fontSize: 14,
  },
  md: {
    height: 30,
    fontSize: 16,
  },
};

export const BountyLabelContainer = styled.div`
  position: relative;

  display: inline-block;
  text-align: right;

  @media only screen and (max-width: 576px) {
    top: ${({ topMedia }) => topMedia || '-10px'};
    right: ${({ rightMedia }) => rightMedia || '-10px'};
  }
`;

const Label = styled.div`
  height: ${({ size }) => SIZE_CONFIG[size].height}px;
  font-size: ${({ size }) => SIZE_CONFIG[size].fontSize}px;
  color: ${TEXT_PRIMARY};
  position: relative;

  display: inline-flex;
  align-items: center;
  border-radius: ${BORDER_RADIUS_M};
  z-index: 999;

  > span {
    white-space: nowrap;
  }

  @media only screen and (max-width: 150px) {
    display: none;
  }
`;

const BountyLabel = ({ size, ...restProps }) => (
  <BountyLabelContainer {...restProps}>
    <Label size={size} {...restProps} />
  </BountyLabelContainer>
);

BountyLabel.propTypes = {
  size: PropTypes.string,
};

export default BountyLabel;
