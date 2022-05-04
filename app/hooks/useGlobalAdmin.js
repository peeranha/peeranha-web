import React, { useState, useEffect } from 'react';

import { getCookie } from '../utils/cookie';

import { hasGlobalModeratorRole } from '../utils/properties';

import history from '../createdHistory';

export const useGlobalAdmin = (redirectPage) => {
    const [isGlobalAdmin, setGlobalAdmin] = useState(null);

    useEffect(()=>{
        const permissions = JSON.parse(getCookie('profileinfols') || '""')?.permissions || [];

        setGlobalAdmin(hasGlobalModeratorRole(permissions));
    }, []); 
    
    if (isGlobalAdmin == []) {
        history.push(redirectPage());
    }
}