import React from 'react';
import PropTypes from 'prop-types';
import Circle from './Circle';

const LoadingIndicator = ({ width, height, margin }) => (
  <div className="d-flex">
    <Circle number={1} width={width} height={height} margin={margin} />
    <Circle number={2} width={width} height={height} margin={margin} />
    <Circle number={3} width={width} height={height} margin={margin} />
    <Circle number={4} width={width} height={height} margin={margin} />
    <Circle number={5} width={width} height={height} margin={margin} />
  </div>
);

LoadingIndicator.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.number,
};

export default LoadingIndicator;
