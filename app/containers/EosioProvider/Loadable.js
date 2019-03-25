/**
 *
 * Asynchronously loads the component for EosioProvider
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
