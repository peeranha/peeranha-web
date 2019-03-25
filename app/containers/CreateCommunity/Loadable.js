/**
 *
 * Asynchronously loads the component for CreateCommunity
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
