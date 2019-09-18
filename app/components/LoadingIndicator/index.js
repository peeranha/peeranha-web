import React from 'react';
import Circle from './Circle';

const LoadingIndicator = () => (
  <div className="d-flex">
    <Circle number={1} />
    <Circle number={2} />
    <Circle number={3} />
    <Circle number={4} />
    <Circle number={5} />
  </div>
);

export default LoadingIndicator;
