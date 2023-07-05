import React, { useState, useEffect } from 'react';
import { PROFILE_INFO_LS } from 'containers/Login/constants';

import { getCookie, parsePermissionsCookie } from 'utils/cookie';

import {
  hasGlobalModeratorRole,
  hasCommunityModeratorRole,
  hasCommunityAdminRole,
  hasProtocolAdminRole,
  isValidJsonFromCookie,
} from 'utils/properties';
import { isSuiBlockchain } from 'utils/sui/sui';

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

    const isProtocolAdmin = hasProtocolAdminRole(permissions);
    const isGlobalModerator = hasGlobalModeratorRole(permissions);
    const isCommunityModerator = hasCommunityModeratorRole(
      permissions,
      isSuiBlockchain ? communityId : Number(communityId),
    );
    const isCommunityAdmin = hasCommunityAdminRole(
      permissions,
      isSuiBlockchain ? communityId : Number(communityId),
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
