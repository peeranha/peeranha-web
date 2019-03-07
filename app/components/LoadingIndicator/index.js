import React from 'react';
import Circle from './Circle';

const LoadingIndicator = /* istanbul ignore next */ () => (
  <div className="d-flex">
    <Circle number={1} color="#191970" />
    <Circle number={2} color="#0000CD" />
    <Circle number={3} color="#4169E1" />
    <Circle number={4} color="#6495ED" />
    <Circle number={5} color="#00BFFF" />
  </div>
);

export default LoadingIndicator;
