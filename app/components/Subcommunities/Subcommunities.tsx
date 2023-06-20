import React, { useState } from 'react';
import * as routes from 'routes-config';
import Content from 'components/ExistingCommunities/Content';
import SubHeader from 'components/ExistingCommunities/SubHeader';
import sortingOptions from 'components/ExistingCommunities/sortingOptions';
import Communities from 'containers/Communities';

type sortingOptionsType = {
  message: { id: string };
  order: string;
  sortBy: string;
};

const Subcommunities: React.FC = (): JSX.Element => {
  const [sorting, changeSorting] = useState<sortingOptionsType>(
    sortingOptions[Object.keys(sortingOptions)[0]],
  );

  return (
    <Communities
      Content={Content}
      SubHeader={SubHeader}
      sorting={sorting}
      changeSorting={changeSorting}
      route={routes.communities()}
      isSubCommunity
    />
  );
};

export default Subcommunities;
