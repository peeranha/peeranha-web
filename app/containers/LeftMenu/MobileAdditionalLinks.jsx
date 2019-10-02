import React from 'react';

import { Button as EnergyButton } from 'containers/Header/EnergyDropdown';

export default React.memo(({ profile, isMenuVisible }) => {
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
