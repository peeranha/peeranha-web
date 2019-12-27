import React from 'react';

import { Button as EnergyButton } from 'containers/Header/EnergyDropdown';

/* eslint no-unreachable: 0 */
export default React.memo(({ profile, isMenuVisible }) => {
  // TODO: return if energy will be needed
  return null;

  if (!profile || !isMenuVisible) {
    return null;
  }

  return (
    <div className="lightbg use-default-links">
      <div className="d-flex align-items-center">
        <button>
          <EnergyButton energy={profile.energy} />
        </button>
      </div>
    </div>
  );
});
