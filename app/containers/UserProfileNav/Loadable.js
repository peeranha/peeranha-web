/**
 *
 * Asynchronously loads the component for UserProfileNav
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
