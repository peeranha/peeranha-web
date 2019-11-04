import React, { useState } from 'react';
import * as routes from 'routes-config';

import Communities from 'containers/Communities';

import Aside from './Aside';
import Content from './Content';
import SubHeader from './SubHeader';

import sortingOptions from './sortingOptions';

export const ExistingCommunities = () => {
  const [sorting, changeSorting] = useState(
    sortingOptions[Object.keys(sortingOptions)[0]],
  );

  return (
    <Communities
      Content={Content}
      Aside={Aside}
      SubHeader={SubHeader}
      sorting={sorting}
      changeSorting={changeSorting}
      route={routes.communities()}
    />
  );
};

export default React.memo(ExistingCommunities);
