import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BG_PRIMARY_SPECIAL_2, TEXT_PRIMARY } from 'style-constants';

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
  display: inline-block;
  position: relative;
  float: right;
  top: ${({ top }) => top || '-15px'};
  right: ${({ right }) => right || '-25px'};

  @media only screen and (max-width: 576px) {
    top: ${({ topMedia }) => topMedia || '-10px'};
    right: ${({ rightMedia }) => rightMedia || '-10px'};
  }
`;

const Type = styled.div`
  height: ${({ size }) => SIZE_CONFIG[size].height}px;
  font-size: ${({ size }) => SIZE_CONFIG[size].fontSize}px;
  background: ${BG_PRIMARY_SPECIAL_2};
  color: ${TEXT_PRIMARY};
  position: relative;
  padding: 0 9px;
  display: inline-flex;
  align-items: center;
  border-radius: 3px;

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
