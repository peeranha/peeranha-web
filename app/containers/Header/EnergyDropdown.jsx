import React from 'react';

const EnergyDropdown = ({ energy }) => (
  <div>{energy}</div>
);

export default React.memo(EnergyDropdown);