import React, { useState } from 'react';
import { css } from '@emotion/react';
import * as routes from 'routes-config';
import Aside from '../ExistingCommunities/Aside';
import Content from '../ExistingCommunities/Content';
import SubHeader from '../ExistingCommunities/SubHeader';
import sortingOptions from '../ExistingCommunities/sortingOptions';
import Communities from 'containers/Communities';

const Subcommunities: React.FC = (): JSX.Element => {
  const [sorting, changeSorting] = useState<Object>(
    sortingOptions[Object.keys(sortingOptions)[0]],
  );
  console.log(sorting, 'sorting');
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
