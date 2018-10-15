/**
 *
 * Asynchronously loads the component for NoAccess
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
