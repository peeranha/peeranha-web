import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import arrowDownIcon from 'images/arrowDown.svg?inline';
import arrowDownWhiteIcon from 'images/arrowDownWhite.svg?inline';
import arrowDownSmallIcon from 'images/arrowDownSmall.svg?inline';

const Container = styled.div`
  transform: rotate(${(x) => (x.shouldBeRotated ? '180deg' : '0deg')});
  transition: 0.5s;
  margin-right: 16px;
`;

const type = {
  default: arrowDownIcon,
  white: arrowDownWhiteIcon,
  small: arrowDownSmallIcon,
};

const Arrow = ({ rotate, className, width = 16, color = 'default' }) => (
  <Container className={className} shouldBeRotated={rotate}>
    <img src={type[color] || type.default} width={width} alt="arrow" />
  </Container>
);

Arrow.propTypes = {
  rotate: PropTypes.bool,
  width: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};
export default Arrow;
