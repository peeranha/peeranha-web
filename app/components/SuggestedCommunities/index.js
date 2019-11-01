/**
 *
 * SuggestedCommunities
 *
 */

import React from 'react';
import * as routes from 'routes-config';

import Communities from 'containers/Communities';

import Aside from './Aside';
import Content from './Content';
import SubHeader from './SubHeader';

export const SuggestedCommunities = () => (
  <Communities
    Content={Content}
    Aside={Aside}
    SubHeader={SubHeader}
    route={routes.suggestedCommunities()}
  />
);

export default React.memo(SuggestedCommunities);
