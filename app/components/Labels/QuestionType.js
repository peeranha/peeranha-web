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

export const TypeContainer = styled.div`
  position: relative;
  float: right;
  top: ${({ top }) => top || '-15px'};
  right: ${({ right }) => right || '-25px'};

  display: inline-block;
  flex-grow: 1;

  text-align: right;

  @media only screen and (max-width: 576px) {
    top: ${({ topMedia }) => topMedia || '-10px'};
    right: ${({ rightMedia }) => rightMedia || '-10px'};
  }
`;

const Type = styled.div`
  height: ${({ size }) => SIZE_CONFIG[size].height}px;
  font-size: ${({ size }) => SIZE_CONFIG[size].fontSize}px;
  color: ${TEXT_PRIMARY};
  position: relative;
  display: inline-flex;
  align-items: center;
  border-radius: ${BORDER_RADIUS_M};

  > span {
    white-space: nowrap;
  }

  @media only screen and (max-width: 150px) {
    display: none;
  }
`;

const QuestionType = ({ size, ...restProps }) => (
  <TypeContainer {...restProps}>
    <Type size={size} {...restProps} />
  </TypeContainer>
);

QuestionType.propTypes = {
  size: PropTypes.string,
};

export default QuestionType;
