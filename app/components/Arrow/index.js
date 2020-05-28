import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import arrowDownIcon from 'images/arrowDown.svg?inline';
import arrowDownWhiteIcon from 'images/arrowDownWhite.svg?inline';

const Container = styled.div`
  transform: rotate(${x => (x.rotate ? '180deg' : '0deg')});
  transition: 0.5s;
  margin-right: 16px;
`;

const byColor = {
  default: arrowDownIcon,
  white: arrowDownWhiteIcon,
};

const Arrow = ({ rotate, className, width = 16, color = 'default' }) => (
  <Container className={className} rotate={rotate}>
    <img src={byColor[color] || byColor["default"]} width={width} alt="arrow" />
  </Container>
);

Arrow.propTypes = {
  rotate: PropTypes.bool,
  width: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};
export default Arrow;
