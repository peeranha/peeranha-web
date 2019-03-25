/**
 *
 * Asynchronously loads the component for EditProfilePage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
