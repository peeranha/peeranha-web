/**
 *
 * SuggestedCommunities
 *
 */

import React from 'react';

import Communities from 'containers/Communities';

import Aside from './Aside';
import Content from './Content';
import SubHeader from './SubHeader';

const SuggestedCommunities = () => (
  <Communities Content={Content} Aside={Aside} SubHeader={SubHeader} />
);

export default React.memo(SuggestedCommunities);
