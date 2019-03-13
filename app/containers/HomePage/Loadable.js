/**
 * Asynchronously loads the component for HomePage
 */
import React from 'react';
import Loadable from 'react-loadable';
import LoadingIndicator from 'components/LoadingIndicator/HeightWidthCentered';

export default Loadable({
  loader: () => import('./index'),
  loading: () => <LoadingIndicator />,
});
