import React, { useState, useEffect } from 'react';

import { getCookie } from '../utils/cookie';

import {
  hasGlobalModeratorRole,
  hasCommunityModeratorRole,
} from '../utils/properties';

import history from '../createdHistory';

export const useModeratorRole = (redirectPage, communityId = null) => {
  const [isModeratorRole, setModeratorRole] = useState(null);

  useEffect(() => {
    const permissions =
      JSON.parse(getCookie('profileinfols') || '""')?.permissions || [];

    setModeratorRole(
      hasGlobalModeratorRole(permissions) ||
        (Boolean(communityId) &&
          hasCommunityModeratorRole(permissions, Number(communityId))),
    );
  }, []);

  if (isModeratorRole !== null && !isModeratorRole) {
    history.push(redirectPage());
  }
};
