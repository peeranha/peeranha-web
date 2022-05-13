import React from 'react';
import Circle from './Circle';

const LoadingIndicator = (props) => (
  <div className="d-flex">
    <Circle number={1} {...props} />
    <Circle number={2} {...props} />
    <Circle number={3} {...props} />
    <Circle number={4} {...props} />
    <Circle number={5} {...props} />
  </div>
);

export default LoadingIndicator;
