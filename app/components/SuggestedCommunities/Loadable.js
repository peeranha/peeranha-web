/**
 *
 * Asynchronously loads the component for SuggestedCommunities
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
