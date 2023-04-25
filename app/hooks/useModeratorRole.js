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

import history from '../createdHistory';
import { isSuiBlockchain } from 'utils/sui/sui';

export const useModeratorRole = (redirectPage, communityId = null) => {
  const [isModeratorRole, setModeratorRole] = useState(null);

  useEffect(() => {
    const permissions = parsePermissionsCookie(
      JSON.parse(
        isValidJsonFromCookie(getCookie(PROFILE_INFO_LS), PROFILE_INFO_LS)
          ? getCookie(PROFILE_INFO_LS)
          : '""',
      ) || [],
    );

    setModeratorRole(
      hasProtocolAdminRole(permissions) ||
        hasGlobalModeratorRole(permissions) ||
        (Boolean(communityId) &&
          (hasCommunityModeratorRole(
            permissions,
            isSuiBlockchain ? communityId : Number(communityId),
          ) ||
            hasCommunityAdminRole(
              permissions,
              isSuiBlockchain ? communityId : Number(communityId),
            ))),
    );
  }, []);

  if (isModeratorRole !== null && !isModeratorRole) {
    history.push(redirectPage());
  }
};
