import React, { useState } from 'react';
import { css } from '@emotion/react';
import * as routes from 'routes-config';
import Aside from '../ExistingCommunities/Aside';
import Content from '../ExistingCommunities/Content';
import SubHeader from '../ExistingCommunities/SubHeader';
import sortingOptions from '../ExistingCommunities/sortingOptions';
import Communities from 'containers/Communities';

type TypeSortingOptions = {
  message: { id: string };
  order: string;
  sortBy: string;
};

const Subcommunities: React.FC = (): JSX.Element => {
  const [sorting, changeSorting] = useState<TypeSortingOptions>(
    sortingOptions[Object.keys(sortingOptions)[0]],
  );

  return (
    <>
      <Communities
        Content={Content}
        Aside={Aside}
        SubHeader={SubHeader}
        sorting={sorting}
        changeSorting={changeSorting}
        route={routes.communities()}
      />
    </>
  );
};

export default Subcommunities;
