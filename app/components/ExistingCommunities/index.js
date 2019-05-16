import React, { useState } from 'react';
import Communities from 'containers/Communities';

import Aside from './Aside';
import Content from './Content';
import SubHeader from './SubHeader';

import sortingOptions from './SortingOptions';

export const ExistingCommunities = /* istanbul ignore next */ () => {
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
    />
  );
};

export default React.memo(ExistingCommunities);
