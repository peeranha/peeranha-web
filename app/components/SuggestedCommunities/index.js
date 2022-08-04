import React from 'react';
import * as routes from 'routes-config';

import Communities from 'containers/Communities';

import Content from './Content';
import SubHeader from './SubHeader';

export const SuggestedCommunities = () => (
  <Communities
    Content={Content}
    SubHeader={SubHeader}
    route={routes.suggestedCommunities()}
  />
);

export default React.memo(SuggestedCommunities);
