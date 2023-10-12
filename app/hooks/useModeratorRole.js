import React, { useState, useEffect } from 'react';
import { PROFILE_INFO_LS } from 'containers/Login/constants';
import { isSuiBlockchain } from 'utils/constants';

import { getCookie, parsePermissionsCookie } from 'utils/cookie';

import {
  hasGlobalModeratorRole,
  hasCommunityModeratorRole,
  hasCommunityAdminRole,
  hasProtocolAdminRole,
  isValidJsonFromCookie,
} from 'utils/properties';

import history from '../createdHistory';

export const useModeratorRole = (redirectPage, communityId = null) => {
  const [isModeratorRole, setModeratorRole] = useState(null);

  useEffect(() => {
    const cookieProfileInfo = getCookie(PROFILE_INFO_LS);
    const permissions = parsePermissionsCookie(
      JSON.parse(
        isValidJsonFromCookie(cookieProfileInfo, PROFILE_INFO_LS) ? cookieProfileInfo : '""',
      ) || [],
    );

    setModeratorRole(
      hasProtocolAdminRole(permissions) ||
        hasGlobalModeratorRole(permissions) ||
        (Boolean(communityId) &&
          (hasCommunityModeratorRole(permissions, communityId) ||
            hasCommunityAdminRole(permissions, communityId))),
    );
  }, []);

  if (isModeratorRole !== null && !isModeratorRole) {
    history.push(redirectPage());
  }
};
