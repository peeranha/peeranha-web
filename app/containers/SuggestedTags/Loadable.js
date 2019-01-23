/**
 *
 * Asynchronously loads the component for SuggestedTags
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
