import React, { useState, useEffect } from 'react';

import { getCookie } from '../utils/cookie';

import {
  hasGlobalModeratorRole,
  hasCommunityModeratorRole,
  hasCommunityAdminRole,
  hasProtocolAdminRole,
  isValidJsonFromCookie,
} from '../utils/properties';

import history from '../createdHistory';
import i18next from 'app/i18n';

export const useModeratorRole = (redirectPage, communityId = null) => {
  const [isModeratorRole, setModeratorRole] = useState(null);
  const baseUrl = i18next.language === 'en' ? '' : `/${i18next.language}`;

  useEffect(() => {
    const permissions =
      JSON.parse(
        isValidJsonFromCookie(getCookie('profileinfols'), 'profileinfols')
          ? getCookie('profileinfols')
          : '""',
      )?.permissions || [];

    setModeratorRole(
      hasProtocolAdminRole(permissions) ||
        hasGlobalModeratorRole(permissions) ||
        (Boolean(communityId) &&
          (hasCommunityModeratorRole(permissions, Number(communityId)) ||
            hasCommunityAdminRole(permissions, Number(communityId)))),
    );
  }, []);

  if (isModeratorRole !== null && !isModeratorRole) {
    history.push(baseUrl + redirectPage());
  }
};
