import React, { useState, useEffect } from 'react';

import { getCookie } from '../utils/cookie';

import { hasGlobalModeratorRole, hasCommunityModeratorRole } from '../utils/properties';

import history from '../createdHistory';

export const useModeratorRole = (communityId, redirectPage) => {
    const [isModeratorRole, setModeratorRole] = useState(null);

    useEffect(()=>{
        const permissions = JSON.parse(getCookie('profileinfols') || '""')?.permissions || [];

        setModeratorRole(
            hasGlobalModeratorRole(permissions) || 
            hasCommunityModeratorRole(permissions, parseInt(communityId))
        );
    }, []); 

    if (isModeratorRole == []) {
        history.push(redirectPage());
    }
}